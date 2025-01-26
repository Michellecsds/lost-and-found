import nltk
from nltk.corpus import stopwords, wordnet as wn
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("lost-and-found-dc831-firebase-adminsdk-fbsvc-c26069cf95.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

nltk.download('punkt_tab')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger_eng')

stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    return word_tokenize(text.lower())

def get_synonyms(word):
    synsets = wn.synsets(word)
    synonyms = set()

    for synset in synsets:
        for lemma in synset.lemmas():
            synonyms.add(lemma.name().lower())  
    
    if not synonyms:
        synonyms.add(word)
    
    return synonyms

def get_all_synonyms(sentence):
    words = preprocess_text(sentence)
    
    all_synonyms = set()
    
    for word in words:
        if word not in stop_words:
            word_synonyms = get_synonyms(word)
            all_synonyms.update(word_synonyms)  
    
    return all_synonyms

'''
def jaccard_similarity(sent1, sent2):
    set1 = get_all_synonyms(sent1)
    set2 = get_all_synonyms(sent2)
    intersection = set1.intersection(set2)  # Common elements
    union = set1.union(set2)  # All unique elements
    return len(intersection) / len(union) if len(union) > 0 else 0
'''

def get_similarity(sent1,sent2):

    tagged_sent1 = pos_tag(preprocess_text(sent1))
    tagged_sent2 = pos_tag(preprocess_text(sent2))

    nouns1 = {word for word, tag in tagged_sent1 if tag.startswith('N')}
    nouns2 = {word for word, tag in tagged_sent2 if tag.startswith('N')}
    
    other_words1 = {word for word, tag in tagged_sent1 if word not in nouns1}
    other_words2 = {word for word, tag in tagged_sent2 if word not in nouns2}

    set1_noun = get_all_synonyms(" ".join(nouns1))
    set2_noun = get_all_synonyms(" ".join(nouns2))

    set1 = get_all_synonyms(" ".join(other_words1))
    set2 = get_all_synonyms(" ".join(other_words2))

    return 0.3 * len(set1.intersection(set2)) + 0.7 * len(set1_noun.intersection(set2_noun))

@app.route('/rank_posts', methods=['POST'])
def rank_posts():
    try:
        to_find_json = request.json

        print(f"Received ID from client: {to_find_json['id']}")

        to_find_ref = db.collection('lost_items').document(to_find_json['id'])
        print(to_find_ref)
        to_find_doc = to_find_ref.get() 
        print(to_find_doc)

        # Extract the description field
        to_find_data = to_find_doc.to_dict()
        print(to_find_data)
        print(f"Document fields: {to_find_doc.to_dict()}")
        to_find_description = to_find_data.get("description")
        if not to_find_description:
            print("Description field missing or empty.")
            return jsonify({"error": "Document has no 'description' field"}), 400

        print(f"Description fetched: {to_find_description}")

        # Fetch all documents in 'found_items' and compute similarity
        found_items_ref = db.collection('found_items')
        docs = found_items_ref.stream()

        scored_items = []
        for doc in docs:
            data = doc.to_dict()  # Convert document snapshot to dictionary
            item_id = doc.id
            description = data.get('description', '')  # Safely retrieve 'description'

            score = get_similarity(to_find_description, description)
            scored_items.append({"id": item_id, "description": description, "score": score})

        # Return sorted items
        return jsonify(sorted(scored_items, key=lambda x: x['score'], reverse=True))

    except Exception as e:
        print(f"Internal Server Error: {e}")
        return jsonify({"error": str(e)}), 500

desc_input = "Black sports watch with silicone strap"
to_find_input = ["Black bag with phone inside", "Brown leather bag with wallet","Red backpack with water bottle holder",
           "Gold watch with leather strap","Silver watch with metal band"]

if __name__ == "__main__":
    app.run()

#print(rank_posts(desc_input, to_find_input))

#sentence1 = "black bag with mac and bottle"
#sentence2 = "white computer"
#similarity = get_similarity(sentence1, sentence2)
#print(f"Synonyms in Sentence 1: {get_all_synonyms(sentence1)}")
#print(f"Synonyms in Sentence 2: {get_all_synonyms(sentence2)}")
#print(f"Similarity: {len(get_similarity(sentence1, sentence2)):}")
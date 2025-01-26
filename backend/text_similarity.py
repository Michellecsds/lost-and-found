from nltk.corpus import stopwords, wordnet as wn
from nltk.tokenize import word_tokenize
from nltk import pos_tag

import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

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
            all_synonyms.update(get_synonyms(word))
    return all_synonyms

def get_text_similarity(sent1, sent2):
    synonyms1 = get_all_synonyms(sent1)
    synonyms2 = get_all_synonyms(sent2)
    intersection = synonyms1.intersection(synonyms2)
    union = synonyms1.union(synonyms2)
    return (len(intersection) / len(union)) * 100 if union else 0

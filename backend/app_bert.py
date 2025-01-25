from flask import Flask

app = Flask(__name__)

from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity

# Load the pretrained BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Function to encode sentence and get its BERT embedding
def get_sentence_embedding(sentence):
    # Tokenize and encode the sentence
    inputs = tokenizer(sentence, return_tensors='pt', truncation=True, padding=True, max_length=512)
    with torch.no_grad():  # Disable gradient calculation (we don't need it for inference)
        outputs = model(**inputs)
    
    # Get the embeddings of the [CLS] token (first token of the input)
    embeddings = outputs.last_hidden_state[0][0]  # Embedding of [CLS] token
    return embeddings

# Example sentences to compare
sentence1 = "black bag with a phone in it"
sentence2 = "dark grey handbag with smartphone"

# Get embeddings for both sentences
embedding1 = get_sentence_embedding(sentence1)
embedding2 = get_sentence_embedding(sentence2)

# Calculate cosine similarity between the two embeddings
cos_sim = cosine_similarity([embedding1.numpy()], [embedding2.numpy()])

# Print the similarity score
print(f"Cosine Similarity between sentences: {cos_sim[0][0]:.4f}")
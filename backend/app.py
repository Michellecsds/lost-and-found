from flask import Flask, jsonify, request
from flask_cors import CORS
from firebase_setup import db
from text_similarity import get_text_similarity
from image_similarity import get_image_similarity

app = Flask(__name__)
CORS(app)

@app.route('/rank_posts', methods=['POST'])
def rank_posts():
    try:
        # Parse input
        request_data = request.json
        lost_item_id = request_data.get('id')
        if not lost_item_id:
            return jsonify({"error": "No lost item ID provided"}), 400

        # Get lost item from Firebase
        lost_item_ref = db.collection('lost_items').document(lost_item_id)
        lost_item_doc = lost_item_ref.get()
        if not lost_item_doc.exists:
            return jsonify({"error": "Lost item not found"}), 404

        lost_item = lost_item_doc.to_dict()
        lost_description = lost_item.get('description', '')
        lost_photo_url = lost_item.get('photo_url', None)

        # Get all found items from Firebase
        found_items_ref = db.collection('found_items').stream()

        results = []
        for found_item_doc in found_items_ref:
            found_item = found_item_doc.to_dict()
            found_description = found_item.get('description', '')
            found_photo_url = found_item.get('photo_url', None)

            # Calculate text similarity
            text_similarity = get_text_similarity(lost_description, found_description)

            # Calculate image similarity (if photo URLs exist)
            if lost_photo_url and found_photo_url:
                image_similarity = get_image_similarity(lost_photo_url, found_photo_url)
            else:
                image_similarity = None

            results.append({
                "id": found_item_doc.id,
                "description": found_description,
                "text_similarity": text_similarity,
                "image_similarity": image_similarity
            })

        # Sort results by text similarity first, then image similarity
        results = sorted(results, key=lambda x: (x['text_similarity'], x.get('image_similarity', 0)), reverse=True)

        return jsonify(results)

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

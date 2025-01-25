import firebase_admin
from firebase_admin import credentials, firestore

# Path to your Firebase Admin SDK JSON file
cred = credentials.Certificate('lost-and-found-56cd0-firebase-adminsdk-fbsvc-7321c2be6d.json')

# Initialize the Firebase app
firebase_admin.initialize_app(cred)

# Initialize Firestore (for Cloud Firestore)
db = firestore.client()

# Example: Store user data
def store_user_data(user_id, phone, email):
    doc_ref = db.collection('users').document(user_id)
    doc_ref.set({
        'phone': phone,
        'email': email,
        'post_id':[],
    })
    print(f"User {user_id} data saved successfully!")

# Example usage
store_user_data("user123", "John Doe", "johndoe@example.com")
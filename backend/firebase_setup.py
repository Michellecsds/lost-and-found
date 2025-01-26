import firebase_admin
from firebase_admin import credentials, firestore, storage

# Path to your service account JSON file
SERVICE_ACCOUNT_FILE = "lost-and-found-dc831-firebase-adminsdk-fbsvc-c26069cf95.json"

# Initialise Firebase Admin SDK
cred = credentials.Certificate(SERVICE_ACCOUNT_FILE)
firebase_admin.initialize_app(cred, {
    'storageBucket': 'lost-and-found-dc831.appspot.com'  # Replace with your actual bucket name
})

# Firestore database instance
db = firestore.client()

# Firebase Storage bucket instance
bucket = storage.bucket()

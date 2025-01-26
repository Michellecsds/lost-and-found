import cv2
import numpy as np
import requests
from io import BytesIO
from PIL import Image

def load_image_from_url(url):
    """
    Loads an image from a URL and converts it to grayscale.
    """
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2GRAY)
    except Exception as e:
        print(f"Error loading image from URL {url}: {e}")
        return None

def get_image_similarity(url1, url2):
    """
    Calculates image similarity using ORB feature detection and matching.
    """
    try:
        # Load images
        img1 = load_image_from_url(url1)
        img2 = load_image_from_url(url2)

        if img1 is None or img2 is None:
            raise ValueError("One or both images could not be loaded.")

        # ORB Feature Detector
        orb = cv2.ORB_create()
        kp1, des1 = orb.detectAndCompute(img1, None)
        kp2, des2 = orb.detectAndCompute(img2, None)

        if des1 is None or des2 is None:
            raise ValueError("ORB descriptors could not be computed for one or both images.")

        # Match features
        bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        matches = bf.match(des1, des2)

        if not matches:
            return 0.0  # No matches, return 0 similarity

        # Calculate similarity score
        score = sum([1 - (m.distance / 100) for m in matches]) / len(matches)
        return score * 100  # Convert to percentage
    except Exception as e:
        print(f"Image similarity error: {e}")
        return 0.0
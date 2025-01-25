import cv2
import numpy as np

# Load the images (query image and target image)
query_image = cv2.imread('query_image.jpg', cv2.IMREAD_GRAYSCALE)  # Object to search for
target_image = cv2.imread('target_image.jpg', cv2.IMREAD_GRAYSCALE)  # Image to search in

# Initialize ORB detector
orb = cv2.ORB_create()

# Detect keypoints and descriptors in both images
keypoints_query, descriptors_query = orb.detectAndCompute(query_image, None)
keypoints_target, descriptors_target = orb.detectAndCompute(target_image, None)

# Use Brute Force Matcher to match descriptors
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = bf.match(descriptors_query, descriptors_target)

# Sort the matches based on their distance
matches = sorted(matches, key = lambda x:x.distance)

# Draw the matches on the images
result_image = cv2.drawMatches(query_image, keypoints_query, target_image, keypoints_target, matches[:10], None, flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)

# Show the result image
cv2.imshow("Matches", result_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
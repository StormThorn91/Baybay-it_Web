import numpy as np
import tensorflow as tf
import keras 
import keras.utils as image
import os
import sys

CATEGORIES = ["a", "b","ba", "be", "bo", "d", "da", "de", "do", "e", "g", "ga", "ge", "go", "h", "ha", "he", "ho", "k", "ka", "ke", "ko", "l", "la", "le", "lo", "m", "ma", "me", "mo", "n", "na", "ne", "ng", "nga", "nge", "ngo", "no", "o", "p", "pa", "pe", "po", "s", "sa", "se", "so", "t", "ta", "te", "to", "w", "wa", "we", "wo", "y", "ya", "ye", "yo"] 

sys.path.append(os.path.abspath('./model'))

#Initialize model
def init_model():
    loaded_model = tf.keras.models.load_model('model/bymodel3.h5')
    print("Loaded model successfully")
    return loaded_model

def prepare_image(file):
  img_path = ''
  img = image.load_img(img_path + file, target_size=(256,256))
  img_array = image.img_to_array(img)
  img_array_expanded_dims = np.expand_dims(img_array, axis=0)
  img_array_expanded_dims.shape
  return keras.applications.mobilenet.preprocess_input(img_array_expanded_dims)

#Make a prediction based on the uploaded image
def predict(model, img):
    print("Prepping image")
    preprocessed_image = prepare_image(img)
    print("Doing model.predict")
    predictions2 = model.predict(preprocessed_image)
    print("Setting result")
    predictions2 = np.argmax(predictions2,axis=1)
    result = CATEGORIES[predictions2[0]]

    return result

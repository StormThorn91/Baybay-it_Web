from codecs import decode
from flask import Flask, render_template, request
import base64
from PIL import Image
import io
from predict import *

app = Flask(__name__)

model = init_model()

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/recognize', methods=['POST'])
def recognize():
    uriData = request.form.get('getURI')
    decodedURI = base64.b64decode(uriData)
    filename = "character"

    imagePath = "./static/images/" + filename + ".jpg"
    img = Image.open(io.BytesIO(decodedURI))
    img.save(imagePath, 'jpeg')

    result = predict(model, imagePath)

    return render_template('index.html', result=result, drawn=imagePath)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
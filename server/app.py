from data_analysis import gatherAllValSets
from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def get_sets():
    data = gatherAllValSets()
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
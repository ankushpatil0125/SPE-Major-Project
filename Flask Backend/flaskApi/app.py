from flask import Flask, request,render_template, json
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

app = Flask(__name__)
# Load TF-IDF Vectorizer
with open("tfidf_vectorizer.pkl", 'rb') as file:
    tfidf_vectorizer = joblib.load(file)
@app.route('/',methods=["Get","POST"])
def home():
    return render_template("index.html")
@app.route('/predict',methods=["Get","POST"])
def predict():
    data = request.get_json()
    text_input = data.get('textInput', '')  # Extract text input from JSON
    print("Received text input:", text_input)
    # text_input = data.get('textInput', '')
    # print("text_input",text_input)
    # df = pd.read_csv(uploaded_file)
    # df = data_validation(df)
    # print("type(df['review_text'])",type(df['review_text'])) 
    # print("df['review_text']",df['review_text'])
    # X_test_tfidf = tfidf_vectorizer.transform(df['review_text'])
    # with open("trained_model.pkl", 'rb') as file:
    #         classifier = joblib.load(file)
    # #xgb_clf = joblib.load('xgb_clf.pkl')
    # predictions_test = classifier.predict(X_test_tfidf)

    # df['predict rating'] = predictions_test
    # return df.to_json(orient="split")

def data_validation(df):
     # some logic
     #df['review_text'].fillna('', inplace=True)
     return df

if __name__ == '__main__':
     app.run(debug=True, port=5002)




# from flask import Flask, request,render_template, json
# import joblib
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer

# app = Flask(__name__)
# # Load TF-IDF Vectorizer
# with open("tfidf_vectorizer.pkl", 'rb') as file:
#     tfidf_vectorizer = joblib.load(file)
# @app.route('/',methods=["Get","POST"])
# def home():
#     return render_template("index.html")
# print("asdfdsaf",type(tfidf_vectorizer))
# @app.route('/predict',methods=["Get","POST"])
# def predict():
#     uploaded_file = request.files['file']
#     df = pd.read_csv(uploaded_file)
#     df = data_validation(df) 
#     X_test_tfidf = tfidf_vectorizer.transform(df['review_text'])
#     with open("trained_model.pkl", 'rb') as file:
#             classifier = joblib.load(file)
#     #xgb_clf = joblib.load('xgb_clf.pkl')
#     predictions_test = classifier.predict(X_test_tfidf)

#     df['predict rating'] = predictions_test
#     return df.to_json(orient="split")

# def data_validation(df):
#      # some logic
#      #df['review_text'].fillna('', inplace=True)
#      return df

# if __name__ == '__main__':
#      app.run(debug=True, port=5002)
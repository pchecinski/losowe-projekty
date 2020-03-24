import os
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyser = SentimentIntensityAnalyzer()
characters = {}

def score_to_text(score):
    if(score >= 0.05):
        return 'positive'
    elif(score <= -0.05):
        return 'negative'
    else:
        return 'neutral'

for name in os.listdir('./star-wars-movie-scripts'):
    with open('./star-wars-movie-scripts/' + name, 'r', encoding = 'UTF-8') as f:
        text = f.readlines()[1:]

        for line in text:
            _, who, sent = line.split('" "')
            characters.setdefault(who, []).append(sent)        

for c in characters:
    score = analyser.polarity_scores(" ".join(characters[c]))
    print(c + ": " + score_to_text(score['compound']))   

import nltk

from nltk.probability import FreqDist
from nltk.stem.wordnet import WordNetLemmatizer
lem = WordNetLemmatizer()

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

stop_words = set(nltk.corpus.stopwords.words("english"))
please_no = {'.', ',', '!', '"', '?'}

tokenized_word = nltk.word_tokenize(" ".join(characters['YODA']))
filtered_word=[]
for w in tokenized_word:
    if w not in stop_words and w not in please_no:
        filtered_word.append(w)

fdist = FreqDist(filtered_word)

# Frequency Distribution Plot
import matplotlib.pyplot as plt
fdist.plot(30,cumulative=False)
plt.show()

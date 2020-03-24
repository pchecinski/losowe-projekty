from os import listdir
import nltk

from nltk.probability import FreqDist
from nltk.stem.wordnet import WordNetLemmatizer
lem = WordNetLemmatizer()

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

stop_words = set(nltk.corpus.stopwords.words("english"))

for name in listdir('./artykuly'):
	with open('./artykuly/' + name, 'r', encoding = 'utf-8') as f:
		content = f.read()

		tokenized_word = nltk.word_tokenize(content)
		filtered_word=[]
		for w in tokenized_word:
			if w not in stop_words:
				filtered_word.append(w)

		lematized = []
		for w in filtered_word:
			lematized.append(lem.lemmatize(w))

		fdist = FreqDist(tokenized_word)
		print(fdist)

		fdist.most_common(2)

		# Frequency Distribution Plot
		import matplotlib.pyplot as plt
		fdist.plot(30,cumulative=False)
		plt.show()

		print(content)


# Dla każdego z plików dokonaj standardowych kroków analizy tekstu
# (tokenizacja, stopwords, lematyzacja). Podaj częstości występowania słów w
# tych artykułach (mile widziany wykres). Możesz się ograniczyć do 20 czy 30
# najczęstszych słów.

# from nltk.tokenize import sent_tokenize
# text="""Hello Mr. Smith, how are you doing today? The weather is great, and city is awesome.
# The sky is pinkish-blue. You shouldn't eat cardboard"""
# tokenized_text=sent_tokenize(text)
# print(tokenized_text)

# from nltk.tokenize import word_tokenize
# tokenized_word=word_tokenize(text)
# print(tokenized_word)

# from nltk.probability import FreqDist
# fdist = FreqDist(tokenized_word)
# print(fdist)

# fdist.most_common(2)

# # # Frequency Distribution Plot
# # import matplotlib.pyplot as plt
# # fdist.plot(30,cumulative=False)
# # plt.show()

# from nltk.corpus import stopwords
# stop_words=set(stopwords.words("english"))
# print(stop_words)

# filtered_word=[]
# for w in tokenized_word:
#     if w not in stop_words:
#         filtered_word.append(w)
# print("Tokenized Words:",tokenized_word)
# print("Filterd Words:",filtered_word)
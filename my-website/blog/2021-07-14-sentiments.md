---
slug: sentiments
title: Analyzing sentiments
author: Laura Vavasseur
author_title: Content Developer
author_url: https://github.com/lauravavz
author_image_url: https://media-exp1.licdn.com/dms/image/C5603AQEm4rhTTpTqeQ/profile-displayphoto-shrink_200_200/0/1620329655766?e=1628121600&v=beta&t=U5UjeI0rqNjvwZDoiKjPvohYIBNeW6inUd5oQxlm28k
tags: [sentiment, analyze, video, nlp]
---

<video width="800" height="400" controls
  source src="/static/video/sentimental_analysis.mp4" type="video/mp4"
/>

## Sentimental Analysis with Lettria NLP API

Sentimental analysis consists in identifying for a text whether it has negative, positive or neutral connotation.

Lettria analyzes the feelings at the sub sentence level, which allows a very precise analysis of the data to manage the most nuanced sentences.

To get these results you have two methods:

1. You can se the 'sentiment' properties with the NLP object as seen in previous tutorials.
2. Or you can use the lettria Sentiment module which offers more advanced features.

In this tutorial we will take a look at the second option and analyze these reviews I have here

```shell
data = ['Very family oriented. Cozy atmosphere located in the center of town. We ate very well.',
'Excellent service. An attentive staff. Delicious entrées. Perfect for kids. Highly recommend!',
'An amazing restaurant!',
'I’m disappointed because the dish wasn’t good and it was served cold. On the other hand the staff were very friendly.']
```

Each item in this list corresponds to a comment, to make our work easier, we will consider that a comment is = to a document.

Let's start by making our requests and saving the result in a json file.

```shell
import lettria

	nlp = lettria.NLP(api_key)
	for reviews in data:
		nlp.add_document(review)
	nlp.save_results('reviews.json')
```

The sentiment module becomes the parameter of the NLP object that is used to extract the data.

```shell
import lettria
	from lettria import Sentiment
```

```shell
	nlp = lettria.NLP()
	nlp.load_results('reviews.json')
	sentiment = Sentiment(nlp)
```

## Sentence analysis

Let's start by identifying the positive and negative sentences with filter polarity which will return a list of Sentence objects:

```shell
print('\nPositive Sentences:')
	positive_sentences = sentiment.filter_polarity('positive')
	for p in positive_sentences:
	    print(p.str)
```

```shell
	print('\nNegative Sentences:')
	negative_sentences = sentiment.filter_polarity('negative')
	for n in negative_sentences:
	    print(n.str)
```

```shell
Positive Sentences:
very family oriented .
cozy atmosphere located in the center of town .
we ate very well .
excellent service .
an attentive staff .
delicious entrées .
perfect for kids .
highly recommend !
an amazing restaurant !
on the other hand the staff were very friendly .

Negative Sentences:
i’m disappointed because the dish wasn’t good and it was served cold .
```

We can also analyze the 'subsentences' by adding a 'granularity' argument, at the same time we will also display the associated sentimental value:

```shell
print('\nNegative Sentences')
	negative_sentences = sentiment.filter_polarity('negative', granularity='subsentence')
	for n in negative_sentences:
	    print(n.str, n.sentiment)
```

```shell
Negative Sentences
I’m disappointed {'positive': 0, 'negative': -0.27, 'total': -0.27}
because the dish wasn’t good and it was served cold {'positive': 0, 'negative': -0.46, 'total': -0.46}
```

## Analysis by review

This information is useful, but in this case we are interested in the polarity of the comments themselves.
For that we can use get_sentiment which allows to obtain the feelings at the desired level (whether it be - global, document, sentence or subsentence):

```shell
doc_sentiments = sentiment.get_sentiment(level='document')
for d in doc_sentiments:
    print(d)
```

```shell
{'positive': {'sum': 2.4185, 'occurences': 3, 'average': 0.8062}, 'negative': {'sum': 0, 'occurences': 0, 'average': 0}, 'total': {'sum': 2.42, 'occurences': 3, 'average': 0.8067}}
{'positive': {'sum': 3.2306, 'occurences': 5, 'average': 0.6461}, 'negative': {'sum': 0, 'occurences': 0, 'average': 0}, 'total': {'sum': 3.23, 'occurences': 5, 'average': 0.646}}
{'positive': {'sum': 0.56, 'occurences': 1, 'average': 0.56}, 'negative': {'sum': 0, 'occurences': 0, 'average': 0}, 'total': {'sum': 0.56, 'occurences': 1, 'average': 0.56}}
{'positive': {'sum': 0.51, 'occurences': 1, 'average': 0.51}, 'negative': {'sum': -0.38, 'occurences': 1, 'average': -0.38}, 'total': {'sum': 0.13, 'occurences': 2, 'average': 0.065}}
```

For each review, we have the score for each polarity as well as the total score.

```shell
for score, com in zip(doc_sentiments, data):
    print(score['total']['average'], com)
```

```shell
0.8067 Very family oriented. Cozy atmosphere located in the center of town. We ate very well.
0.646 Excellent service. An attentive staff. Delicious entrées. Perfect for kids. Highly recommend!
0.56 An amazing restaurant!
0.065 ’m disappointed because the dish wasn’t good and it was served cold. On the other hand the staff were very friendly.
```

The first three positive comments are correctly rated. The last comment presents a mixed opinion which is reflected by a score close to 0.

Analyze the feeling of words

We can push the analysis further by not limited ourselves to just sentences. By associating the words that make up a sentence or sub-sentence with the sentimental value of the latter, we can build a dictionary with the average feeling associated with the use of a word.
Let's try to extract the sentiments from the common names, using the lemmas for reliability.

```shell
sentiment.word_sentiment(lemma=True, filter_pos = ['N'])

{'located': 0.9, 'service': 0.56, 'on the other hand': 0.51, 'family': 0.56, 'staff': 0.85, 'restaurant': 0.56, 'entrée': -0.025, 'center of town': 0.9, 'kid': 0.66}
```

Since most of the reviews are positive, the words are generally positive, with the exception of 'entrée' which appears in both a positive and a negative review.
It can be useful to group words that refer to the same idea, for example 'team', 'staff' and 'hospitality' refer to the quality of customer service.

Analyze the 'meanings'

The concept of meaning corresponds to the categorization of a word according to its meaning in order to group it with other similar words and to simplify the analysis. Lettria dictionaries can be personalized by associating each word or lemma with a new or existing category (or meaning).

For this example we have added a category 'service' to the words 'reception', 'team', 'staff'.

```shell
sentiment.meaning_sentiment()

{'Localisation': 0.685, 'city': 0.51, 'Destination': 0.76, 'action_disappoint': -0.38, 'action_accept': -0.38, 'Position': 0.685, 'Substitution': 0.66, 'action_heal': -0.38, ...,  'action_move': -0.38}
```

In order to have a more readable result and since we are only interested in the 'service' category:

```shell
sentiment.meaning_sentiment(filter_meaning=['service'])

{'service': 0.62}
```

By cleverly using dictionaries and sentimental analysis, we can measure satisfaction on different criteria from a list of reviews!

Code set

```shell
import lettria
from lettria import Sentiment

nlp.load_results('commentaires.json')
sentiment = Sentiment(nlp)

print('\nPositive Sentences')
positive_sentences = sentiment.filter_polarity('positive', granularity='subsentence')
for p in positive_sentences:
    print(p.str, p.sentiment)

print('\nNegative Sentences')
negative_sentences = sentiment.filter_polarity('negative', granularity='subsentence')
for n in negative_sentences:
    print(n.str, n.sentiment)

doc_sentiments = sentiment.get_sentiment(level='document')
for d in doc_sentiments:
    print(d)

for score, com in zip(doc_sentiments, data):
    print(score['total']['average'], com)

print(sentiment.word_sentiment(lemma=True, filter_pos = ['N']))
print(sentiment.meaning_sentiment(filter_meaning=['service']))
```

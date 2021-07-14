---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **Lettria in less than 5 minutes** 🕑

## Getting Started

Get started by **getting your API key** 🔑

To be able to make requests on our API you need an API key.
You can manage your subscriptions and get a free key directly from your **Dashboard**.

## Installing Lettria

Lettria provides you with a Python package to facilitate the use of its API.
You can install the latest version via pip, a package manager for Python.

```shell
pip install lettria
```

## Making an API request with Lettria

See how to make a request to the Lettria API and save the return in a file so that we can reuse it at will.
First, import lettria and initialize the NLP object which will allow you to make requests by passing it a valid API key.

```shell
    import lettria
​
	api_key = ' VOTRE CLE API'
	nlp = lettria.NLP(api_key)
```

For this example and the next tutorials we will use the following text that you can copy paste into a file:

```shell
    Paris is the capital and most populous
    city of France, with an estimated population
    of 2,175,601 residents as of 2018, in an area
    of more than 105 square kilometres. Since
    the 17th century, Paris has been one of
    Europe's major centres of finance, diplomacy,
    commerce, fashion, gastronomy, science and arts.
    The City of Paris is the centre and seat of
    government of the region and province of
    Île-de-France, or Paris Region, which has
    an estimated population of 12,174,880,
    or about 18 percent of the population of
    France as of 2017.
```

Let's open our file and look over the content:

```shell
    with open("wiki.txt", "r") as f:
		wikipedia_data = f.readlines()
```

Now we're ready to make our request using the **add_document function**.
This function takes a string or a list of strings as argument, it will perform the necessary requests to the Lettria API and store the results in an instance of Document.
We recommend breaking down your data into 'documents' (a comment, a newspaper article, a report ...) and calling this function on each one, you can pass an id argument to name them and find them more easily by the following.
This decomposition will be used to store the results and will facilitate your analyzes, in our case we only have one document to analyze: enu:

```shell
    nlp.add_document(wikipedia_data)
    nlp.save_results('wikipedia_results.json')
```

Once the query is complete, a new wikipedia_results.json file should be created, your results are ready!
Now let's see how to manipulate the NLP object to extract your results with the next Using NLP tutorial.

## Code set

```shell
    import lettria
​
	api_key = ' VOTRE CLE API'
	nlp = lettria.NLP(api_key)
​
	with open("wiki.txt", "r") as f:
		wikipedia_data = f.readlines()
​
	nlp.add_document(wikipedia_data)
	nlp.save_results('wikipedia_results.json')
```

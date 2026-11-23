Create projects/final-project/pitch.md containing the eight items listed in the brief's Milestone 1 section:

One-sentence description — what it does and for whom

I will make a basic library directory that allows you to check out available books in digital or podcast format. This can be used by students or other people who need to access a variety of books

Problem statement — 2–3 sentences on the specific problem and why this audience needs it

This will help organize and make this catalogue of books available to the public. Information is always a need, and libraries will always need sites to help users organize and sort through their catalogs.

Feature list — 3–5 bullets describing what a user can do

a search function to sort through books
a personal favorites section where you can save and access information on your favorite books
a detailed view on selected books
an author section where you can see different titles written by the same author.

API or data source — an example endpoint or a sample of the JSON
//The response shape is:
 {
   "numFound": 123,
   "docs": [
    {
      "title": "Dune",
       "author_name": ["Frank Herbert"],
      "first_publish_year": 1965
      // more details ex...
    }
   ]
 }

Tech stack decisions — vanilla JS or Vue, which API, any other libraries

openlibrary.org API using vanilla JS

Starter sketch — one rough sketch of the initial/empty state or the loaded state


Data starter — one draft normalized object with 4–6 likely properties, plus a sentence on what you expect to store in localStorage

Book with a title, author, year, number of editions, language, availability. I will store the favorite book titles in local storage.

API viability check — four bullets on CORS, rate limits/auth, attribution, and data reliability

CORS: standard JSON. allows direct browser-side fetches

rate limits/auth: no API keys required, with a rate of 1 request per second

attribution:  no new copyright over catalog records

data reliability: records are crowdsourced and aggregated from diverse library imports, so there are duplicate editions, missing fields, and inconsistent formatting in the data
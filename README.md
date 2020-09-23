# Booking Challenge

## Background

Spill works with a lot of counsellors and users. Users can book sessions based on a variety of criteria.

A subset of the factors that come into play are: availability, appointment type, appointment medium (phone/video). You will only need to concentrate on these factors for the challenge.

## The Challenge

Build a Node.js API with multiple endpoints.

- `GET` endpoint that given `date_range`, `appointment_type` and `appointment_medium` returns a selection of available appointment times.
- `POST` endpoint that counsellors can use to add their availability. It should accept multiple `dates` and `times`.

We have provided a json file with data.

**Things to consider:**

- schema structure
- edge cases
- testing
- naming/readability
- file structure

## Requirements

- [X] duplicate this repo (do not fork it) please do not name your repo `Spill Coding Challenge` or anything similar - we don't want future applicants copying your code
- [X] create the API using Node.js according to the above specifications
- [X] you need to store the `data.json` file in a database
- [X] you **do not** need to host the API
- [X] write max `300` words in a markdown file in your repo on why you made the technical decisions you did
- [X] include instructions on how to run it locally including the database
- [ ] send us a link to the repo (if the repo is private we will tell you who to add as a collaborator)

# How to run

Ensure that mongodb is installed from [https://www.mongodb.com/try/download/community] or your package manager. The version used is 4.2.0 (this is a little outdated, and that's on me not checking the version I had installed), but any 4.2.x should work fine.

Also ensure node is installed from [https://nodejs.org/en/] or your package manager. I was 12.9.1, but any v12 should be fine.

Then we have to install our packages, run:

``` npm install --save ```

and finally

``` npm run start ```

to start the server (with hotloading.)

To run tests use 

``` npm run test ```

Now before using the api, you should populate your mongodb with data.json. Do this by using your REST api client of choice and going to ```POST localhost:27017/populate``` which will import the ```data.json``` file to your database. DO THIS ONLY ONCE! Doing this more than once will populate the database again, without deleting old enteries.

You should now have access to the API!

# Note
The testing has a bug where sometimes the database isn't being run correctly before the suite which fails some tests, I have no idea whats going on, but running it again fixes this.

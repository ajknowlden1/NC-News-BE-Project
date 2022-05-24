# Northcoders News API

Hosted version can be found at "https://aknowlden-nc-news.herokuapp.com/api"

## About this Project

The Northcoders News API is a RESTful CRUD API created with Express.js and node postgres. It allows the user to fetch, add, update or remove
data from the database. It's designed to be easy to use and scale.

## Requirements

- **postgres** v8.7.3 or newer
- **node.js** v16.15.0 or newer\_

## Cloning the repository

- Go to the GitHub repo, which is located here: "https://github.com/ajknowlden1/NC-News-BE-Project"
- Fork the project into your GitHub account.
- Open your terminal and run the command: `git clone https://github.com/(yourusername)/NC-News-BE-Project`. This will create a local version of the repo for you to use.

## Installing dependencies

- Open your cloned repo in your text editor of choice.
- Open a terminal in the directory of your repo.
- Run the command `npm install` to install the dependencies required.

## Setup Instructions

You **must** be sure to add the following two files to the root of this repo in order to run it locally:

- .env.development: Should contain `PGDATABASE=nc_news`
- .env.test: Should contain `PGDATABASE=nc_news_test`

This ensures that the correct environment will be set up based on whether you are developing or testing the API.

## Seeding the Database

-First run `npm setup-dbs` to initialise the database and tables.
-Then run `npm run seed`. If your .env files are set up correctly, the databases should now be seeded.

## Testing

Tests are found in the '**tests**' folder. To run all tests, run `npm test app/utils etc` depending on the file you want to run tests from.

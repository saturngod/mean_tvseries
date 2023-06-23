# TVSeries

Before starting, must install all the depency.

```
npm install
cd public/angular-app
npm install
```

## MongoDB (Databae)

Databae file can be found at `db_dump` folder. It's dump file of mongodb. It's gzip dump.

To restore

```bash
$ cd db_dump
$ mongorestore --gzip dump
```

## Express

- `app.js` file for express
- `api` folder is for all the api.
    - `api/controllers` folder for controllers.
    - `api/services` folder for the collection services;
    - `api/data` folder for database.
    - `api/routes` folder is routes.
- `helpers` handle for Collection of Response. It will change later.
- `public` public static folder and angular project inside there.

## Angular Application

It's store at `public/angular-app`.

It has following component

- footer
- header
- home
- login
- pagination
- profile
- register
- login
- series
- star-rating
- search
- cover
- edit-episode-from
- edit-series-form
- episodes-list

It has following services

- authentication
- series-data
- user-data

Using interceptor for token passing.

- authentication.interceptor

## Node

`package.json` has all depency.

To run both frontend and backend

```
npm start
```

Run only backend

```
npm run startBackend
```

Run only Frontend

```
npm run startFrontend
```

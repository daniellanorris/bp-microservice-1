## Get started
From the root directory, run `npm install` to install necessary packages
Add a .env file to your local, and add a `LOCALHOST` variable with the desired port number you would like this 
api microservice to run on.
For example:
```
LOCALHOST=3000
```
Then, start the api service by running `npm run dev`

*** Make sure the .gitignore file has node_modules and .env files ignored. ***


## To update the api / config files

For config files, add these under `src/lib` and add a folder for the relevant program the config will belong to. For example: `src/lib/movies` contains db-connector.js for initializing the microservice's connection to the supabase database, and `movieHandlers.js` to define functions that the api endpoints will call.

For api route definitions, add these in the `index.js` file. The index.js file uses `express` for route definitions. You can learn more about `express` here: [expressjs.com](https://expressjs.com/)


## API documentation powered by swagger
Can be found at localhost:{port}/api-docs.
To get an API endpoint to appear within the swagger documentation, you can add something like the following above your route handler:

```
/**
 * @swagger
 * /save-movie/{id}:
 *   post:
 *     summary: Save a movie for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Movie saved successfully
 */
```



import 'dotenv/config';
import express from 'express';
import { saveMovie, getMovies } from "./lib/movies/movieHandlers.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple Express API documented with Swagger',
        },
        servers: [
            {
                url: `http://localhost:${process.env.LOCALHOST}`,
            },
        ],
    },
    apis: ['./src/index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send("Hello from Express!");
});

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
app.post('/save-movie/:id', async (req, res) => {
    const user_id = req.params.id;
    const movie_id = req.query.movie_id;

    const data = await saveMovie(user_id, movie_id);

    if (!data) {
        return res.status(500).send({
            error: "Unable to save movie"
        });
    }

    res.status(201).send(data);
});

/**
 * @swagger
 * /saved-movies:
 *   get:
 *     summary: Get saved movies for a user
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Saved movies
 */
app.get('/saved-movies', async (req, res) => {
    const user_id = req.query.id;

    const data = await getMovies(user_id);

    if (!data) {
        return res.status(500).send({
            error: "Unable to retrieve movies"
        });
    }

    res.status(200).send(data);
});

// other routes...

app.listen(process.env.LOCALHOST, () => {
    console.log('Listening on port', process.env.LOCALHOST);
});
// save mood post
app.post('/saved-mood/:id', (req, res) => {
    res.send("Posted id")

})

// get mood post

app.get('/saved-moods', (req, res) => {
    res.send("/saved-moods")
})

// save food post
app.post('/save-food/:id', (req, res) => {
    res.send("Posted id")
})

// get food post

app.get('/saved-foods', (req, res) => {
    res.send("/saved-foods")
})

// save workout post
app.post('/save-workout/:id', (req, res) => {
    res.send("Hello from Express!")
})

// get workout post

app.get('/saved-workouts', (req, res) => {
    res.send("/saved-workouts")
})

// save mushroom post
app.post('/save-mushroom/:id', (req, res) => {
    res.send("Posted id")
})

// get mushroom post

app.get('/saved-mushrooms', (req, res) => {
    res.send("/saved-mushrooms")
})






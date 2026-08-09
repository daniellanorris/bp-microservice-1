import 'dotenv/config';
import express from 'express';
import { saveMovie, getMovies, checkIfMovieSaved } from "./lib/movies/movieHandlers.js";
import { saveWorkout, getWorkouts } from "./lib/workouts/workoutHandlers.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import cors from "cors";


const app = express();

// CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

// Parse JSON request bodies
app.use(express.json());


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
 *       - in: body
 *         name: movie_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Movie saved successfully
 */
app.post('/save-movie/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const movie_id = req.body.movie_id;

        console.log("Saving movie:");
        console.log("User ID:", user_id);
        console.log("Movie ID:", movie_id);

        if (!movie_id) {
            return res.status(400).json({
                error: "movie_id is required"
            });
        }

        const data = await saveMovie(user_id, movie_id);

        if (!data) {
            return res.status(500).json({
                error: "Unable to save movie"
            });
        }

        return res.status(201).json(data);

    } catch (error) {
        console.error("Save movie route error:", error);

        return res.status(500).json({
            error: "Unable to save movie"
        });
    }
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
    try {
        const user_id = req.query.id;

        if (!user_id) {
            return res.status(400).json({
                error: "User ID is required"
            });
        }


        const data = await getMovies(user_id);
        console.log(data)
        if (!data) {
            return res.status(500).json({
                error: "Unable to retrieve movies"
            });
        }

        console.log(data)
        return res.status(200).json(data);

    } catch (error) {
        console.error("Get movies route error:", error);

        return res.status(500).json({
            error: "Unable to retrieve movies"
        });
    }
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

app.post('/is-saved', async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const movie_id = req.body.movie_id;

        if (!user_id) {
            return res.status(400).json({
                error: "User ID is required"
            });
        }

        if (!movie_id) {
            return res.status(400).json({
                error: "Movie ID is required"
            });
        }

        const data = await checkIfMovieSaved(user_id, movie_id);

        return res.status(200).json(data);

    } catch (error) {
        console.error("Check saved movies route error:", error);

        return res.status(500).json({
            error: "Unable to retrieve saved movies"
        });
    }
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
app.post('/save-workout/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const exercise_name = req.body.exercise_name;

        if(!exercise_name) {
            return res.status(400).json({
                error: "exercise_name is required"
            });
        }

        const data = await saveWorkout(user_id, exercise_name);

        if (!data) {
            return res.status(500).json({
                error: "Unable to save workout"
            });
        }

        return res.status(201).json(data);
    } catch (error) {
        console.error("Save workout route error:", error);

        return res.status(500).json({
            error: "Unable to save workout"
        });
    }
});

// get workout post

app.get('/saved-workouts', async (req, res) => {
    try {
        const user_id = req.query.id;

        if (!user_id) {
            return res.status(400).json({
                error: "User ID is required"
            });
        }

        const data = await getWorkouts(user_id);

        if (!data) {
            return res.status(500).json({
                error: "Unable to retrieve workouts"
            });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Get workouts route error:", error);

        return res.status(500).json({
            error: "Unable to retrieve workouts"
        });
    }
});

// save mushroom post
app.post('/save-mushroom/:id', (req, res) => {
    res.send("Posted id")
})

// get mushroom post

app.get('/saved-mushrooms', (req, res) => {
    res.send("/saved-mushrooms")
})





app.listen(process.env.LOCALHOST, () => {
    console.log('Listening on port', process.env.LOCALHOST);
});
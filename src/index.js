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
app.post('/save-mood/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const mood_id = req.body.mood_id;
        const mood = req.body.mood;
        const note = req.body.note;

        console.log("Saving mood:");
        console.log("User ID:", user_id);
        console.log("Mood ID:", mood_id);
        console.log("Mood:", mood);
        console.log("Note:", note);

        if (!mood_id) {
            return res.status(400).json({
                error: "mood_id is required"
            });
        }

        if (!mood) {
            return res.status(400).json({
                error: "mood is required"
            });
        }

        const data = await saveMood(
            user_id,
            mood_id,
            mood,
            note
        );

        if (!data.success) {
            return res.status(400).json(data);
        }

        return res.status(201).json(data);

    } catch (error) {
        console.error("Save mood route error:", error);

        return res.status(500).json({
            error: "Unable to save mood"
        });
    }
});



// get mood post
app.get('/saved-moods', async (req, res) => {
    try {
        const user_id = req.query.id;

        if (!user_id) {
            return res.status(400).json({
                error: "User ID is required"
            });
        }

        const data = await getMoods(user_id);

        if (data === null) {
            return res.status(500).json({
                error: "Unable to retrieve saved moods"
            });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Get moods route error:", error);

        return res.status(500).json({
            error: "Unable to retrieve saved moods"
        });
    }
});

app.delete('/remove-mood/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const mood_id = req.body.mood_id;

        console.log("Removing mood:");
        console.log("User ID:", user_id);
        console.log("Mood ID:", mood_id);

        if (!mood_id) {
            return res.status(400).json({
                error: "mood_id is required"
            });
        }

        const data = await removeMood(
            user_id,
            mood_id
        );

        if (!data.success) {
            return res.status(400).json(data);
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Remove mood route error:", error);

        return res.status(500).json({
            error: "Unable to remove mood"
        });
    }
});

app.post('/is-mood-saved', async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const mood_id = req.body.mood_id;

        if (!user_id) {
            return res.status(400).json({
                error: "User ID is required"
            });
        }

        if (!mood_id) {
            return res.status(400).json({
                error: "Mood ID is required"
            });
        }

        const data = await checkIfMoodSaved(
            user_id,
            mood_id
        );

        return res.status(200).json({
            saved: data
        });

    } catch (error) {
        console.error("Check saved mood route error:", error);

        return res.status(500).json({
            error: "Unable to check saved mood"
        });
    }
});

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
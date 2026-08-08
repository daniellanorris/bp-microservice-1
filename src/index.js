import 'dotenv/config';
import express from 'express'
import { saveMovie, getMovies } from "./lib/movies/movieHandlers.js";

const app = express()

// config listener

app.listen(process.env.LOCALHOST, () => {
    console.log('Listening on port', process.env.LOCALHOST)
})

/* Base route to make sure running on port */

app.get('/', (req, res) => {
    res.send("Hello from Express!")
})

/* ROUTES */

// save movie post
app.post('/save-movie/:id', async (req, res) => {
    const user_id = req.params.id;
    const movie_id = req.query.movie_id;

    const data = await saveMovie(user_id, movie_id);

    res.status(201).send(data);
});

// get movie post

app.get('/saved-movies', async (req, res) => {
    const user_id = req.query.id;

    const data = await getMovies(user_id);

    res.status(200).send(data);
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






import mongoose from 'mongoose';

const favoriteExerciseSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    exercise_name: {
        type: String,
        required: true
    }
});

export default mongoose.model('FavoriteExercise', favoriteExerciseSchema);
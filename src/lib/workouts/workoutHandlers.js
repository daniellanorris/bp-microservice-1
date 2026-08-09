import FavoriteExercise from './models/favoriteExercise.js';

export async function saveWorkout(user_id, exercise_name) {
    try {
        const favorite = await FavoriteExercise.create({
            user_id: user_id,
            exercise_name: exercise_name
        });

        return {
            success: true,
            data: favorite
        };
    } catch (error) {
        console.error("DB ERROR:", error.message);

        return {
            success: false,
            error: error.message
        };
    }
}

export async function getWorkouts(user_id) {
    try {
        const favorites = await FavoriteExercise.find({ user_id: user_id });

        return favorites;

    } catch (error) {
        console.error("DB Error:", error.message);
        return null;
    }
}

export async function checkIfWorkoutSaved(user_id, exercise_name) {
    try {
        const favorite = await FavoriteExercise.findOne({
            user_id: user_id,
            exercise_name: exercise_name
        });

        return favorite !== null;

    } catch (error) {
        console.error("Check saved workout error:", error.message);
        throw error;
    }
}
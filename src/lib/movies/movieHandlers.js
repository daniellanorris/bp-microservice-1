import supabase from './db-connector.js';

export async function saveMovie(user_id, movie_id) {
    try {
        const { data, error } = await supabase
            .from("SavedMovies")
            .insert({
                user_id: user_id,
                movie_id: movie_id
            })
            .select();

        console.log("Supabase save response:", { data, error });

        if (error) {
            console.error("DB Error:", error.message);

            return {
                success: false,
                error: error.message
            };
        }

        return {
            success: true,
            data: data
        };

    } catch (error) {
        console.error("DB Error:", error.message);

        return {
            success: false,
            error: error.message
        };
    }
}
export async function getMovies(user_id) {
    try {
        const { data, error } = await supabase
            .from("SavedMovies")
            .select("*")
            .eq("user_id", user_id);

        if (error) {
            console.error("DB Error:", error.message);
            return null;
        }

        console.log('data', data)


        return data;
    }
    catch (error) {
        console.error("DB Error:", error.message);
        return null;
    }
}
export async function checkIfMovieSaved(user_id, movie_id) {
    try {
        const { data, error } = await supabase
            .from("SavedMovies")
            .select("movie_id")
            .eq("user_id", user_id)
            .eq("movie_id", movie_id)

        if (error) {
            console.error("DB Error:", error.message);
            throw error;
        }

        console.log(data)

        if (data.length === 0) {
            return false
        }

        return true

    } catch (error) {
        console.error("Check saved movie error:", error.message);
        throw error;
    }
}
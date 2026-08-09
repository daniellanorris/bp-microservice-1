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

        return data;
    }
    catch (error) {
        console.error("DB Error:", error.message);
        return null;
    }
}
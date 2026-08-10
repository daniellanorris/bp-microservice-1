import supabase from "./db-connector.js";


// Save a mood as a favorite
export async function saveMood(user_id, mood_id, mood, note) {
    try {
        // Check if this mood is already saved
        const { data: existingMood, error: checkError } = await supabase
            .from("SavedMoods")
            .select("*")
            .eq("user_id", user_id)
            .eq("mood_id", mood_id);

        if (checkError) {
            console.error("DB Error:", checkError.message);

            return {
                success: false,
                error: checkError.message
            };
        }

        // Don't create duplicate favorites
        if (existingMood.length > 0) {
            return {
                success: false,
                error: "Mood is already saved"
            };
        }

        const { data, error } = await supabase
            .from("SavedMoods")
            .insert({
                user_id: user_id,
                mood_id: mood_id,
                mood: mood,
                note: note
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
        console.error("Save mood error:", error.message);

        return {
            success: false,
            error: error.message
        };
    }
}


// Remove a mood from favorites
export async function removeMood(user_id, mood_id) {
    try {
        const { data, error } = await supabase
            .from("SavedMoods")
            .delete()
            .eq("user_id", user_id)
            .eq("mood_id", mood_id)
            .select();

        console.log("Supabase remove response:", { data, error });

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
        console.error("Remove mood error:", error.message);

        return {
            success: false,
            error: error.message
        };
    }
}


// Get all saved moods for a user
export async function getMoods(user_id) {
    try {
        const { data, error } = await supabase
            .from("SavedMoods")
            .select("*")
            .eq("user_id", user_id);

        if (error) {
            console.error("DB Error:", error.message);
            return null;
        }

        console.log("Saved moods:", data);

        return data;

    } catch (error) {
        console.error("Get moods error:", error.message);

        return null;
    }
}


// Check if a specific mood is saved
export async function checkIfMoodSaved(user_id, mood_id) {
    try {
        const { data, error } = await supabase
            .from("SavedMoods")
            .select("mood_id")
            .eq("user_id", user_id)
            .eq("mood_id", mood_id);

        if (error) {
            console.error("DB Error:", error.message);
            throw error;
        }

        return data.length > 0;

    } catch (error) {
        console.error("Check saved mood error:", error.message);
        throw error;
    }
}
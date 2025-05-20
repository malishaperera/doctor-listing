import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, anonKey);
export default async function mediaUpload(file: File): Promise<string> {
    if (!file) {
        throw new Error("No file selected");
    }

    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name}`;

    try {
        const { error } = await supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        });

        if (error) {
            if (error) {
                console.error("Supabase Upload Error:", error);
                throw new Error(error.message || "Failed to upload file to Supabase.");
            }
        }

        const { data } = supabase.storage.from("images").getPublicUrl(fileName);
        return data.publicUrl;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("An unknown error occurred while uploading the file.");
    }
}
import mongoose from "mongoose";
import colors from "colors";
import { MONGO_URI } from "./env";

export const connection = async () => {
    try {
        const mongoUri = MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the .env file");
        }

        await mongoose.connect(mongoUri);
        console.log(colors.magenta.bold("Successfully connected to the octa_studio_db database"));
    } catch (error) {
        console.log(colors.red.bold("Could not connect to the database"));
        console.log(error);
        throw new Error("Could not connect to the database");
    }
}

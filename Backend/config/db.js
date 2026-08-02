import mongoose from "mongoose";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.log("MongoDB Error: MONGO_URI is not defined");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("DB CONNECTED");
    } catch (error) {
        console.log("MongoDB Error:", error.message);
    }
};
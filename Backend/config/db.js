import mongoose from "mongoose";
import dns from "dns";
import 'dotenv/config';

try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
    // Keep system DNS if setting servers fails
}

if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder("ipv4first");
}

export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error("MongoDB Error: MONGO_URI is not defined in environment variables");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("DB CONNECTED successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
    }
};
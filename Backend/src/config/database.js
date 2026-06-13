import mongoose from "mongoose";
import dns from "dns";

// Optional: use custom DNS servers when resolving MongoDB hosts
dns.setServers([
    "1.1.1.1",
    "8.8.8.8",
]);

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Failed to connect to DB", error);
        throw error;
    }
};

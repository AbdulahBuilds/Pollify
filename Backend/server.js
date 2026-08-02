import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);


import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import pollRouter from "./routes/pollRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import userRouter from "./routes/userRoutes.js";

// const dns = require('dns');
// dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 5000;
const isVercel = Boolean(process.env.VERCEL);

// MIDDLEWARE
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/auth', authRouter);
app.use('/api/polls', pollRouter);
app.use('/polls', pollRouter);
app.use('/api/comments', commentRouter);
app.use('/comments', commentRouter);
app.use('/api/users', userRouter);
app.use('/users', userRouter);
app.use('/api/notifications', notificationRouter);
app.use('/notifications', notificationRouter);

app.get("/", (req, res) => {
    res.send("Pollify API is active and working");
});

if (!isVercel) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

await connectDB();

export default app;

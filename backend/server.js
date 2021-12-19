import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import { notFound, errroHanlder } from "./middleware/errorMiddleware.js";
import path from "path";
dotenv.config();
const app = express();

// connecting to MongoDB
connectDb();

app.use(express.json());

//user Routes
app.use("/api/users", userRouter);

//Account Routes
app.use("/api/account", accountRouter);

//Transaction Routes
app.use("/api/transaction", transactionRouter);
//to serve static files
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
//middleware for handling 404 requests
app.use(notFound);

// middleware for error handling

app.use(errroHanlder);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`.blue.bold);
});

import customThemeRouter from "./routes/customTheme.router.js";
import express from "express";
import cors from "cors";
import proxyRouter from "./routes/proxy.js";
import mongoose from "mongoose";

const app = express();

const options = {
  useNewUrlParser: true, // For deprecation warnings
  useUnifiedTopology: true, // For deprecation warnings
};
const url =
  "mongodb+srv://Mvarcode:W6w3hL2M22QpRf@varcodeprod.vkky4.mongodb.net/cam-code?retryWrites=true&w=majority";
mongoose
  .connect(url, options)
  .then(() => console.log("connected"))
  .catch((err) => console.log(`connection error: ${err}`));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use("/api/customTheme", customThemeRouter);
app.use("/api/proxy", proxyRouter);

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.send("healthy");
});
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} - but on 443 in docker compose`);
});

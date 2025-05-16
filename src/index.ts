import express from "express";
import path from "path";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(express.json());

// API routes first
app.use("/api", orderRoutes);

// Serve React static files
const buildPath = path.join(__dirname, "../client/build");
app.use(express.static(buildPath));

// React client-side routing fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

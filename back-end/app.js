import express from "express";
import cors from "cors";
import actionRoutes from "./routes/actionRoutes.js";
import dataRoutes from "./routes/dataRoutes.js";
import { swagger } from "./swagger.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

swagger(app);

app.use("/api/datasensor", dataRoutes);
app.use("/api/action", actionRoutes);

//get datasensor

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import express from "express";
import cors from "cors";
import morgan from "morgan";
import neo4j from "neo4j-driver";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/appRouter";
import { config } from "dotenv";

config();
export const driver = neo4j.driver(
  process.env.NEO4J_CONN_STRING ?? "",
  neo4j.auth.basic("neo4j", process.env.NEO4J_PASSWORD ?? "")
);

const app = express();

app.use(morgan("tiny"));
app.use(cors({ origin: "*" }));

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.get("/", (req, res) => {
  res.send(":)");
});

const server = app.listen(5000);

server.on("close", async () => {
  await driver.close();
});

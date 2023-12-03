import express from "express";
import cors from "cors";
import morgan from "morgan";
import neo4j from "neo4j-driver";
import { RedisClientType, createClient } from "redis";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/appRouter";

export const driver = neo4j.driver(
  "neo4j+s://8a1816bb.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "p4LNVU37cwxf2f3Tt7J8mvsVkTfNpUIofAE82XJs9Sg")
);

let redisClient: RedisClientType;

(async () => {
  redisClient = await createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

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
  await redisClient.disconnect();
  await driver.close();
});

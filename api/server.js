const express = require("express");

const cors = require("cors");

const actionsRouter = require("../routers/actions-router");
const projectRouter = require("../routers/projects-router");
const projectIdRouter = require("../routers/project_id-router");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/actions", logger, actionsRouter);
server.use("/api/projects", logger, projectRouter);
server.use("/api/project_id", logger, projectIdRouter);
server.get("/", logger, (req, res) => {
  res.send(`<h2>appear!</h2>`);
});

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`, Date.now());
  next();
}

module.exports = server;

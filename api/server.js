const express = require("express");
const helmet = require("helmet");

const db = require("../data/dbConfig.js");

const server = express();

server.use(helmet());
server.use(express.json());

// GET projects -works
server.get("/api/projects", async (req, res) => {
  try {
    const projects = await db("projects");
    const actions = await db("actions");
    res.status(200).json({ projects, actions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// GET project by id - doesn't show actions
server.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await db("projects");
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});
// POST project - works
server.post("/api/projects", async (req, res) => {
  try {
    const projects = await db("projects").insert(req.body);
    res.status(201).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// POST action  - works
server.post("/api/projects/:id", async (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };
  try {
    const action = await db("actions").insert(actionInfo);
    res.status(201).json(action);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});
module.exports = server;

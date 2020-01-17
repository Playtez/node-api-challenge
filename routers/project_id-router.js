const express = require("express");

const project = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  project
    .getProjectActions()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Server Issue"
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  project
    .getProjectActions(id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Server Issue"
      });
    });
});

module.exports = router;

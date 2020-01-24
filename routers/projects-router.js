const express = require("express");

const project = require("../data/helpers/projectModel");
const action = require("../data/helpers/actionModel");
const router = express.Router();

router.post("/", (req, res) => {
  const createProj = req.body;
  project
    .insert(createProj)
    .then(created => {
      res.status(201).json(created);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "Server Issue"
      });
    });
});

router.post("/:id/actions", (req, res) => {
  let info = req.body;
  info = { ...info, project_id: req.params.id };
  action
    .insert(info)
    .then(create => {
      res.status(201).json(create);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server issue"
      });
    });
});

router.get("/", (req, res) => {
  project
    .get()
    .then(grab => {
      res.status(200).json(grab);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server issue"
      });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  project
    .get(id)
    .then(grab => {
      res.status(200).json(grab);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server issue"
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const postChange = req.body;
  project
    .update(id, postChange)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server error"
      });
    });
});
router.put("/:id/actions", (req, res) => {
  const id = req.params.id;
  const actionChanges = req.body;
  action
    .update(id, actionChanges)
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server issue",
        error
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  project
    .remove(id)
    .then(deleted => {
      res.status(204).json(deleted);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server issue"
      });
    });
});

const validateIfActionExists = projID => {
  return (req, res, next) => {
    if (req.body.id === projID) {
      next();
    } else {
      console.log("no action has happened");
    }
  };
};

module.exports = router;

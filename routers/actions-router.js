const express = require("express");

const action = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  action
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server issue"
      });
    });
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  action
    .get(id)
    .then(getAction => {
      res.status(200).json(getAction);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server issue",
        error
      });
    });
});

router.put("/:id", (req, res) => {
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
  action
    .remove(id)
    .then(deleted => {
      res.status(204).json(deleted);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "server issue",
        error
      });
    });
});

module.exports = router;

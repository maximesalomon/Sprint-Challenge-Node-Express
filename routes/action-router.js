const express = require('express');
const router = express.Router();
const actionDb = require("../data/helpers/actionModel");

router.get('/:id', async (req, res) => {
  try {
    const action = await actionDb.get(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "The action with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The action information could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  try {
    const actions = await actionDb.insert(req.body);
    const content = await actionDb.get(actions.id)
    if (content.description && content.notes) {
        res.status(201).json(req.body);
    } else {
        res.status(400).json({ errorMessage: "Please provide description and notes for the action." })
    }
  } catch (error) {
        res.status(500).json({ error: "There was an error while saving the action to the database" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const content = await actionDb.get(req.params.id)
    const action = await actionDb.remove(req.params.id);

    if (action > 0) {
      res.status(200).json({
        message: content
      });
    } else {
      res.status(404).json({ message: "The action with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The action could not be removed" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const action = await actionDb.update(req.params.id, req.body);
    if (req.body.description && req.body.notes) {
      res.status(200).json(req.body);
    } else {
      res.status(400).json({ errorMessage: "Please provide description and notes for the action." })
    }
  } catch (error) {
    res.status(500).json({ error: "The action information could not be modified." });
  }
});

module.exports = router;
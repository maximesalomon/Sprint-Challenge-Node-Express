const express = require('express');
const router = express.Router();
const projectDb = require("../data/helpers/projectModel");

router.get('/:id', async (req, res) => {
  try {
    const project = await projectDb.get(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The project information could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  try {
    const project = await projectDb.insert(req.body);
    const content = await projectDb.get(project.id)
    if (content.name && content.description) {
        res.status(201).json(req.body);
    } else {
        res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    }
  } catch (error) {
        res.status(500).json({ error: "There was an error while saving the project to the database" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const content = await projectDb.get(req.params.id)
    const project = await projectDb.remove(req.params.id);

    if (project > 0) {
      res.status(200).json({
        message: content
      });
    } else {
      res.status(404).json({ message: "The project with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The project could not be removed" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const project = await projectDb.update(req.params.id, req.body);
    if (req.body.name && req.body.description) {
      res.status(200).json(req.body);
    } else {
      res.status(400).json({ errorMessage: "Please provide name and description for the project." })
    }
  } catch (error) {
    res.status(500).json({ error: "The project information could not be modified." });
  }
});

module.exports = router;
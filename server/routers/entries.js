const { Router } = require("express");
const entry = require("../models/entry");

const router = Router();

// Create record in MongoDB
router.post("/entries", (request, response) => {
  const newEntry = new entry.model(request.body);
  console.log("request", request);
  console.log("response", response);
  console.log("newEntry", newEntry);
  newEntry.save((err, entry) => {
    return err ? response.sendStatus(500).json(err) : response.json(entry);
  });
});

// Get all entry records
router.get("/entries", (request, response) => {
  entry.model.find({}, (error, data) => {
    if (error) return res.sendStatus(500).json(error);
    return response.json(data);
  });
});

// Get a entry by ID
router.get("/entries/:id", (request, response) => {
  entry.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// Delete a entry by ID
router.delete("/entries/:id", (request, response) => {
  entry.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// Update a entry by ID
router.put("/entries/:id", (request, response) => {
  const body = request.body;
  entry.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        name: body.name,
        rsvp: body.rsvp,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

module.exports = router;

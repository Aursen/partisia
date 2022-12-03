module.exports = app => {
    const surveys = require("../controllers/survey.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", surveys.create);

    // Retrieve all Tutorials
    router.get("/", surveys.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", surveys.findOne);

    // Update a Tutorial with id
    router.put("/:id", surveys.update);

    // Delete a Tutorial with id
    router.delete("/:id", surveys.delete);

    // Create a new Tutorial
    router.delete("/", surveys.deleteAll);

    app.use('/api/surveys', router);
};
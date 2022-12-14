module.exports = app => {
    const questions = require("../controllers/question.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", questions.create);

    // Retrieve all Tutorials
    router.get("/survey/:id", questions.findAllQuestionsBySurvey);

    // Retrieve a single Tutorial with id
    router.get("/:id", questions.findOne);

    // Update a Tutorial with id
    router.put("/:id", questions.update);

    // Delete a Tutorial with id
    router.delete("/:id", questions.delete);

    // Create a new Tutorial
    router.delete("/", questions.deleteAll);

    app.use('/api/questions', router);
};
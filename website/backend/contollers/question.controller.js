const db = require("../models");
const Question = db.question;

// Create and Save a new Survey
exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Question
    const question = new Question({
        text: req.body.text,
        idSurvey: req.body.idSurvey,
    });

    // Save Question in the database
    question
    .save(question)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Question."
        });
    });
};


// Retrieve all Questions from the database.
exports.findAllQuestionsBySurvey = (req, res) => {
    const idSurvey = req.query.idSurvey;
    var condition =  idSurvey;

    Question.find({idSurvey:idSurvey})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving questions."
        });
    });
};

// Find a single Question with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Question.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Question with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Question with id=" + id });
    });
};

// Update a Question by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: "Data to update can not be empty!"});
    }

    const id = req.params.id;

    Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Question with id=${id}. Maybe Question was not found!`
            });
        } else res.send({ message: "Question was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Question with id=" + id
        });
    });
};

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Question.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
            });
        } else {
            res.send({
                message: "Question was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Question with id=" + id
        });
    });
};

// Delete all Questions from the database.
exports.deleteAll = (req, res) => {
    Question.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Questions were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all questions."
        });
    });
};
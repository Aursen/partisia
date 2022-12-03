const db = require("../models");
const Answer = db.answer;

// Create and Save a new Survey
exports.create = (req, res) => {
    // Validate request
    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Answer
    const answer = new Answer({
        text: req.body.text,
        idQuestion: req.body.idQuestion,
    });

    // Save Answer in the database
    answer
    .save(answer)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Answer."
        });
    });
};


// Retrieve all Answers from the database.
exports.findAllAnswersByQuestion = (req, res) => {
    const idQuestion = req.query.idQuestion;
    var condition = idQuestion ;

    Answer.find({idQuestion:condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving answers."
        });
    });
};

// Find a single Answer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Answer.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Answer with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Answer with id=" + id });
    });
};

// Update a Answer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: "Data to update can not be empty!"});
    }

    const id = req.params.id;

    Answer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Answer with id=${id}. Maybe Answer was not found!`
            });
        } else res.send({ message: "Answer was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Answer with id=" + id
        });
    });
};

// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Answer.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`
            });
        } else {
            res.send({
                message: "Answer was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Answer with id=" + id
        });
    });
};

// Delete all Answers from the database.
exports.deleteAll = (req, res) => {
    Answer.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Answers were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all answers."
        });
    });
};
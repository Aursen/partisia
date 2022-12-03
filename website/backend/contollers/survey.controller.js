const db = require("../models");
const Survey = db.survey;

// Create and Save a new Survey
exports.create = (req, res) => {
    console.log("function");
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Survey
    const survey = new Survey({
        title: req.body.title,
        description: req.body.description,
        downloads: req.body.downloads,
        answers: req.body.answers
    });

    // Save Survey in the database
    survey
    .save(survey)
    .then(data => {
        console.log("Survey saved");
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Survey."
        });
    });
};


// Retrieve all Surveys from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Survey.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving surveys."
        });
    });
};

// Find a single Survey with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Survey.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Survey with id " + id });
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Error retrieving Survey with id=" + id });
    });
};

// Update a Survey by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: "Data to update can not be empty!"});
    }

    const id = req.params.id;

    Survey.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Survey with id=${id}. Maybe Survey was not found!`
            });
        } else res.send({ message: "Survey was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Survey with id=" + id
        });
    });
};

// Delete a Survey with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Survey.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Survey with id=${id}. Maybe Survey was not found!`
            });
        } else {
            res.send({
                message: "Survey was deleted successfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Survey with id=" + id
        });
    });
};

// Delete all Surveys from the database.
exports.deleteAll = (req, res) => {
    Survey.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Surveys were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all surveys."
        });
    });
};

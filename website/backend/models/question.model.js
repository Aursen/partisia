module.exports = mongoose => {
    var schema = mongoose.Schema(
    {
        text: String,
        idSurvey: String
    },
    { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Question = mongoose.model("question", schema);
    return Question;
};
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        downloads: Number,
        answers: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Survey = mongoose.model("survey", schema);
    return Survey;
  };
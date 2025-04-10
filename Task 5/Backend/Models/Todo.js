const mongoose = require("mongoose");

var todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    completion: {
      type: Boolean,
      required: true,
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clients",
    },
  },

  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Todo", todoSchema);

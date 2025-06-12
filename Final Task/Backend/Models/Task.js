const mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["to-do", "in-progress", "done", "cancelled"],
      default: "to-do",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Teams",
    },
    assigned_to: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Teams",
      },
    ],
    deadline: {
      type: Date,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Tasks", TaskSchema);

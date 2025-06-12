const mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teams",
      require: true,
    },
    team_members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teams",
      },
    ],
    status: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Project", ProjectSchema);

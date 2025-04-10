const mongoose = require("mongoose");
const validateMongoDbId = (id, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("This id is not valid or not Found");
  }
};
module.exports = validateMongoDbId;

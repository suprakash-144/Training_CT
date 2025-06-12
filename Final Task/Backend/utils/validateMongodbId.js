const mongoose = require("mongoose");
const validateMongoDbId = (id) => {
  //  Check if the Id is a valid MongoDB ObjectID
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new Error("This id is not valid or not Found");
};
module.exports = validateMongoDbId;

const mongoose = require("mongoose"); // Erase if already required
const AutoIncrement = require("mongoose-sequence")(mongoose);
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
userSchema.plugin(AutoIncrement, { inc_field: "id" });

//Export the model
module.exports = mongoose.model("todos", userSchema);

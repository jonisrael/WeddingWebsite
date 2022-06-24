const mongoose = require("mongoose");

// column and x value are the same
const entrySchema = new mongoose.Schema({
  name: String,
  rsvp: Boolean,
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = {
  model: Entry,
  schema: entrySchema,
};

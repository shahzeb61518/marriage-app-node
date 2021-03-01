const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  senderId: { type: String, required: true },
  senderName: { type: String },
  senderImage: { type: String },
  toId: { type: String, required: true },
  toName: { type: String },
  toImage: { type: String },
  message: { type: String, required: true },
});
module.exports = mongoose.model("Chat", chatSchema);

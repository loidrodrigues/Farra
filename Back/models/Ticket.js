const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventTime: {
    type: String,
    default: "",
  },
  eventLocation: {
    type: String,
    default: "",
  },
  eventAddress: {
    type: String,
    default: "",
  },
  eventDescription: {
    type: String,
    default: "",
  },
  eventImage: {
    type: String,
    default: "",
  },
  eventCategory: {
    type: String,
    default: "Evento",
  },
  ticketType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;

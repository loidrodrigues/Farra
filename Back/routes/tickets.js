const express = require("express");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");
const { sendInvitationEmail } = require("../utils/invitation");

const router = express.Router();

// Vender ingresso (criar ticket)
router.post("/sell", authenticateToken, async (req, res) => {
  try {
    const {
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      eventAddress,
      eventDescription,
      eventImage,
      eventCategory,
      tickets, // Array of tickets
    } = req.body;

    if (!Array.isArray(tickets)) {
      // Backward compatibility: single ticket
      const { ticketType, price, quantityAvailable } = req.body;

      const newTicket = new Ticket({
        eventTitle,
        eventDate,
        eventTime: eventTime || "",
        eventLocation: eventLocation || "",
        eventAddress: eventAddress || "",
        eventDescription: eventDescription || "",
        eventImage: eventImage || "",
        eventCategory: eventCategory || "Evento",
        ticketType,
        price,
        quantityAvailable,
        seller: req.user.userId,
      });

      await newTicket.save();

      return res
        .status(201)
        .json({ message: "Ingresso criado com sucesso", ticket: newTicket });
    }

    // Multiple tickets: create all or none
    const createdTickets = [];
    try {
      for (const ticketData of tickets) {
        const newTicket = new Ticket({
          eventTitle,
          eventDate,
          eventTime: eventTime || "",
          eventLocation: eventLocation || "",
          eventAddress: eventAddress || "",
          eventDescription: eventDescription || "",
          eventImage: eventImage || "",
          eventCategory: eventCategory || "Evento",
          ticketType: ticketData.type,
          price: ticketData.price,
          quantityAvailable: ticketData.quantity,
          seller: req.user.userId,
        });

        await newTicket.save();
        createdTickets.push(newTicket);
      }

      res.status(201).json({
        message: "Ingressos criados com sucesso",
        tickets: createdTickets,
      });
    } catch (error) {
      // If any fails, delete the created ones
      for (const ticket of createdTickets) {
        await Ticket.findByIdAndDelete(ticket._id);
      }
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Comprar ingresso
router.post("/buy/:ticketId", authenticateToken, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { quantity } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ingresso não encontrado" });
    }

    if (ticket.buyer) {
      return res.status(400).json({ message: "Ingresso já vendido" });
    }

    if (quantity > ticket.quantityAvailable) {
      return res.status(400).json({ message: "Quantidade indisponível" });
    }

    if (quantity === ticket.quantityAvailable) {
      // Compra total, atualiza o ingresso original
      const boughtQuantity = ticket.quantityAvailable; // Save before setting to 0
      ticket.buyer = req.user.userId;
      ticket.quantityAvailable = 0;
      await ticket.save();

      // Send invitation email asynchronously
      const buyer = await User.findById(req.user.userId);
      if (buyer && buyer.email) {
        sendInvitationEmail(ticket, buyer.email, boughtQuantity).catch((err) =>
          console.error("Failed to send invitation email:", err)
        );
      }

      return res.json({ message: "Compra realizada com sucesso", ticket });
    } else {
      // Compra parcial, cria um novo ingresso para o comprador
      ticket.quantityAvailable -= quantity;
      await ticket.save();

      const newTicket = new Ticket({
        eventTitle: ticket.eventTitle,
        eventDate: ticket.eventDate,
        eventTime: ticket.eventTime,
        eventLocation: ticket.eventLocation,
        eventAddress: ticket.eventAddress,
        eventDescription: ticket.eventDescription,
        eventImage: ticket.eventImage,
        eventCategory: ticket.eventCategory,
        ticketType: ticket.ticketType,
        price: ticket.price,
        quantityAvailable: quantity,
        seller: ticket.seller,
        buyer: req.user.userId,
      });

      await newTicket.save();

      // Send invitation email asynchronously
      const buyer = await User.findById(req.user.userId);
      if (buyer && buyer.email) {
        sendInvitationEmail(newTicket, buyer.email).catch((err) =>
          console.error("Failed to send invitation email:", err)
        );
      }

      return res.json({
        message: "Compra parcial realizada com sucesso",
        ticket: newTicket,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Listar ingressos disponíveis para compra
router.get("/available", async (req, res) => {
  try {
    const tickets = await Ticket.find({ buyer: null }).populate(
      "seller",
      "username"
    );
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Listar ingressos vendidos pelo usuário logado
router.get("/sold", authenticateToken, async (req, res) => {
  try {
    const tickets = await Ticket.find({ seller: req.user.userId }).populate(
      "buyer",
      "username"
    );
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Listar ingressos comprados pelo usuário logado
router.get("/bought", authenticateToken, async (req, res) => {
  try {
    const tickets = await Ticket.find({ buyer: req.user.userId }).populate(
      "seller",
      "username"
    );
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate(
      "seller",
      "username"
    );
    if (!ticket) {
      return res.status(404).json({ message: "Ingresso não encontrado" });
    }
    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;

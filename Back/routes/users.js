const express = require("express");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find user info
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Find tickets sold by user
    const soldTickets = await Ticket.find({ seller: userId }).populate(
      "buyer",
      "username email"
    );

    // Find tickets bought by user
    const boughtTickets = await Ticket.find({ buyer: userId }).populate(
      "seller",
      "username email"
    );

    res.json({
      user,
      soldTickets,
      boughtTickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const User = require("../models/User");

// Load environment variables
dotenv.config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      isOrganizer,
      organizationName,
      bankAccount,
      nif,
    } = req.body;

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário ou email já existe" });
    }

    // Hash da senha
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const newUser = new User({
      username,
      email,
      passwordHash,
      isOrganizer: isOrganizer || false,
      organizationName: isOrganizer ? organizationName : undefined,
      bankAccount: isOrganizer ? bankAccount : undefined,
      nif: isOrganizer ? nif : undefined,
    });

    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Encontrar usuário
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    // Gerar token JWT
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperação de Senha - Farra",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Recuperação de Senha</h2>
          <p>Olá,</p>
          <p>Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para criar uma nova senha:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${
              process.env.FRONTEND_URL || "http://localhost:5174"
            }/reset-password?token=${resetToken}"
               style="background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Redefinir Senha
            </a>
          </div>
          <p>Este link é válido por 1 hora.</p>
          <p>Se você não solicitou esta recuperação, ignore este email.</p>
          <p>Atenciosamente,<br>Equipe Farra</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erro ao enviar email:", error);
        return res
          .status(500)
          .json({ message: "Erro ao enviar email de recuperação" });
      }
      console.log("Email enviado:", info.response);
      res.json({ message: "Email de recuperação enviado com sucesso" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido ou expirado" });
    }

    // Hash new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    user.passwordHash = passwordHash;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Senha redefinida com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

module.exports = router;

const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

// Function to create email transporter
async function createTransporter() {
  if (
    process.env.SENDGRID_API_KEY &&
    process.env.SENDGRID_API_KEY.startsWith("SG.")
  ) {
    console.log("🚀 Using SendGrid for email sending");
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      secure: false,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  console.log("⚠️ Using Ethereal test account for development");
  let testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

// Generate QR code as Data URL for inline embedding
async function generateQRCode(ticket) {
  try {
    const qrData = JSON.stringify({
      ticketId: ticket._id.toString(),
      eventTitle: ticket.eventTitle,
      eventDate: ticket.eventDate.toISOString(),
      buyerId: ticket.buyer.toString(),
      ticketType: ticket.ticketType,
      price: ticket.price,
      quantity: ticket.quantityAvailable,
      type: "event_ticket",
      timestamp: new Date().toISOString(),
      validationHash: require("crypto")
        .createHash("sha256")
        .update(ticket._id + ticket.buyer + process.env.JWT_SECRET || "secret")
        .digest("hex")
        .substring(0, 16),
    });

    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}

// Template de email moderno e profissional
function createEmailTemplate(ticket, qrCodeDataURL) {
  const eventDate = new Date(ticket.eventDate).toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Seu Ingresso - ${ticket.eventTitle}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
        }
        .header {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
          color: white;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .event-details {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          margin: 20px 0;
        }
        .qr-container {
          text-align: center;
          margin: 30px 0;
          padding: 20px;
          background: #fffbeb;
          border-radius: 10px;
          border: 2px dashed #f59e0b;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #6b7280;
          font-size: 14px;
        }
        .detail-item {
          margin: 10px 0;
          display: flex;
          align-items: center;
        }
        .detail-item strong {
          min-width: 120px;
          color: #374151;
        }
        .icon {
          width: 18px;
          height: 18px;
          margin-right: 10px;
          vertical-align: middle;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 28px; font-weight: 600;">🎉 Seu Ingresso Chegou!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">${ticket.eventTitle}</p>
      </div>
      
      <div class="content">
        <p>Olá!</p>
        <p>Estamos muito felizes em confirmar sua participação no <strong>${
          ticket.eventTitle
        }</strong>. 
           Seu ingresso está confirmado e pronto para uso!</p>
        
        <div class="event-details">
          <h2 style="margin-top: 0; color: #374151;">📋 Detalhes do Evento</h2>
          
          <div class="detail-item">
            <strong>🎯 Evento:</strong> ${ticket.eventTitle}
          </div>
          <div class="detail-item">
            <strong>📅 Data:</strong> ${eventDate}
          </div>
          <div class="detail-item">
            <strong>⏰ Horário:</strong> ${ticket.eventTime || "A ser definido"}
          </div>
          <div class="detail-item">
            <strong>📍 Local:</strong> ${
              ticket.eventLocation || "Local a definir"
            }
          </div>
          <div class="detail-item">
            <strong>🏠 Endereço:</strong> ${
              ticket.eventAddress || "A ser confirmado"
            }
          </div>
          <div class="detail-item">
            <strong>🎫 Tipo:</strong> ${ticket.ticketType}
          </div>
          <div class="detail-item">
            <strong>🔢 Quantidade:</strong> ${ticket.quantity || 1} ingresso(s)
          </div>
        </div>

        <div class="qr-container">
          <h3 style="color: #d97706; margin-top: 0;">📱 QR Code de Acesso</h3>
          <p>Apresente este código na entrada do evento:</p>
          <img src="${qrCodeDataURL}" alt="QR Code do Ingresso"
               style="max-width: 250px; border: 3px solid #f59e0b; border-radius: 12px; padding: 15px; background: white;" />
          <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
            ⚠️ Este QR Code é único e intransferível
          </p>
        </div>

        <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
          <h4 style="margin: 0; color: #065f46;">💡 Informações Importantes</h4>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Chegue com 30 minutos de antecedência</li>
            <li>Apresente este QR Code na entrada</li>
            <li>Leve um documento com foto</li>
            <li>Em caso de dúvidas, responda este email</li>
          </ul>
        </div>
      </div>
      
      <div class="footer">
        <p>Agradecemos sua confiança e desejamos um excelente evento! 🎊</p>
        <p><strong>Equipe Mind Eventos</strong></p>
        <p>📧 contato@mindeventos.com • 🌐 www.mindeventos.com</p>
        <p style="font-size: 12px; color: #9ca3af;">
          Este é um email automático, por favor não responda diretamente.
        </p>
      </div>
    </body>
    </html>
  `;
}

// Send invitation email with QR code inline
async function sendInvitationEmail(ticket, buyerEmail, quantity = 1) {
  try {
    const transporter = await createTransporter();
    const qrCodeDataURL = await generateQRCode(ticket);
    const qrCodeCid = "qrcode_" + ticket._id; // Unique Content ID based on ticket ID

    // Add quantity info to ticket for email template
    const ticketWithQuantity = {
      ...ticket.toObject(),
      quantityAvailable: quantity,
    };

    const mailOptions = {
      from:
        process.env.EMAIL_FROM || '"Mind Eventos" <contato@mindeventos.com>',
      to: buyerEmail,
      subject: `🎟️ Seu Ingresso para ${ticket.eventTitle} - Mind Eventos`,
      html: createEmailTemplate(ticketWithQuantity, qrCodeDataURL),
      // No attachments needed since QR code is inline as data URL
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "High",
      },
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    if (!process.env.SENDGRID_API_KEY) {
      console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error("❌ Error sending invitation email:", {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

module.exports = {
  sendInvitationEmail,
  generateQRCode,
};

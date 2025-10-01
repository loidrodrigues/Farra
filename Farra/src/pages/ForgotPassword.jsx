import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setMessage(
        "Email de recuperação enviado. Verifique sua caixa de entrada."
      );
    } catch (err) {
      setError(err.message || "Erro ao enviar email de recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="max-w-md w-[400px] bg-white rounded-lg shadow-lg p-8 ">
        <h1 className="text-3xl font-bold text-dark mb-6">Recuperar Senha</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="seu@email.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-gray-900 transition-colors font-medium"
          >
            {loading ? "Enviando..." : "Enviar email de recuperação"}
          </button>
          {message && <p className="text-green-600 mt-4">{message}</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 text-sm text-primary underline"
        >
          Voltar ao login
        </button>
      </div>
    </div>
  );
}

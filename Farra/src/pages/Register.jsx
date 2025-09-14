import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email inválido";
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória";
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await registerUser({
          username: name,
          email,
          password,
        });
        setSuccessMessage("Conta criada com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setErrors({ general: error.message || "Erro ao registrar" });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg mt-30 mb-30 shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark font-fredoka">
            FARRA<span className="text-primary">.</span>
          </h1>
          <p className="text-gray-600 mt-2 font-inter">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 font-inter"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-inter ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Seu nome completo"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1 font-inter">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 font-inter"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-inter ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-inter">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 font-inter"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-inter ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Sua senha"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-inter">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 font-inter"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary font-inter ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirme sua senha"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-inter">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-gray-900 cursor-pointer transition-colors font-medium font-inter disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar Conta"}
          </button>
          {successMessage && (
            <p className="text-green-500 text-sm mt-4 text-center">
              {successMessage}
            </p>
          )}
          {errors.general && (
            <p className="text-red-500 text-sm mt-4 text-center">
              {errors.general}
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-gray-900 hover:text-red-700 font-medium"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

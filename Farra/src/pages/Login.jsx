import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle login logic here
      console.log("Login attempt:", { email, password });
    }
  };

  return (
    <div className="min-h-screen bg-light flex items-center justify-center px-4">
      <div className="max-w-md w-[400px] bg-white rounded-lg shadow-lg p-8 ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark ">
            FARRA<span className="text-primary">.</span>
          </h1>
          <p className="text-gray-600 mt-2 font-inter">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Insira Sua senha"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-inter">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-gray-900 transition-colors font-medium font-inter"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm ">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-zinc-900 font-medium">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-md z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl font-bold text-white font-fredoka"
          >
            FARRA<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-200 hover:text-white transition-colors font-medium"
            >
              Inicio
            </Link>
            <Link
              to="/events"
              className="text-gray-200 hover:text-white transition-colors font-medium"
            >
              Explorar Eventos
            </Link>

            <Link
              to="/organizers"
              className="text-gray-200 hover:text-white transition-colors font-medium"
            >
              Para Organizadores
            </Link>
            <Link
              to="/sell-tickets"
              className="text-gray-200 hover:text-white transition-colors font-medium"
            >
              Vender Ingressos
            </Link>

            <Link
              to="/help"
              className=" text-gray-200 hover:text-white transition-colors font-medium"
            >
              Ajuda
            </Link>
          </nav>

          {/* Auth Buttons or User Info */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-white font-medium hover:text-gray-200 transition-colors"
                >
                  Olá, {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 text-white text-sm cursor-pointer rounded-md font-medium hover:bg-red-800 transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-amber-600 px-4 py-2 text-white text-sm cursor-pointer rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className=" px-4 py-2 rounded-md text-sm font-medium cursor-pointer text-white hover:bg-primary-dark transition-colors"
                >
                  Criar Conta
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-transform ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-opacity ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-white transition-transform ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                to="/events"
                className="text-gray-200 hover:text-white transition-colors font-medium"
              >
                Eventos
              </Link>
              <Link
                to="/events?category=shows"
                className="text-gray-200 hover:text-white transition-colors font-medium"
              >
                Shows
              </Link>
              <Link
                to="/events?category=festas"
                className="text-gray-200 hover:text-white transition-colors font-medium"
              >
                Festas
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-200 hover:text-white transition-colors font-medium"
              >
                Para Organizadores
              </Link>
              {user && (
                <Link
                  to="/profile"
                  className="text-gray-200 hover:text-white transition-colors font-medium"
                >
                  Perfil
                </Link>
              )}
            </nav>
            <div className="flex flex-col space-y-3 mt-6">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-white font-medium text-center mb-2 hover:text-gray-200 transition-colors"
                  >
                    Olá, {user.username}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-logout w-full text-center bg-red-600 text-white py-2 rounded-md hover:bg-red-800 transition-colors"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-outline w-full text-center">
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary w-full text-center"
                  >
                    Criar Conta
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

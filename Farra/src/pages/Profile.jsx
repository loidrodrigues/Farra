import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getUserProfile } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  User,
  Ticket,
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch {
        setError("Erro ao carregar perfil.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, navigate]);

  if (loading) {
    return (
      <section className="m-32">
        <div className="flex justify-center items-center h-64">
          <div className="loader animate-spin rounded-full border-8 border-t-amber-600 border-gray-200 h-16 w-16"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="m-32">
        <div className="text-center text-red-600 font-semibold">{error}</div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="m-32">
        <div className="text-center font-semibold">Perfil não encontrado.</div>
      </section>
    );
  }

  const { user: userInfo, soldTickets, boughtTickets } = profile;

  // Calculate summary stats
  const totalSoldTickets = soldTickets.reduce(
    (acc, ticket) => acc + ticket.quantityAvailable,
    0
  );
  const totalBoughtTickets = boughtTickets.reduce(
    (acc, ticket) => acc + ticket.quantityAvailable,
    0
  );
  const totalEarnings = soldTickets.reduce(
    (acc, ticket) => acc + ticket.price * ticket.quantityAvailable,
    0
  );
  const totalSpent = boughtTickets.reduce(
    (acc, ticket) => acc + ticket.price * ticket.quantityAvailable,
    0
  );

  return (
    <section className="m-8 md:m-16 lg:m-32">
      <div>
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-3 text-amber-700">
          <User className="w-8 h-8" />
          Perfil do Usuário
        </h1>

        {/* User Info */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 transition-shadow duration-300 hover:shadow-amber-300">
          <h2 className="text-xl mb-4 flex items-center gap-2 text-amber-700">
            <User className="w-6 h-6" />
            Informações Pessoais
          </h2>
          <p className="flex items-center gap-2 text-gray-700">
            <User className="w-5 h-5 text-amber-600" />
            <strong className="font-semibold">Nome de Usuário:</strong>{" "}
            {userInfo.username}
          </p>
          <p className="flex items-center gap-2 mt-2 text-gray-700">
            <ShoppingCart className="w-5 h-5 text-amber-600" />
            <strong className="font-semibold">Email:</strong> {userInfo.email}
          </p>
          {userInfo.isOrganizer && (
            <>
              <p className="flex items-center gap-2 mt-2 text-gray-700">
                <User className="w-5 h-5 text-amber-600" />
                <strong className="font-semibold">Organização:</strong>{" "}
                {userInfo.organizationName}
              </p>
              <p className="flex items-center gap-2 mt-2 text-gray-700">
                <User className="w-5 h-5 text-amber-600" />
                <strong className="font-semibold">Conta Bancária:</strong>{" "}
                {userInfo.bankAccount}
              </p>
              {userInfo.nif && (
                <p className="flex items-center gap-2 mt-2 text-gray-700">
                  <User className="w-5 h-5 text-amber-600" />
                  <strong className="font-semibold">NIF:</strong> {userInfo.nif}
                </p>
              )}
            </>
          )}
        </div>

        {/* Summary Stats */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-amber-700">
          <div className="border border-amber-300 rounded-lg p-4">
            <Package className="mx-auto mb-2 w-6 h-6" />
            <p className="text-lg font-semibold">{totalSoldTickets}</p>
            <p>Ingressos Vendidos</p>
          </div>
          <div className="border border-amber-300 rounded-lg p-4">
            <ShoppingCart className="mx-auto mb-2 w-6 h-6" />
            <p className="text-lg font-semibold">{totalBoughtTickets}</p>
            <p>Ingressos Comprados</p>
          </div>
          <div className="border border-amber-300 rounded-lg p-4">
            <DollarSign className="mx-auto mb-2 w-6 h-6" />
            <p className="text-lg font-semibold">{totalEarnings} Kz</p>
            <p>Total Ganho</p>
          </div>
          <div className="border border-amber-300 rounded-lg p-4">
            <DollarSign className="mx-auto mb-2 w-6 h-6" />
            <p className="text-lg font-semibold">{totalSpent} Kz</p>
            <p>Total Gasto</p>
          </div>
        </div>

        {/* Sold Tickets */}
        <div className="mb-8">
          <h2 className="text-xl mb-4 flex items-center gap-2 text-amber-700">
            <Package className="w-6 h-6" />
            Ingressos Vendidos
          </h2>
          {soldTickets.length === 0 ? (
            <p className="text-gray-600">Nenhum ingresso vendido ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {soldTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                >
                  <h3 className="text-md mb-3 text-amber-700">
                    {ticket.eventTitle}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      Data:{" "}
                      {new Date(ticket.eventDate).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-amber-600" />
                      Tipo: {ticket.ticketType}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                      Preço: {ticket.price} Kz
                    </p>
                    {ticket.buyer ? (
                      <>
                        <p className="text-sm text-green-600 flex items-center gap-2">
                          <Package className="w-4 h-4 text-green-600" />
                          Status: Vendido
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <User className="w-4 h-4 text-amber-600" />
                          Comprador: {ticket.buyer.username}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-blue-600 flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        Disponível: {ticket.quantityAvailable} ingresso
                        {ticket.quantityAvailable > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bought Tickets */}
        <div>
          <h2 className="text-xl mb-4 flex items-center gap-2 text-amber-700">
            <ShoppingCart className="w-6 h-6" />
            Ingressos Comprados
          </h2>
          {boughtTickets.length === 0 ? (
            <p className="text-gray-600">Nenhum ingresso comprado ainda.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boughtTickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                >
                  <h3 className="text-md mb-3 text-amber-700">
                    {ticket.eventTitle}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      Data:{" "}
                      {new Date(ticket.eventDate).toLocaleDateString("pt-BR")}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-amber-600" />
                      Tipo: {ticket.ticketType}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-amber-600" />
                      Preço: {ticket.price} Kz
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Package className="w-4 h-4 text-amber-600" />
                      Quantidade: {ticket.quantityAvailable} ingresso
                      {ticket.quantityAvailable > 1 ? "s" : ""}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-600" />
                      Vendedor: {ticket.seller.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

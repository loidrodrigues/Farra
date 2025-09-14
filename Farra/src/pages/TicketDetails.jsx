import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { buyTicket, getTicketDetails } from "../services/api";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Plus,
  Minus,
  Share2,
  Heart,
  Users,
  CheckCircle,
} from "lucide-react";

export default function TicketDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(0);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const data = await getTicketDetails(id);
        setTicket(data);
      } catch {
        setError("Erro ao carregar detalhes do ingresso.");
      } finally {
        setLoading(false);
      }
    };
    fetchTicketDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="loader">Carregando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center text-gray-600">
          Ingresso não encontrado.
        </div>
      </div>
    );
  }

  // Map ticket data to event structure for display
  const event = {
    id: ticket._id,
    title: ticket.eventTitle,
    description:
      ticket.eventDescription || "Evento incrível aguardando por você!",
    image:
      ticket.eventImage || "https://via.placeholder.com/800x400?text=Evento",
    date: new Date(ticket.eventDate).toLocaleDateString("pt-BR"),
    time: ticket.eventTime || "Horário não especificado",
    location: ticket.eventLocation || "Local não especificado",
    address: ticket.eventAddress || "Endereço não especificado",
    category: ticket.eventCategory || "Evento",
    tickets: [
      {
        type: ticket.ticketType,
        price: ticket.price,
        available: ticket.quantityAvailable,
        description: `Ingresso do tipo ${ticket.ticketType}`,
      },
    ],
    organizer: {
      name: ticket.seller ? ticket.seller.username : "Organizador",
      rating: 4.5, // Default rating
      events: 1, // Default events count
    },
  };

  const incrementQuantity = () => {
    if (quantity < event.tickets[selectedTicket].available) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = event.tickets[selectedTicket].price * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm mt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/events"
              className="flex items-center text-gray-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar para eventos
            </Link>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-amber-600 transition-colors">
                <Share2 size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-amber-600 transition-colors">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lado Esquerdo - Informações do Evento */}
          <div>
            {/* Imagem do Evento */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

            {/* Informações Básicas */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-3">
                <Calendar size={20} className="mr-3 text-amber-600" />
                <span>Sábado, 15 de Dezembro de 2023</span>
              </div>

              <div className="flex items-center text-gray-600 mb-3">
                <Clock size={20} className="mr-3 text-amber-600" />
                <span>20:00 - 06:00</span>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={20} className="mr-3 text-amber-600" />
                <div>
                  <p className="font-medium">{event.location}</p>
                  <p className="text-sm">{event.address}</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle size={20} className="text-amber-600 mr-2" />
                  <span className="text-amber-800 font-medium">
                    Evento confirmado - Restam{" "}
                    {event.tickets[selectedTicket].available} ingressos
                  </span>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Sobre o Evento
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Organizador */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Organizador
              </h2>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {event.organizer.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="text-amber-400">★★★★☆</span>
                    <span className="ml-2">
                      {event.organizer.rating} • {event.organizer.events}{" "}
                      eventos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito - Compra de Ingressos */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Adquirir Ingressos
              </h2>

              {/* Seletor de Tipo de Ingresso */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Ingresso
                </label>
                <div className="space-y-3">
                  {event.tickets.map((ticket, index) => (
                    <label
                      key={index}
                      className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTicket === index
                          ? "border-amber-600 bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="ticketType"
                        value={index}
                        checked={selectedTicket === index}
                        onChange={() => setSelectedTicket(index)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {ticket.type}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {ticket.description}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {ticket.available} ingressos disponíveis
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-amber-600">
                            {ticket.price.toLocaleString("pt-AO")} AOA
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Seletor de Quantidade */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Quantidade
                </label>
                <div className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="text-lg font-semibold">{quantity}</span>

                  <button
                    onClick={incrementQuantity}
                    disabled={
                      quantity >= event.tickets[selectedTicket].available
                    }
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Resumo do Preço */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    {totalPrice.toLocaleString("pt-AO")} AOA
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>Taxa de serviço</span>
                  <span>{(totalPrice * 0.05).toLocaleString("pt-AO")} AOA</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-amber-600">
                    {(totalPrice * 1.05).toLocaleString("pt-AO")} AOA
                  </span>
                </div>
              </div>

              {/* Botão de Comprar */}
              <button
                onClick={async () => {
                  try {
                    await buyTicket(event.id, quantity);
                    alert("Compra realizada com sucesso!");
                  } catch (error) {
                    alert("Erro ao comprar ingresso: " + error.message);
                  }
                }}
                className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center"
              >
                <Ticket size={20} className="mr-2" />
                Comprar Ingressos
              </button>

              {/* Informações de Segurança */}
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-sm text-green-800">
                  <CheckCircle size={16} className="mr-2" />
                  Compra 100% segura e garantida
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="mt-6 text-xs text-gray-500">
                <p>• Ingressos serão enviados por email</p>
                <p>• Reembolsos disponíveis até 48h antes do evento</p>
                <p>• Apresente QR code na entrada</p>
              </div>
            </div>

            {/* Card de Localização */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin size={20} className="mr-2 text-amber-600" />
                Localização
              </h3>
              <div className="aspect-video bg-gray-200 rounded-lg mb-3">
                {/* Mapa seria integrado aqui */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Mapa do Local
                </div>
              </div>
              <p className="text-sm text-gray-600">{event.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

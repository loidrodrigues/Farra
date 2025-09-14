import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import { getAvailableTickets } from "../services/api";
import { ChevronDown, Loader } from "lucide-react";
import {
  PartyPopper,
  Presentation,
  Cake,
  Mic,
  Briefcase,
  HelpCircle,
} from "lucide-react";

export default function Events() {
  const location = useLocation();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAvailableTickets();
        setTickets(data);
      } catch {
        setError("Erro ao carregar ingressos.");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Get category from URL query params
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");

  // Map tickets to event-like structure
  let events = tickets.map((ticket) => ({
    id: ticket._id,
    title: ticket.eventTitle,
    image:
      ticket.eventImage || "https://via.placeholder.com/300x200?text=Evento",
    date: new Date(ticket.eventDate).toLocaleDateString("pt-BR"),
    location: ticket.eventLocation || "Local não especificado",
    price: ticket.price,
    category: ticket.eventCategory || "Evento",
    description: (ticket.eventDescription || "").slice(0, 60),
  }));

  // Filter events by category if selected
  if (selectedCategory) {
    events = events.filter((event) => event.category === selectedCategory);
  }

  if (loading) {
    return (
      <section className="m-32">
        <div className="flex justify-center items-center h-64">
          <Loader size={40} className="animate-spin text-amber-600" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="m-32">
        <div className="text-center text-red-600">{error}</div>
      </section>
    );
  }

  return (
    <section className="m-32">
      <div>
        <h1 className="text-2xl font-semibold">
          {selectedCategory
            ? `Eventos de ${selectedCategory}`
            : "Encontre os melhores eventos de Angola"}
        </h1>
        <div className="flex items-center mt-2">
          <p className="text-md opacity-90 text-zinc-500">
            {selectedCategory ? selectedCategory : "Entretenimento"}
          </p>
          <ChevronDown
            size={24}
            className="inline-block ml-1 text-amber-600 cursor-pointer"
          />
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <h1 className="text-sm font-thin">Não encontrou o que procurava?</h1>

          <button className=" bg-gray-900 mt-4 border rounded-md px-4 py-2  text-sm opacity-90 text-white">
            Explore Todos os Eventos
          </button>
        </div>
      </div>
    </section>
  );
}

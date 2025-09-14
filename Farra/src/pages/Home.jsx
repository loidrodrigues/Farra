import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import { getAvailableTickets } from "../services/api";
import { PartyPopper, Presentation, Cake, Mic, Briefcase } from "lucide-react";
import CallAction from "../components/callAction";

export default function Home() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/events?category=${encodeURIComponent(categoryTitle)}`);
  };

  const categories = [
    {
      id: 1,
      title: "Festas Noturnas",
      icon: PartyPopper,
      description: "Diversão noturna e música",
    },
    {
      id: 2,
      title: "Palestras & Workshops",
      icon: Presentation,
      description: "Aprendizado e networking",
    },
    {
      id: 3,
      title: "Aniversários & Celebrações",
      icon: Cake,
      description: "Momentos especiais e alegria",
    },
    {
      id: 4,
      title: "Shows & Concertos",
      icon: Mic,
      description: "Música ao vivo e entretenimento",
    },
    {
      id: 5,
      title: "Eventos Corporativos",
      icon: Briefcase,
      description: "Reuniões e negócios",
    },
  ];

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

  if (loading) {
    return (
      <section className="m-32">
        <div className="flex justify-center items-center h-64">
          <div className="loader">Carregando...</div>
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

  // Group tickets by event (unique eventTitle + eventDate)
  const eventsMap = new Map();

  tickets.forEach((ticket) => {
    const eventKey = `${ticket.eventTitle}-${ticket.eventDate.split("T")[0]}`;

    if (!eventsMap.has(eventKey)) {
      eventsMap.set(eventKey, {
        id: ticket._id, // Use first ticket ID as representative
        title: ticket.eventTitle,
        image:
          ticket.eventImage ||
          "https://via.placeholder.com/300x200?text=Evento",
        date: new Date(ticket.eventDate).toLocaleDateString("pt-BR"),
        time: ticket.eventTime || "",
        location: ticket.eventLocation || "Local não especificado",
        address: ticket.eventAddress || "",
        description: (ticket.eventDescription || "").slice(0, 60),
        category: ticket.eventCategory || "Evento",
        tickets: [],
        minPrice: ticket.price,
        maxPrice: ticket.price,
        totalAvailable: 0,
      });
    }

    const event = eventsMap.get(eventKey);
    event.tickets.push({
      type: ticket.ticketType,
      price: ticket.price,
      available: ticket.quantityAvailable,
    });
    event.minPrice = Math.min(event.minPrice, ticket.price);
    event.maxPrice = Math.max(event.maxPrice, ticket.price);
    event.totalAvailable += ticket.quantityAvailable;
  });

  const events = Array.from(eventsMap.values());

  return (
    <section className="m-32">
      <div>
        <h1 className="text-2xl font-semibold">
          Encontre o sue próximo <span>Evento</span>
        </h1>
        <p className="text-md opacity-90 text-zinc-500">
          Descubra os melhores eventos, festas e experiências em Angola
        </p>
        <SearchBar />

        <div>
          <h2 className="text-xl font-normal mt-20 mb-6">Categorias</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.title)}
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 text-center cursor-pointer"
                >
                  <div className="flex justify-center mb-2">
                    <IconComponent size={32} className="text-amber-600" />
                  </div>
                  <h3 className="text-md font-medium text-zinc-700 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {category.description}...
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-28">
          <div className=" bg-amber-600 mb-8 px-6 py-4 text-white rounded-lg flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <PartyPopper size={32} className="inline-block mr-2" />
              <div>
                <h1 className="text-xl font-semibold">Eventos - Proximos</h1>
                <span className="text-sm text-zinc-200">
                  Sente a vibe dos próximos eventos
                </span>
              </div>
            </div>
            <button className="bg-white text-amber-600 px-4 py-2 rounded-md font-normal text-sm hover:bg-gray-100 transition-colors">
              Ver Todos
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
        <CallAction />

        <div className="mt-22">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-xl font-semibold">
                Eventos Mais Vendidos do Dia
              </h1>
              <span className="text-sm text-zinc-400">
                Os eventos mais populares hoje
              </span>
            </div>
            <button className="bg-white text-amber-600 px-4 py-2 rounded-md font-normal text-sm hover:bg-gray-100 cursor-pointer transition-colors">
              Ver Todos
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

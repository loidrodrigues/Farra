import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { getAvailableTickets } from "../services/api";
import { PartyPopper, Presentation, Cake, Mic, Briefcase } from "lucide-react";
import CallAction from "../components/callAction";

export default function Home() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showText, setShowText] = useState(true);

  const texts = [
    {
      title: "Os melhores eventos de tecnologia e negócio",
      subtitle: "Você está pronto para viver uma experiência incrível?",
    },
    {
      title: "Descubra oportunidades únicas",
      subtitle: "Conecte-se com líderes e inovadores",
    },
    {
      title: "Networking de alto nível",
      subtitle: "Amplie sua rede profissional",
    },
    {
      title: "Inovação e criatividade",
      subtitle: "Seja parte do futuro da tecnologia",
    },
  ];

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/events?category=${encodeURIComponent(categoryTitle)}`);
  };

  const categories = [
    {
      id: 1,
      title: "Conferências de Tecnologia",
      icon: Presentation,
      description: "Tendências e inovações tech",
    },
    {
      id: 2,
      title: "Workshops de Negócios",
      icon: Briefcase,
      description: "Estratégias e empreendedorismo",
    },
    {
      id: 3,
      title: "Eventos de Startups",
      icon: PartyPopper,
      description: "Pitchs e networking para startups",
    },
    {
      id: 4,
      title: "Summits de Inovação",
      icon: Mic,
      description: "Ideias disruptivas e futuro",
    },
    {
      id: 5,
      title: "Networking Empresarial",
      icon: Briefcase,
      description: "Conexões e oportunidades de negócio",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setShowText(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [texts.length]);

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
          Encontre o seu próximo <span>Evento</span>
        </h1>
        <p className="text-md opacity-90 text-zinc-500">
          Descubra os melhores eventos de tecnologia e negócio em Angola
        </p>
        <div className="relative mt-12 h-64 rounded-lg overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-zinc-900">
            <img
              src="https://evessio.s3.amazonaws.com/customer/b4289942-d924-4d3d-9044-2b4131d4ae91/event/c80bc84d-48e8-4e21-ad98-e1f07cd04705/media/eb29de31-node_24174241-node_emap_Techfest_Day_Conference_Nov_23-187_Large_Large.jpeg"
              alt=""
              className="w-full h-full object-cover"
            />
            {/* camada para escurecer só a imagem */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-800/75 to-zinc-900/75"></div>
          </div>

          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center p-6 rounded-lg">
              <h1
                className={`text-3xl font-bold mb-2 text-white transition-opacity duration-500 ${
                  showText ? "opacity-100" : "opacity-0"
                }`}
              >
                {texts[currentTextIndex].title}
              </h1>
              <p
                className={`text-md text-white transition-opacity duration-500 ${
                  showText ? "opacity-100" : "opacity-0"
                }`}
              >
                {texts[currentTextIndex].subtitle}
              </p>
            </div>
          </div>
        </div>

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
                  Chegou a hora de fazer networking
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
            {events.slice(0, 10).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

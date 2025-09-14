import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import { fakeEvents } from "../data/fakeEvents";
import { PartyPopper, Presentation, Cake, Mic, Briefcase } from "lucide-react";
import CallAction from "../components/callAction";

export default function Home() {
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
                  className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 text-center cursor-pointer"
                >
                  <div className="flex justify-center mb-2">
                    <IconComponent size={32} className="text-amber-600" />
                  </div>
                  <h3 className="text-md font-medium text-zinc-700 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {category.description}
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
            {fakeEvents.map((event) => (
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
            {fakeEvents.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

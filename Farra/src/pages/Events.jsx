import SearchBar from "../components/SearchBar";
import EventCard from "../components/EventCard";
import { fakeEvents } from "../data/fakeEvents";
import { ChevronDown } from "lucide-react";
import {
  PartyPopper,
  Presentation,
  Cake,
  Mic,
  Briefcase,
  HelpCircle,
} from "lucide-react";

export default function Events() {
  return (
    <section className="m-32">
      <div>
        <h1 className="text-2xl font-semibold">
          Encontre os melhores enventos de Angola
        </h1>
        <div className="flex items-center mt-2">
          <p className="text-md opacity-90 text-zinc-500">Entretenimento</p>
          <ChevronDown
            size={24}
            className="inline-block ml-1 text-amber-600 cursor-pointer"
          />
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fakeEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <h1 className="text-sm font-thin">Não encontrou o que procurava?</h1>

          <button className=" bg-zinc-900 mt-4 border rounded-md px-4 py-2  text-sm opacity-90 text-white">
            Explore Todos os Eventos
          </button>
        </div>
      </div>
    </section>
  );
}

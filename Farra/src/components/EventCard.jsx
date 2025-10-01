import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/ticket/${event.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{event.description}...</p>
          <div className="text-sm text-gray-500">
            <p className=" text-amber-600 inline-block text-sm py-1 font-bold italic mb-2">
              {event.date}
            </p>
            <p>
              <strong>Local:</strong> {event.location}
            </p>
            {event.tickets && event.tickets.length > 0 && (
              <p className="mt-4">
                {event.tickets.map((ticket, index) => (
                  <span
                    key={index}
                    className="bg-amber-600 text-white  px-4 py-1 rounded-md mr-1"
                  >
                    {ticket.type}
                    {index < event.tickets.length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

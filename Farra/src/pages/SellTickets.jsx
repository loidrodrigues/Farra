import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { sellTicket } from "../services/api";
import { Loader } from "lucide-react";
import {
  Plus,
  Trash2,
  Ticket,
  Calendar,
  MapPin,
  DollarSign,
} from "lucide-react";

export default function SellTickets() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: null,
    tickets: [
      {
        type: "Inteira",
        price: "",
        quantity: "",
        description: "Ingresso padrão",
      },
    ],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateStep1 = () => {
    const newErrors = {};
    if (!eventData.title.trim()) newErrors.title = "Título é obrigatório.";
    if (!eventData.category) newErrors.category = "Categoria é obrigatória.";
    if (!eventData.description.trim())
      newErrors.description = "Descrição é obrigatória.";
    if (!eventData.date) newErrors.date = "Data é obrigatória.";
    else if (new Date(eventData.date) < new Date().setHours(0, 0, 0, 0))
      newErrors.date = "Data deve ser futura.";
    if (!eventData.time) newErrors.time = "Hora é obrigatória.";
    if (!eventData.location.trim())
      newErrors.location = "Localização é obrigatória.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    eventData.tickets.forEach((ticket, index) => {
      if (!ticket.type.trim())
        newErrors["ticket_type_" + index] = "Tipo é obrigatório.";
      if (ticket.price === "" || Number(ticket.price) <= 0)
        newErrors["ticket_price_" + index] = "Preço deve ser maior que 0.";
      if (ticket.quantity === "" || Number(ticket.quantity) < 1)
        newErrors["ticket_quantity_" + index] =
          "Quantidade deve ser pelo menos 1.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const addTicketType = () => {
    setEventData({
      ...eventData,
      tickets: [
        ...eventData.tickets,
        {
          type: "",
          price: "",
          quantity: "",
          description: "",
        },
      ],
    });
  };

  const removeTicketType = (index) => {
    const newTickets = eventData.tickets.filter((_, i) => i !== index);
    setEventData({ ...eventData, tickets: newTickets });
  };

  const updateTicketType = (index, field, value) => {
    const newTickets = eventData.tickets.map((ticket, i) =>
      i === index ? { ...ticket, [field]: value } : ticket
    );
    setEventData({ ...eventData, tickets: newTickets });
    setErrors((prev) => ({
      ...prev,
      ["ticket_" + field + "_" + index]: undefined,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEventData({ ...eventData, image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setSubmitError("Você precisa estar logado para vender ingressos.");
      return;
    }
    setLoading(true);
    setSubmitError("");

    try {
      const eventDate = new Date(`${eventData.date}T${eventData.time}`);

      for (const ticket of eventData.tickets) {
        await sellTicket({
          eventTitle: eventData.title,
          eventDate,
          eventTime: eventData.time,
          eventLocation: eventData.location,
          eventAddress: eventData.location, // Usando location como address por enquanto
          eventDescription: eventData.description,
          eventImage: eventData.image || "",
          eventCategory: eventData.category,
          ticketType: ticket.type,
          price: parseFloat(ticket.price),
          quantityAvailable: parseInt(ticket.quantity),
        });
      }

      alert("Ingressos criados com sucesso!");
      navigate("/"); // ou outra página
    } catch (error) {
      console.error("Erro ao criar ingressos:", error);
      setSubmitError(error.message || "Erro ao criar ingressos.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Festas Noturnas",
    "Palestras & Workshops",
    "Aniversários & Celebrações",
    "Shows & Concertos",
    "Eventos Corporativos",
    "Esportivos",
    "Culturais",
    "Gastronômicos",
  ];

  return (
    <section className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 mt-30">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
            <Ticket className="inline-block mr-3 text-amber-600" size={32} />
            Vender Ingressos
          </h1>
          <p className="text-gray-600">
            Crie seu evento e comece a vender ingressos agora mesmo
          </p>
        </div>

        {/* Progresso */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div
              className={`flex items-center ${
                currentStep >= 1 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-amber-600 text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Informações</span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>

            <div
              className={`flex items-center ${
                currentStep >= 2 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-amber-600 text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Ingressos</span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>

            <div
              className={`flex items-center ${
                currentStep >= 3 ? "text-amber-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-amber-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="ml-2 font-medium">Revisão</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          {/* Passo 1: Informações do Evento */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informações do Evento
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título do Evento *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={eventData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ex: Festival de Verão 2023"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria *
                  </label>
                  <select
                    name="category"
                    required
                    value={eventData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Evento *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={eventData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Descreva seu evento de forma atraente..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline-block mr-2" size={16} />
                    Data do Evento *
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={eventData.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.date ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora do Evento *
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={eventData.time}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.time ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline-block mr-2" size={16} />
                  Localização *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={eventData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Ex: Centro de Convenções de Luanda"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem do Evento
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-amber-600 hover:text-amber-700"
                  >
                    {eventData.image ? (
                      <img
                        src={eventData.image}
                        alt="Preview"
                        className="mx-auto h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div>
                        <div className="text-4xl mb-2">📸</div>
                        <p>Clique para adicionar uma imagem</p>
                        <p className="text-sm text-gray-500">
                          Recomendado: 1200x600px
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Próximo → Ingressos
                </button>
              </div>
            </div>
          )}

          {/* Passo 2: Configuração de Ingressos */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Configurar Ingressos
              </h2>

              {eventData.tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">
                      Tipo de Ingresso #{index + 1}
                    </h3>
                    {eventData.tickets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTicketType(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo *
                      </label>
                      <input
                        type="text"
                        value={ticket.type}
                        onChange={(e) =>
                          updateTicketType(index, "type", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg ${
                          errors["ticket_type_" + index]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Ex: VIP, Inteira, Meia"
                        required
                      />
                      {errors["ticket_type_" + index] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["ticket_type_" + index]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="inline-block mr-1" size={14} />
                        Preço (AOA) *
                      </label>
                      <input
                        type="number"
                        value={ticket.price}
                        onChange={(e) =>
                          updateTicketType(index, "price", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg ${
                          errors["ticket_price_" + index]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                      {errors["ticket_price_" + index] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["ticket_price_" + index]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantidade *
                      </label>
                      <input
                        type="number"
                        value={ticket.quantity}
                        onChange={(e) =>
                          updateTicketType(index, "quantity", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg ${
                          errors["ticket_quantity_" + index]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="100"
                        min="1"
                        required
                      />
                      {errors["ticket_quantity_" + index] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["ticket_quantity_" + index]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <input
                      type="text"
                      value={ticket.description}
                      onChange={(e) =>
                        updateTicketType(index, "description", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="O que inclui este ingresso?"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addTicketType}
                className="flex items-center text-amber-600 hover:text-amber-700"
              >
                <Plus size={20} className="mr-2" />
                Adicionar outro tipo de ingresso
              </button>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-700"
                >
                  ← Voltar
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
                >
                  Revisar Evento →
                </button>
              </div>
            </div>
          )}

          {/* Passo 3: Revisão e Publicação */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Revisão do Evento
              </h2>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Informações do Evento</h3>
                <div className="space-y-2">
                  <p>
                    <strong>Nome:</strong> {eventData.title}
                  </p>
                  <p>
                    <strong>Categoria:</strong> {eventData.category}
                  </p>
                  <p>
                    <strong>Data:</strong> {eventData.date} às {eventData.time}
                  </p>
                  <p>
                    <strong>Local:</strong> {eventData.location}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {eventData.description}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Ingressos</h3>
                {eventData.tickets.map((ticket, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <p>
                      <strong>{ticket.type}:</strong> {ticket.price} AOA (
                      {ticket.quantity} unidades)
                    </p>
                    {ticket.description && (
                      <p className="text-sm text-gray-600">
                        {ticket.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800">{submitError}</p>
                </div>
              )}

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-700"
                  disabled={loading}
                >
                  ← Voltar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="mr-2 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    <>🎉 Publicar Evento</>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

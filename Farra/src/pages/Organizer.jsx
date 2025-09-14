import React from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  Users,
  BarChart3,
  CreditCard,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Calendar,
  MapPin,
  DollarSign,
} from "lucide-react";

export default function Organizer() {
  const features = [
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Ferramentas de Venda",
      description: "Sistema completo para vender ingressos online",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Dashboard em Tempo Real",
      description: "Acompanhe suas vendas e métricas",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Pagamento Seguro",
      description: "Múltiplas formas de pagamento",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Público Garantido",
      description: "Acesso a milhares de usuários",
    },
  ];

  const steps = [
    {
      title: "Crie sua conta",
      description: "Cadastre-se como organizador em minutos",
    },
    {
      title: "Configure seu evento",
      description: "Adicione informações, datas e ingressos",
    },
    {
      title: "Comece a vender",
      description: "Divulgue e venda ingressos",
    },
    {
      title: "Gerencie tudo",
      description: "Controle vendas e check-in",
    },
  ];

  const testimonials = [
    {
      name: "Carlos Santos",
      event: "Festival de Música",
      text: "A Farra revolucionou como organizo meus eventos. As vendas aumentaram 40%!",
      rating: 5,
    },
    {
      name: "Maria Fernandes",
      event: "Workshop de Gastronomia",
      text: "Ferramentas intuitivas e suporte excelente. Recomendo para todos os organizadores!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-4">
              <Ticket className="w-10 h-10" />
            </div>
            <h1 className="text-xl md:text2xl font-bold mb-3">
              Transforme seu evento em um sucesso
            </h1>
            <p className="text-md mb-6 opacity-90 mx-[200px]">
              Ferramentas profissionais para organizadores venderem mais
              ingressos e surpreenderem seu público
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-white text-amber-600 px-4 py-3 rounded-md font-normal text-sm hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Começar agora <ArrowRight size={20} className="ml-2" />
              </Link>
              <button className="flex items-center text-white hover:text-amber-200 text-sm transition-colors">
                <Play className="w-5 h-5 mr-2" />
                Ver vídeo demonstrativo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-600">Organizadores</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">
                2.5k+
              </div>
              <div className="text-gray-600">Eventos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">
                100k+
              </div>
              <div className="text-gray-600">Ingressos Vendidos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas para simplificar a organização do seu evento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-amber-600 mb-4 ">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Em poucos passos, seu evento está pronto para vender ingressos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-semibold">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              O que os organizadores dizem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-gray-300 text-sm mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de organizadores que já transformaram seus
            eventos com a Farra
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-amber-600  text-white px-4 py-3 rounded-lg font-normalrounded-md hover:bg-amber-700 transition-colors"
            >
              Criar conta
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-4 py-3 rounded-lg font-normal hover:bg-white hover:text-gray-900 transition-colors"
            >
              Entrar na minha conta
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

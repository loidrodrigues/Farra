import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CreditCard,
  User,
  Ticket,
  HelpCircle,
} from "lucide-react";

export default function Help() {
  const [activeCategory, setActiveCategory] = useState("geral");
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData = {
    geral: [
      {
        id: "geral-1",
        pergunta: "Como comprar ingressos?",
        resposta:
          "Para comprar ingressos, navegue até a página do evento desejado, selecione a quantidade de ingressos e clique em 'Comprar'. Siga o processo de checkout para finalizar sua compra.",
      },
      {
        id: "geral-2",
        pergunta: "Como recebo meus ingressos?",
        resposta:
          "Os ingressos são enviados por email imediatamente após a confirmação do pagamento. Você também pode acessá-los na sua conta Farra na seção 'Meus Ingressos'.",
      },
      {
        id: "geral-3",
        pergunta: "Posso transferir meu ingresso?",
        resposta:
          "Sim, você pode transferir ingressos através da sua conta. Acesse 'Meus Ingressos', selecione o ingresso e clique em 'Transferir'.",
      },
    ],
    organizadores: [
      {
        id: "org-1",
        pergunta: "Como me torno um organizador?",
        resposta:
          "Clique em 'Para Organizadores' no menu e depois em 'Criar conta de organizador'. Preencha suas informações e documentação necessária.",
      },
      {
        id: "org-2",
        pergunta: "Quais são as taxas?",
        resposta:
          "Cobramos uma taxa de 5% sobre cada ingresso vendido. Não há custos de setup ou mensalidades.",
      },
      {
        id: "org-3",
        pergunta: "Como recebo o dinheiro das vendas?",
        resposta:
          "Os pagamentos são processados semanalmente. Você recebe o valor líquido diretamente na sua conta bancária.",
      },
    ],
    pagamentos: [
      {
        id: "pag-1",
        pergunta: "Quais formas de pagamento são aceitas?",
        resposta:
          "Aceitamos Multicaixa, cartões de crédito/débito internacionais, e transferências bancárias.",
      },
      {
        id: "pag-2",
        pergunta: "É seguro pagar na Farra?",
        resposta:
          "Sim, utilizamos criptografia SSL e seguimos os mais altos padrões de segurança de pagamento.",
      },
    ],
    ingressos: [
      {
        id: "ing-1",
        pergunta: "Como usar meus ingressos?",
        resposta:
          "Apresente o código QR do ingresso na entrada do evento. Certifique-se de que o código está legível.",
      },
      {
        id: "ing-2",
        pergunta: "Posso reimprimir meu ingresso?",
        resposta:
          "Sim, acesse sua conta na seção 'Meus Ingressos' e clique em 'Reimprimir' para gerar uma nova cópia.",
      },
    ],
  };

  const filteredFAQs = Object.entries(faqData).reduce(
    (acc, [category, items]) => {
      if (searchTerm) {
        const filtered = items.filter(
          (item) =>
            item.pergunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.resposta.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
      } else {
        acc[category] = items;
      }
      return acc;
    },
    {}
  );

  const categories = [
    { id: "geral", name: "Geral", icon: <HelpCircle className="w-5 h-5" /> },
    {
      id: "organizadores",
      name: "Organizadores",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "pagamentos",
      name: "Pagamentos",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "ingressos",
      name: "Ingressos",
      icon: <Ticket className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Farra<span className="text-amber-600">.</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/events"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                Eventos
              </Link>
              <Link
                to="/organizadores"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                Para Organizadores
              </Link>
              <Link to="/ajuda" className="text-amber-600 font-semibold">
                Ajuda
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-amber-600 transition-colors"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
              >
                Criar Conta
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-gray-900 mb-4">
              Centro de Ajuda
            </h1>
            <p className="text-lg text-gray-600">
              Encontre respostas para suas dúvidas sobre a Farra
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar perguntas frequentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category.id
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-4">
            {filteredFAQs[activeCategory]?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">
                    {item.pergunta}
                  </span>
                  {openItems[item.id] ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openItems[item.id] && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{item.resposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12  rounded-lg p-8 ">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Não encontrou o que procurava?
            </h2>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco para obter ajuda personalizada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 ">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-5 h-5" />
                <span>suporte@farra.ao</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5" />
                <span>+244 923 456 789</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MessageCircle className="w-5 h-5" />
                <span>Chat ao vivo</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

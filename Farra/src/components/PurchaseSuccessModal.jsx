import React from "react";
import { CheckCircle, X, Ticket, Mail, QrCode } from "lucide-react";

const PurchaseSuccessModal = ({ isOpen, onClose, eventTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4  transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 rounded-t-2xl p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-amber-100 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex items-center justify-center mb-4">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <CheckCircle size={48} className="text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">
            Compra Realizada!
          </h2>
          <p className="text-amber-100 text-center">
            Seu ingresso foi adquirido com sucesso
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {eventTitle}
            </h3>
            <p className="text-gray-600 text-sm">
              Parabéns! Você agora tem seu ingresso para este evento incrível.
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
                <Mail className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Email Enviado</h4>
                <p className="text-sm text-gray-600">
                  Seu ingresso foi enviado para seu email com todas as
                  informações necessárias.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
                <QrCode className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">QR Code de Acesso</h4>
                <p className="text-sm text-gray-600">
                  No dia do evento, apresente o QR code no seu celular ou
                  imprima o email para entrada.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
                <Ticket className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Ingresso Digital</h4>
                <p className="text-sm text-gray-600">
                  Seu ingresso digital é único e intransferível. Guarde-o em
                  local seguro.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center"
            >
              <CheckCircle size={20} className="mr-2" />
              Entendi
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              Ver Meus Ingressos
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800 text-center">
              💡 <strong>Dica:</strong> Cheque sua caixa de spam se não
              encontrar o email em alguns minutos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessModal;

# TODO: Add Validation to SellTickets.jsx

- [ ] Add errors state to store validation messages
- [ ] Create validateStep1() function for event information validation
- [ ] Create validateStep2() function for ticket configuration validation
- [ ] Update "Próximo → Ingressos" button to validate step 1 before proceeding
- [ ] Update "Revisar Evento →" button to validate step 2 before proceeding
- [ ] Update handleSubmit to validate all steps before submitting
- [ ] Add error message display below invalid fields
- [ ] Test validation with invalid inputs

# TODO: Criar Página de Detalhes do Ingresso

- [x] Criar Farra/src/pages/TicketDetails.jsx com layout de detalhes do evento à esquerda (imagem, nome, data, localização) e seletor de quantidade + botão de compra à direita
- [x] Atualizar Farra/src/routes/AppRoutes.jsx para adicionar rota /ticket/:id
- [x] Atualizar Farra/src/components/EventCard.jsx para adicionar Link para /ticket/${event.id}
- [ ] Testar navegação da página de Eventos para detalhes do ingresso
- [ ] Verificar layout responsivo com Tailwind

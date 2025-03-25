describe('Página de Desaparecidos', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/desaparecido'); // Ajuste a rota conforme necessário
  });

  it('Deve carregar a lista de desaparecidos', () => {
    cy.contains('Dados Para Consulta') // Ajuste a classe conforme sua implementação
      .should('exist')
      .and('be.visible');
  });

  it('Deve fazer uma busca por joão e mostrar pagina de detalhes', () => {
    cy.get('#default-search').type('joao');

    cy.get('#btn-pesquisar').click();
    cy.wait(1500);

    cy.get(':nth-child(1) > .bg-gray-200 > .mt-2 > .text-white').click();
    cy.wait(1500);

    cy.contains('Local de Desaparecimento');
    cy.contains('COMPARTILHAR');
  });
});

describe('Navigation Flow', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/', { timeout: 30000 });
        cy.contains('CasinoRoyal', { timeout: 30000 }).should('be.visible');
    });

    it('should navigate to game page', () => {
        cy.get('a').contains('Jouer').click();
        cy.url().should('include', '/game');
    });
});

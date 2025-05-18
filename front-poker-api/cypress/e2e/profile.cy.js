describe('Profile Flow', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/', { timeout: 30000 });
        cy.contains('CasinoRoyal', { timeout: 30000 }).should('be.visible');
    });

    it('should navigate to profile page after login', () => {
        cy.get('a').contains('Se connecter').click();
        cy.url().should('include', '/connexion');

        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');

        cy.intercept('POST', '**/api/auth/signin', {
            statusCode: 200,
            body: { access_token: 'mock-token' },
        }).as('signinRequest');

        cy.get('button').contains('Se connecter').click();
        cy.wait('@signinRequest', { timeout: 10000 });

        cy.url().should('include', '/');
        cy.get('.container_form_wrapper', { timeout: 15000 }).should('not.exist');
        cy.contains('Profil', { timeout: 10000 }).should('be.visible');

        cy.get('a').contains('Profil').click();
        cy.url().should('include', '/profil'); // Changé de /profile à /profil
    });
});
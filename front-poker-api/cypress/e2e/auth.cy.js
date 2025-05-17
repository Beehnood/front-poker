describe('Authentication Flow', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/', { timeout: 30000 });
        // Log du DOM pour débogage
        cy.get('body').then(($body) => {
            cy.log('Contenu du body:', $body.html());
        });
        cy.get('body').should('not.be.empty', { timeout: 30000 });
        cy.contains('CasinoRoyal', { timeout: 30000 }).should('be.visible');
    });

    it('should register a user and logout successfully', () => {
        // Navigue vers la page d'inscription
        cy.get('a').contains('S\'inscrire').click();
        cy.url().should('include', '/inscription');

        // Remplit le formulaire
        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');

        // Mock de la réponse API
        cy.intercept('POST', 'http://localhost:3000/api/auth/signUp', {
            statusCode: 200,
            body: { access_token: 'mock-token', message: 'Inscription réussie !' },
        }).as('signUpRequest');

        cy.get('button').contains('S\'inscrire').click();

        // Vérifie le message de succès
        cy.contains('Inscription réussie ! Token stocké.', { timeout: 10000 }).should('be.visible');

        // Vérifie que le token est stocké
        cy.window().its('localStorage.access_token').should('eq', 'mock-token');

        // Déconnexion
        cy.get('button').contains('Se déconnecter').click();
        cy.url().should('include', '/connexion');
        cy.contains('Connexion').should('be.visible');

        // Vérifie que le token est supprimé
        cy.window().its('localStorage.access_token').should('be.undefined');
    });
});
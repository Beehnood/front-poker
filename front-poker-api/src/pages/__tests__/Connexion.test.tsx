import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Connexion from '../Connexion'; // Ajuste le chemin si nécessaire
import { vi } from 'vitest';
import type { Mock } from 'vitest';

global.fetch = vi.fn();

describe('Connexion Component', () => {
    beforeEach(() => {
        (fetch as Mock).mockClear();
        localStorage.clear();
    });

    it('renders the connexion form correctly', () => {
        render(<Connexion />);

        expect(screen.getByText('Connexion')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
        expect(screen.getByText('Se connecter')).toBeInTheDocument();
    });

    it('submits the form successfully and stores the token', async () => {
        (fetch as Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: 'mock-token' }),
        });

        render(<Connexion />);

        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Mot de passe'), {
            target: { value: 'password123' },
        });

        fireEvent.click(screen.getByText('Se connecter'));

        await waitFor(() => {
            expect(screen.getByText('Connexion réussie !')).toBeInTheDocument();
            expect(localStorage.getItem('access_token')).toBe('mock-token');
        });

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3000/api/auth/signIn',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
            })
        );
    });
});
import { vi } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Inscription from '../Inscription';

it('submits the form successfully and stores the token', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ access_token: 'mock-token', message: 'Inscription réussie !' }),
    } as Response);

    render(<Inscription />);

    fireEvent.change(screen.getByLabelText('Email'), {
        target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Mot de passe'), {
        target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
        target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText("S'inscrire"));

    await waitFor(() => {
        expect(screen.getByText('Inscription réussie ! Token stocké.')).toBeInTheDocument();
        expect(localStorage.getItem('access_token')).toBe('mock-token');
    });

    expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/auth/signUp',
        expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: 'test@example.com', // Ajoute username ici
                email: 'test@example.com', 
                password: 'password123' 
            }),
        })
    );
});
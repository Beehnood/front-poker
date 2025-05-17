import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MenuBureau from '../../MenuBureau';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Connexion from '../Connexion'; // Ajuste le chemin

describe('MenuBureau Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders the menu items correctly when not logged in', () => {
        render(
            <MemoryRouter>
                <MenuBureau />
            </MemoryRouter>
        );

        expect(screen.getByText('S\'inscrire')).toBeInTheDocument();
        expect(screen.getByText('Se connecter')).toBeInTheDocument();
        expect(screen.queryByText('Se déconnecter')).not.toBeInTheDocument();
    });

    it('displays logout when logged in and redirects to connexion on logout', async () => {
        localStorage.setItem('access_token', 'mock-token');

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<MenuBureau />} />
                    <Route path="/connexion" element={<Connexion />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Se déconnecter')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Se déconnecter'));

        await waitFor(() => {
            expect(localStorage.getItem('access_token')).toBeNull();
            expect(screen.getByText('Connexion')).toBeInTheDocument();
        });
    });
});
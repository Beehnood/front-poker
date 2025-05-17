import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Logout from '../Logout';
import { vi } from 'vitest';

describe('Logout Component', () => {
    const mockOnLogout = vi.fn();

    beforeEach(() => {
        localStorage.clear();
        mockOnLogout.mockClear();
    });

    it('renders the logout button when token exists', () => {
        localStorage.setItem('access_token', 'mock-token');
        render(<Logout onLogout={mockOnLogout} />);

        expect(screen.getByText('Se déconnecter')).toBeInTheDocument();
    });

    it('removes token and calls onLogout when logout button is clicked', async () => {
        localStorage.setItem('access_token', 'mock-token');
        render(<Logout onLogout={mockOnLogout} />);

        fireEvent.click(screen.getByText('Se déconnecter'));

        await waitFor(() => {
            expect(localStorage.getItem('access_token')).toBeNull();
            expect(mockOnLogout).toHaveBeenCalled();
            const successMessage = screen.queryByText('Déconnecté avec succès.');
            if (!successMessage) throw new Error('Message de succès non trouvé dans le DOM');
            expect(successMessage).toBeInTheDocument();
        }, { timeout: 2000 });
    });
});
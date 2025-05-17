import { render, screen, fireEvent } from '@testing-library/react';
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

    it('removes token and calls onLogout when logout button is clicked', () => {
        localStorage.setItem('access_token', 'mock-token');
        render(<Logout onLogout={mockOnLogout} />);

        fireEvent.click(screen.getByText('Se déconnecter'));

        expect(localStorage.getItem('access_token')).toBeNull();
        expect(mockOnLogout).toHaveBeenCalled();
        expect(screen.getByText('Déconnecté avec succès.')).toBeInTheDocument();
    });
});
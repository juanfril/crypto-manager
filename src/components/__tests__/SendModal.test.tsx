import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SendModal } from '../SendModal';
import { useBlockchainBalances } from '../../hooks/xchain/useBlockchainBalances';

jest.mock('../../hooks/xchain/useBlockchainBalances');

describe('SendModal component', () => {
  const isOpen = true;
  const onRequestClose = jest.fn();
  const handleSendFunds = jest.fn().mockResolvedValue('tx123');

  beforeEach(() => {
    (useBlockchainBalances as jest.Mock).mockReturnValue({ handleSendFunds });
  });

  test('renders the SendModal component with correct data', () => {
    render(<SendModal isOpen={isOpen} onRequestClose={onRequestClose} />);

    expect(
      screen.getByText('Send funds', { selector: 'h3' }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Recipient')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  test('submits the form and shows transaction hash', async () => {
    render(<SendModal isOpen={isOpen} onRequestClose={onRequestClose} />);

    fireEvent.change(screen.getByPlaceholderText('Amount'), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByPlaceholderText('Recipient'), {
      target: { value: '0x123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(handleSendFunds).toHaveBeenCalledWith(10, '0x123');
      expect(onRequestClose).toHaveBeenCalled();
      expect(screen.getByText('Transaction Hash: tx123')).toBeInTheDocument();
    });
  });

  test('does not show the transaction hash initially', () => {
    render(<SendModal isOpen={isOpen} onRequestClose={onRequestClose} />);

    expect(screen.queryByText(/Transaction Hash:/)).not.toBeInTheDocument();
  });
});

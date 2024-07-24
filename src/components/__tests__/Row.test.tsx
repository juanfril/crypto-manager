import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Row } from '../Row';

// Mock the ReceiveModal and SendModal components
jest.mock('../ReceiveModal', () => ({
  __esModule: true,
  ReceiveModal: ({
    isOpen,
    onRequestClose,
    address,
  }: {
    isOpen: boolean;
    onRequestClose: () => void;
    address: string;
  }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="receive-modal">
        <span>Receive Modal</span>
        <span>{address}</span>
        <button onClick={onRequestClose}>Close</button>
      </div>
    );
  },
}));

jest.mock('../SendModal', () => ({
  __esModule: true,
  SendModal: ({
    isOpen,
    onRequestClose,
  }: {
    isOpen: boolean;
    onRequestClose: () => void;
  }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="send-modal">
        <span>Send Modal</span>
        <button onClick={onRequestClose}>Close</button>
      </div>
    );
  },
}));

describe('Row component', () => {
  const balance = 1000;
  const blockChain = 'AVAX';
  const address = '0x123456789abcdef';
  const ticker = 'USDC';

  test('renders the Row component with correct data', () => {
    render(
      <Row
        balance={balance}
        blockChain={blockChain}
        address={address}
        ticker={ticker}
      />,
    );

    const row = screen.getByText(balance.toString()).closest('tr');
    expect(row).toBeInTheDocument();

    if (row) {
      const utils = within(row);
      expect(utils.getByText(blockChain)).toBeInTheDocument();
      expect(utils.getByText(ticker)).toBeInTheDocument();
      expect(utils.getByText(balance.toString())).toBeInTheDocument();
      expect(utils.getByText('Send')).toBeInTheDocument();
      expect(utils.getByText('Receive')).toBeInTheDocument();
    }
  });

  test('opens and closes the Receive Modal', () => {
    render(
      <Row
        balance={balance}
        blockChain={blockChain}
        address={address}
        ticker={ticker}
      />,
    );

    const row = screen.getByText(balance.toString()).closest('tr');
    if (row) {
      const utils = within(row);
      fireEvent.click(utils.getByText('Receive'));
      expect(screen.getByTestId('receive-modal')).toBeInTheDocument();
      expect(screen.getByText(address)).toBeInTheDocument();

      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByTestId('receive-modal')).not.toBeInTheDocument();
    }
  });

  test('opens and closes the Send Modal', () => {
    render(
      <Row
        balance={balance}
        blockChain={blockChain}
        address={address}
        ticker={ticker}
      />,
    );

    const row = screen.getByText(balance.toString()).closest('tr');
    if (row) {
      const utils = within(row);
      fireEvent.click(utils.getByText('Send'));
      expect(screen.getByTestId('send-modal')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByTestId('send-modal')).not.toBeInTheDocument();
    }
  });
});

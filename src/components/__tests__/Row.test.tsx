import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
  const ticker = 'AVAX';

  beforeAll(() => {
    // Create a div element with id 'root'
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  });

  afterAll(() => {
    // Clean up the div element with id 'root'
    const root = document.getElementById('root');
    if (root) {
      document.body.removeChild(root);
    }
  });

  test('renders the Row component with correct data', () => {
    render(<Row balance={balance} blockChain={blockChain} address={address} ticker={ticker} />);
    
    expect(screen.getByText(blockChain)).toBeInTheDocument();
    expect(screen.getByText(ticker)).toBeInTheDocument();
    expect(screen.getByText(balance.toString())).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
    expect(screen.getByText('Receive')).toBeInTheDocument();
  });

  test('opens and closes the Receive Modal', () => {
    render(<Row balance={balance} blockChain={blockChain} address={address} ticker={ticker} />);
    
    fireEvent.click(screen.getByText('Receive'));
    expect(screen.getByTestId('receive-modal')).toBeInTheDocument();
    expect(screen.getByText(address)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('receive-modal')).not.toBeInTheDocument();
  });

  test('opens and closes the Send Modal', () => {
    render(<Row balance={balance} blockChain={blockChain} address={address} ticker={ticker} />);
    
    fireEvent.click(screen.getByText('Send'));
    expect(screen.getByTestId('send-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('send-modal')).not.toBeInTheDocument();
  });
});

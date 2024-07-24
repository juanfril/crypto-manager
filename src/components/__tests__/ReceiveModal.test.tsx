import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ReceiveModal } from '../ReceiveModal';

describe('ReceiveModal component', () => {
  const isOpen = true;
  const onRequestClose = jest.fn();
  const address = '0x123456789abcdef';

  beforeAll(() => {
    // Mock the clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
  });

  test('renders the ReceiveModal component with correct data', () => {
    render(
      <ReceiveModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        address={address}
      />,
    );

    expect(
      screen.getByText('Copy Address', { selector: 'h3' }),
    ).toBeInTheDocument();
    expect(screen.getByText(address)).toBeInTheDocument();
  });

  test('copies address to clipboard and shows alert', () => {
    window.alert = jest.fn(); // Mock the alert function

    render(
      <ReceiveModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        address={address}
      />,
    );

    const copyButton = screen.getByRole('button', { name: 'Copy Address' });
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(address);
    expect(window.alert).toHaveBeenCalledWith('Address copied to clipboard!');
  });

  test('closes the modal when the close button is clicked', () => {
    render(
      <ReceiveModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        address={address}
      />,
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(onRequestClose).toHaveBeenCalled();
  });
});

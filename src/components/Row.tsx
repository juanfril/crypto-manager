import { useState } from 'react';
import { ReceiveModal } from './ReceiveModal';
import { SendModal } from './SendModal';

interface RowProps {
  balance: number;
  blockChain: string;
  address: string;
  ticker: string;
}

export const Row = ({ balance, blockChain, address, ticker }: RowProps) => {
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  const openReceiveModal = (address: string) => {
    setSelectedAddress(address);
    setIsReceiveModalOpen(true);
  };

  const closeReceiveModal = () => {
    setIsReceiveModalOpen(false);
    setSelectedAddress('');
  };

  const openSendModal = () => {
    setIsSendModalOpen(true);
  };

  const closeSendModal = () => {
    setIsSendModalOpen(false);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {blockChain}
      </th>
      <td className="px-6 py-4">{ticker}</td>
      <td className="px-6 py-4">{balance.toString()}</td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => openSendModal()}
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Send
        </button>
        <SendModal isOpen={isSendModalOpen} onRequestClose={closeSendModal} />
        <button
          onClick={() => openReceiveModal(address)}
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Receive
        </button>
        <ReceiveModal
          isOpen={isReceiveModalOpen}
          onRequestClose={closeReceiveModal}
          address={selectedAddress}
        />
      </td>
    </tr>
  );
};

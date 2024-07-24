import { useBlockchainBalances } from '../hooks/xchain/useBlockchainBalances';
import { useState } from 'react';
import Modal from 'react-modal';

interface SendModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const SendModal = ({ isOpen, onRequestClose }: SendModalProps) => {
  const { handleSendFunds } = useBlockchainBalances();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTxHash(null);

    const result = await handleSendFunds(parseFloat(amount), recipient);
    if (result) {
      setTxHash(result);
      setRecipient('');
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Receive Address"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <form
        onSubmit={handleSubmit}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-gray-700 outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="dark:text-gray-400 text-3xl font-semibold">
                Send funds
              </h3>
            </div>
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="relative p-6 flex-auto"
            />
            <input
              type="text"
              placeholder="Recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="relative p-6 flex-auto"
            />
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
              >
                Send
              </button>
              {txHash && <p className="mt-4">Transaction Hash: {txHash}</p>}
            </div>
          </div>
        </div>
      </form>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </Modal>
  );
};

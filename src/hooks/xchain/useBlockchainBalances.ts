import { useBlockchainContext } from '../../contexts/BlockchainContext';
import { useState, useEffect } from 'react';
import { getBalance, sendFunds } from './xchain';

export interface BalanceInfo {
  blockchain: string;
  ticker: string;
  address: string;
  balance: number;
  isLoading: boolean;
  error: string | null;
}

export const useBlockchainBalances = () => {
  const { address, blockchain } = useBlockchainContext();

  const [balances, setBalances] = useState<BalanceInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async () => {
    setError(null);
    try {
      const result = await getBalance(address);

      if (result) {
        const updatedBalances = result.map((item) => ({
          blockchain: item.asset.chain,
          address,
          ticker: item.asset.ticker,
          balance: item.amount.amount().toNumber(),
          isLoading: false,
          error: null,
        }));
        setBalances(updatedBalances);
      }
    } catch (err) {
      setError('Failed to fetch balance');
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [address, blockchain]);

  const handleSendFunds = async (amount: number, recipient: string) => {
    setError(null);
    try {
      const txHash = await sendFunds(amount, recipient);

      await fetchBalance();
      return txHash;
    } catch (err) {
      setError('Failed to send funds');
      return null;
    }
  };

  return { balances, error, handleSendFunds };
};

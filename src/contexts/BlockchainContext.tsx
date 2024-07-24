import { createContext, useContext, useState, ReactNode } from 'react';

interface BlockchainContextProps {
  blockchain: string;
  address: string;
  setAddress: (address: string) => void;
  setBlockchain: (blockchain: string) => void;
}

const BlockchainContext = createContext<BlockchainContextProps | undefined>(
  undefined,
);

export const useBlockchainContext = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error(
      'useBlockchainContext must be used within a BlockchainProvider',
    );
  }
  return context;
};

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  const [blockchain, setBlockchain] = useState<string>('AVAX');
  const [address, setAddress] = useState(
    '0x2352D20fC81225c8ECD8f6FaA1B37F24FEd450c9',
    // 0x2352D20fC81225c8ECD8f6FaA1B37F24FEd450c9
    // 0x971bDACd04EF40141ddb6bA175d4f76665103c81
  );

  return (
    <BlockchainContext.Provider
      value={{ blockchain, address, setAddress, setBlockchain }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

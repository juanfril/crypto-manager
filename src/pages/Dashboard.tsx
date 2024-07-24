import { Row } from '../components/Row';
import { useBlockchainBalances } from '../hooks/xchain/useBlockchainBalances';

export const Dashboard = () => {
  const { balances } = useBlockchainBalances();

  return (
    <div className="flex flex-col items-center justify-center p-8 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Chain
            </th>
            <th scope="col" className="px-6 py-3">
              Ticker
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {balances.map((balance, index) => (
            <Row
              key={index}
              balance={balance.balance}
              ticker={balance.ticker}
              address={balance.address}
              blockChain={balance.blockchain}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

import {
  AssetAVAX,
  Client as AvaxClient,
  defaultAvaxParams,
} from '@xchainjs/xchain-avax';
import { Network } from '@xchainjs/xchain-client';
import { baseAmount } from '@xchainjs/xchain-util';

import { generateMnemonic } from 'bip39';

const mnemonic = generateMnemonic();

const avaxClient = new AvaxClient({
  network: Network.Testnet,
  phrase: mnemonic,
  ...defaultAvaxParams,
});

export const getBalance = async (address: string) => {
  try {
    const balances = await avaxClient.getBalance(address);
    console.log(`Balances: ${JSON.stringify(balances)}`);

    return balances;
  } catch (error) {
    console.error('Error getting balance:', error);
    return null;
  }
};

export const sendFunds = async (amount: number, recipient: string) => {
  try {
    const txHash = await avaxClient.transfer({
      asset: AssetAVAX,
      amount: baseAmount(amount, 18),
      recipient,
    });
    return txHash;
  } catch (error) {
    console.error('Error sending funds:', error);
    return null;
  }
};

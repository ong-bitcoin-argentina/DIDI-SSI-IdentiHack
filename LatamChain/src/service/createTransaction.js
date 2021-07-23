import initWeb3 from "./web3";
import factory from './campaignfactory';
import getAbi from "./abi";

export async function createTransaction (contract, data){
  
  const web3 = await initWeb3();
  
  const params = [{
    from: process.env.REACT_APP_CREATE_TRANSACTION_ADDRESS,
    to: contract,
    data: data,
    chainId: 648529,
    gas: web3.utils.numberToHex(1000000),
    value: web3.utils.numberToHex(0)
  }];

  const method = await window.ethereum.request({ method: 'eth_sendTransaction', params });
}

// setConfig
export async function setConfig (contract, recorderDID, financialDID, account) {
  const web3 = await initWeb3();
  const abi = await getAbi();
  const erc20controlContract = await factory(contract, abi);
  const financialDIDClean = financialDID.replace('did:ethr:lacchain:', '');
  const recorderDIDClean = recorderDID.replace('did:ethr:lacchain:', '');
  
  const data = erc20controlContract
      .methods["setConfig"](recorderDIDClean, financialDIDClean)
      .encodeABI();
  
  const params = [{
      from: account,
      to: contract,
      data: data,
      chainId: 648529,
      gas: web3.utils.numberToHex(1000000),
      value: web3.utils.numberToHex(0)
    }];
  const response = await window.ethereum.request({ method: 'eth_sendTransaction', params });
  return Promise.resolve(response);
}
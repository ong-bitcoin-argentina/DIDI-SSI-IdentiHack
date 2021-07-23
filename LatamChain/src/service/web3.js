import Web3 from 'web3';

let web3;
const NET_ID_LACCHAIN_TESTNET = 648529;

export default async function initWeb3(){
    if(window.web3){
      web3 = new Web3(window.web3.currentProvider);
      const netId = await web3.eth.net.getId();
      if (netId === NET_ID_LACCHAIN_TESTNET){
        // Is connect to lacchain testnet
        return web3;
      }
    }
    const provider = new Web3.providers.HttpProvider(
        "http://18.230.79.100:4545"
    );
    web3 = new Web3(provider);
    
    return web3;
}
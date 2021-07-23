import initWeb3 from "./web3";


export default async function factory(CONTRACT_ID, abi){
    const web3 = await initWeb3();
    let factory = await new web3.eth.Contract(
            abi,
            CONTRACT_ID,
        );
    return factory;
}
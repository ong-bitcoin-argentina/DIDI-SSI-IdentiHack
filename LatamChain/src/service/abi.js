
const abiId = process.env.REACT_APP_ABI_ID || '0x0';

export default async function getAbi() {
    const url = `https://ipfs.io/ipfs/${abiId}`;
    const response = await fetch(url)
    const text = await response.text();
    const abs = JSON.parse(text);
    const { output: { abi } } = abs;
    return abi;
}
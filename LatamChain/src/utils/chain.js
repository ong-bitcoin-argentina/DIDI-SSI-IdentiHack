
const CORRECT_NET = '648529';

export const isCorrectChainId = async (ethereum) => {
  const chainId = await window.ethereum.request({ method: 'net_version' });
  return Promise.resolve(chainId === CORRECT_NET);
}


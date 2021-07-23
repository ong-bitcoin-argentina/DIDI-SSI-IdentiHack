
export const generateSmartContract = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_SMART_AUTHORIZATION}`);
  myHeaders.append("Content-Type", "application/json");
  
  const pK = process.env.REACT_APP_SMART_PK;
  var raw = JSON.stringify({privateKey: `0x${pK}`});

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw, 
    redirect: 'follow'
  };

  const response = await fetch(process.env.REACT_APP_SMART_SMART_CONTRACT_GENERATOR_URL, requestOptions);
  const result = await response.text();
  return Promise.resolve(result);
}

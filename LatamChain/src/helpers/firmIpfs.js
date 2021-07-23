

export const firmIpfs = async (data) => {

  const url = process.env.REACT_APP_FIRM_IPFS_URL_STAMP
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_FIRM_IPFS_TOKEN}`);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
  };

  const response = await fetch(url, requestOptions);
  return await response.text();

}
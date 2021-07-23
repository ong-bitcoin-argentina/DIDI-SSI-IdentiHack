

const json = 
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "id": "<UUID>",
  "type": [
    "VerifiableCredential",
    "CriptoCardCredential"
  ],
  "issuer": "did:ethr:lacchain:<dirección del metamask>",
  "issuanceDate": "<Fecha en formato ISO de inicio de vigencia>",
  "expirationDate": "<Fecha en formato ISO de termino de vigencia>",
  "credentialSubject": {
    "id": "did:ethr:lachain:<Address Card>",
    "network": "ethr:lacchain:eip-999",
    "contract": `<código del contrato>`,
    "pubKeyMethod": "0x6765745075624b657928223c4349443e2229",
    "activateMethod": "0x616374697661746528223c4349443e222c223c73657269616c3e2229"
  },
  "credentialStatus": {
    "id": "<código del contrato>",
    "method": "0x73746174757328223c4349443e2229",
    "type": "SmartContract"
  },
  "proof": [
    {
      "id": "did:ethr:lacchain:<dirección del metamask>",
      "type": "EcdsaSecp256k1Signature2019",
      "proofPurpose": "assertionMethod",
      "verificationMethod": "did:ethr:lacchain:<dirección del metamask>#controller",
      "domain": "<código del contrato>",
      "proofValue": "<firma ECDA>"
    }
  ]
}




export default async function jsonGenerator(
  uuid='UUID TEST', validFrom=123, validTo=123,
  contract='0xEXAMPLE', serialDigest='digest-card',
  metamaskDir='0xMETAMASK',
  publicKey='PublicKeyTest'
) {

  json['id'] = uuid;
  json['issuanceDate'] = validFrom;
  json['expirationDate'] = validTo;
  json['issuer'] = `did:ethr:lacchain:${metamaskDir}`;
  json['credentialSubject']['id'] = `did:ethr:lachain:${publicKey}`;
  json['credentialSubject']['contract'] = contract;
  json['credentialStatus']['id'] = contract;
  json['proof'] = [
    {
      id: `did:ethr:lacchain:${contract}`,
      type: "EcdsaSecp256k1Signature2019",
      proofPurpose: "assertionMethod",
      verificationMethod: `did:ethr:lacchain:${metamaskDir}#controller`,
      domain: `contract`,
      proofValue: publicKey
    }
  ]
  

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_JSON_GENERATOR_TOKEN_PINATA}`);

  var formdata = new FormData();
  const blob = new File([JSON.stringify(json)], { type: "text/plain"})
  formdata.append("file", blob);


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", requestOptions);
  const result = await response.text();
  return { generated: JSON.parse(result), json: json};
}
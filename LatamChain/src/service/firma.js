import * as ethUtil from 'ethereumjs-util';
import web3Abi from  "web3-eth-abi";
import web3Utils from "web3-utils";

import { digestMessage } from '../helpers/utils-keys';


const PRIVATE_KEY = process.env.REACT_APP_FIRMA_PRIVATE_KEY
const contract = process.env.REACT_APP_FIRMA_CONTRACT_ADDRESS;

const VERIFIABLE_CREDENTIAL_TYPEHASH = web3Utils.soliditySha3( "VerifiableCredential(address issuer,address subject,bytes32 data,uint256 validFrom,uint256 validTo)" );
const EIP712DOMAIN_TYPEHASH = web3Utils.soliditySha3( "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)" );
const encodeEIP712Domain = web3Abi.encodeParameters(
    ['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
    [EIP712DOMAIN_TYPEHASH, web3Utils.sha3( "EIP712Domain" ),
    web3Utils.sha3( "1" ), 
    648529, contract]
  );


const getCredentialHash = async ( vc, issuer, subjectAddress) => {
  const credential = await digestMessage( JSON.stringify( vc.credentialSubject ) )
  const hashHex = "0x"+credential;

  
  const hashEIP712Domain = web3Utils.soliditySha3( encodeEIP712Domain );

  const validFrom = new Date( vc.issuanceDate ).getTime();
  const validTo = new Date( vc.expirationDate ).getTime();

  const encodeHashCredential = web3Abi.encodeParameters(
    ['bytes32', 'address', 'address', 'bytes32', 'uint256', 'uint256'],
    [VERIFIABLE_CREDENTIAL_TYPEHASH, issuer, subjectAddress, hashHex, Math.round( validFrom / 1000 ), Math.round( validTo / 1000 )]
  );
  const hashCredential = web3Utils.soliditySha3( encodeHashCredential );

  const encodedCredentialHash = web3Abi.encodeParameters( ['bytes32', 'bytes32'], [hashEIP712Domain, hashCredential.toString( 16 )] );
  return web3Utils.soliditySha3( '0x1901'.toString( 16 ) + encodedCredentialHash.substring( 2, 131 ) );
}


function signCredential( credentialHash, privateKey ) {
	const rsv = ethUtil.ecsign(
		Buffer.from( credentialHash.substring( 2, 67 ), 'hex' ),
		Buffer.from( privateKey, 'hex' )
	);
	return ethUtil.toRpcSig( rsv.v, rsv.r, rsv.s );
}



export const executeSignCredential = async (jsonFile, issuer, publicKey) => {
    const vc = await getCredentialHash(jsonFile, issuer, publicKey)
    const signature = signCredential( vc, PRIVATE_KEY);
    return signature;
}
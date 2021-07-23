import React from 'react';
import styled from 'styled-components';
import QRCode from "react-qr-code";

const CardStyled = styled.div`
    width: 500px;
    height: 270px;
    background-color: rgb(31, 78, 120);
    color: #b5d8f8;
    display: inline-block;
    border-bottom-right-radius: 50px;
    border-top-left-radius: 50px;
    padding: 20px;
    font-family: sans-serif;
    margin: 10px;

    .card-header {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .card-header_col-1 {
            display: flex;
            flex-direction: column;
            .title {
                font-size: 40px;
                line-height: 35px;
                font-weight: bold;
                color: #6cc3ff;
                text-align: center;
            }
            .sub-title {
                line-height: 10px;
            }
        }
        .card-header_col-2 {
            display: flex;
            justify-content: flex-end;
            .card-valido {
                flex: 0 0 60px;
                font-family: serif;
            }
            .card-fecha {
                font-size: 45px;
                line-height: 36px;
                font-family: none;
            }
        }
    }
    .card-body {
        padding-top: 10px;
        display: flex;
        .col-1 {
            flex: 0 0 30%;
            .container-qr-big {
                background-color: #fff;
                padding: 5px;
                padding-bottom: 0;
            }
        }
        .col-2 {
            flex: 0 0 70%;
            display: flex;
            flex-direction: column;
            .serial-container {
                margin-left: 10px;
                margin-bottom: 10px;
                .serial-codigo {
                    font-size: 26px;
                    font-family: none;
                    line-height: 20px;
                }
            }
            .container-small-qr-banco {
                display: flex;
                flex-direction: row;
                margin-right: 15px;
                .container-qr-small {
                    background-color: #fff;
                    display: inline-block;
                    padding: 5px;
                    padding-bottom: 0;
                }
                .container_text-no-compartir {
                    width: 100%;
                    .text-no-compartir {
                        width: 100px;
                        text-align: right;
                        float: right;
                        margin-right: 10px;
                        margin-top: 10px;
                        line-height: 16px;
                    }
                }
            }
        }
    }
    .card-footer {
        display: flex;
        justify-content: space-between;
        .col-1 {
            .did {
                font-size: 10px;
            }
        }
        .col-2 {
            margin-right: 20px;
            font-size: 18px;
        }
    }
`;


const Card = ({serial, month, year, serialDigest='EXAMPLE', IpfsHash='ahahah'}) => {
    return (
        <CardStyled>
            <div className="card-header">
                <div className="card-header_col-1">
                    <span className="title">DIDI</span>
                    <span className="sub-title">CRIPTOCARD</span>
                </div>
                <div className="card-header_col-2">
                    <div className="card-valido">VÁLIDO HASTA</div>
                    <div className="card-fecha">{ ("00" + (+month).toString()).substr(-2)}/{year}</div>
                </div>
            </div>
            <div className="card-body">
                <div className="col-1">
                    <div className="container-qr-big">
                        <QRCode 
                            value={`did:cid:ipfs:${IpfsHash}`} 
                            size={140} bgColor="#fff" fgColor="#282c34" level="H" />
                    </div>
                </div>
                <div className="col-2">
                    <div className="serial-container">
                        <div>SERIAL</div>
                        <div className="serial-codigo">{serial}</div>
                    </div>
                    <div className="container-small-qr-banco">
                        <div className="container_text-no-compartir">
                            <span className="text-no-compartir">
                                Solo debes compartir este código con el banco
                            </span>
                        </div>
                        <div className="container-qr-small">
                            {/* <img src="https://static-unitag.com/images/help/QRCode/qrcode.png" /> */}
                            <QRCode 
                                value={serialDigest} 
                                size={90} bgColor="#fff" 
                                fgColor="#282c34" 
                                level="L" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="col-1">
                    <span className="did">
                    did:cid:ipfs:{IpfsHash}
                    </span>
                </div>
                <div className="col-2">
                    KEY-P
                </div>
            </div>
            
        </CardStyled>
    )

}

export default Card;
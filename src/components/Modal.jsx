import styled from "styled-components"
import { ImCheckmark } from "react-icons/im"
import { FaTimes } from "react-icons/fa"
import { tokenContractAddresses } from "../constants"
import { useState } from "react"

const Container = styled.div`
    position: fixed;
    padding: 2em 3em;
    top: 65px;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    max-width: 900px;
    min-width: 300px;
    background-color: #1c1c1c;
    color: whitesmoke;
    height: 500px;
    z-index: 99;
    box-shadow: 0px 0px 6px 2px #666;
    overflow-x: hidden;
    overflow-y: hidden;

    .close-modal {
        display: block;
        font-size: 2rem;
        margin: auto 0 1em auto;
        cursor: pointer;
        color: #ffb703;
        transition: all 0.4s ease;
    }

    .close-modal:hover {
        color: whitesmoke;
    }

    .loader-container h1 {
        text-align: center;
        margin-bottom: 1em;
    }

    .loader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 0.5em;
    }

    .text-container {
        letter-spacing: 0.5px;
        font-size: 0.75rem;
        margin-bottom: 2em;
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 30px;
    }

    .icon-container {
        background-color: #0066ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        position: relative;
    }

    .spinner {
        position: absolute;
        top: 0;
        left: 50%;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 4px solid white;
        border-top: 4px solid #f8f9fa;
        border-right: 4px solid #dee2e6;
        border-bottom: 4px solid #adb5bd;
        border-left: 4px solid #495057;
        animation: 1.5s linear infinite spinner;
        transform: translate3d(-50%, -50%, 0);
        will-change: transform;
    }

    @keyframes spinner {
        0% {
            transform: translate3d(-50%, -50%, 0) rotate(0deg);
        }
        100% {
            transform: translate3d(-50%, -50%, 0) rotate(360deg);
        }
    }

    .bar {
        left: 50px;
        width: calc(100% - 100px);
        background-color: #0066ff;
        height: 10px;
        position: absolute;
        z-index: -1;
    }

    .icon {
        font-size: 1rem;
    }

    .transaction {
        padding: 2em;
        border: 2px solid #343a40;
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 2em;
    }

    .amount {
        min-width: 70px;
    }

    .hash-container {
        overflow: hidden;
    }

    .hash-link {
        text-decoration: underline;
        color: #ffb703;
    }

    .add-token {
        display: block;
        margin: 0 auto;
        padding: 0.5em 1em;
        border: none;
        border-radius: 6px;
        background-color: #0066ff;
        color: white;
        font-size: 1rem;
        font-family: inherit;
        transition: all 0.4s ease;
    }

    .add-token:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .add-token:hover:not([disabled]) {
        color: black;
        background-color: white;
    }

    .add-token:active {
        box-shadow: inset 5px 5px 10px -3px rgba(0, 0, 0, 0.7);
    }

    @media (max-width: 935px) {
        margin: auto 1em auto;
        padding: 2em;
    }

    @media (max-width: 745px) {
        .loader-container h1 {
            font-size: 1.6rem;
        }
    }

    @media (max-width: 480px) {
        .align-right {
            text-align: right;
        }
    }

    @media (max-width: 450px) {
        .loader-container h1 {
            font-size: 1.4rem;
        }
    }
`

const Modal = ({ data, isConfirmed, closeModal, chainId }) => {
    const [log, setLog] = useState("")
    const tokenAddress =
        chainId in tokenContractAddresses
            ? tokenContractAddresses[chainId][0]
            : null

    const params = {
        type: "ERC20",
        options: {
            address: tokenAddress,
            symbol: "FEL",
            decimals: 18,
        },
    }

    const addTokenToWallet = async () => {
        await window.ethereum
            .request({ method: "wallet_watchAsset", params })
            .then((success) => {
                if (success) {
                    setLog("Tokens added to wallet")
                } else {
                    throw new Error("Something went wrong")
                }
            })
            .catch((error) => setLog(`Error: ${error.message}`))
    }

    return (
        <Container isConfirmed={isConfirmed}>
            <FaTimes onClick={closeModal} className="close-modal" />
            <div className="loader-container">
                <div className="loader">
                    <div className="icon-container">
                        <ImCheckmark className="icon" />
                    </div>
                    <div className="bar"></div>
                    <div className="icon-container">
                        {isConfirmed ? (
                            <ImCheckmark className="icon" />
                        ) : (
                            <div className="spinner"></div>
                        )}
                    </div>
                </div>
                <div className="text-container">
                    <p>Transaction initialized</p>
                    <p className="align-right">
                        {isConfirmed
                            ? "Tokens transfered"
                            : "Waiting confirmations"}
                    </p>
                </div>
                <h1>
                    {isConfirmed
                        ? "Transaction confirmed"
                        : "Waiting for transaction confirmation..."}
                </h1>
                <div className="transaction">
                    <div className="amount">
                        <p>{isConfirmed ? "Sent" : "Sending"}</p>
                        <p>10 FEL</p>
                    </div>
                    <div className="hash-container">
                        <p>Transaction Hash</p>
                        <a
                            className="hash-link"
                            href={`${
                                String(chainId) === "80001"
                                    ? `https://mumbai.polygonscan.com/tx/${data.transactionResponse.hash}`
                                    : `https://sepolia.etherscan.io/tx/${data.transactionResponse.hash}`
                            }`}
                            target="_blank"
                        >
                            {data.transactionResponse.hash}
                        </a>
                    </div>
                </div>
                <button
                    onClick={addTokenToWallet}
                    disabled={!isConfirmed}
                    className="add-token"
                >
                    Add token to wallet
                </button>
            </div>
        </Container>
    )
}

export default Modal

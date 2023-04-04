import Link from "next/link"
import { useContext, useEffect } from "react"
import { Web3Context } from "../Web3Context"
import styled from "styled-components"
import { BsArrowRightCircle, BsCircle, BsCircleFill } from "react-icons/bs"
import { FaAddressCard } from "react-icons/fa"
import { useState } from "react"
import Modal from "../components/Modal"
import Meta from "../components/Meta"
import { getFaucetsBalances } from "../fetchData"

const Container = styled.div`
    padding: 0 0.8em 3em;
    margin: 0 auto;

    .home-top {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em 0;
        max-width: 1200px;
        margin: 0 auto;
    }

    .home-image-container {
        max-width: 200px;
    }

    .home-image {
        width: 100%;
    }

    .home-title-container .home-title {
        font-size: 2.3rem;
    }

    .home-title {
        line-height: 1.4;
        font-weight: 600;
    }

    .home-link {
        order: -1;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        align-self: end;
        padding: 0.5em;
    }

    .home-link-text {
        font-size: 0.8rem;
    }

    .home-link-text:hover {
        text-decoration: underline;
    }

    .home-link-icon {
        font-size: 1rem;
    }

    .content-wrapper-networks,
    .content-wrapper-request {
        margin: 4em auto 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .instructions {
        display: flex;
        flex-direction: column;
        min-width: 252px;
    }

    .select-networks {
        display: inline-flex;
        flex-direction: column;
        width: 100%;
        border: 1px solid #dcdcdc;
        padding: 24px 12px 24px 12px;
        max-width: 760px;
        gap: 12px;
    }

    .title {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        padding: 0 22px 0 10px;
        font-size: 0.8rem;
        max-width: 760px;
        color: #676767;
    }

    .title ul:nth-child(1) {
        width: 100%;
        display: inline-flex;
    }

    .title ul:nth-child(2) {
        width: auto;
        min-width: 80px;
        text-align: right;
        white-space: nowrap;
    }

    .title ul:nth-child(3) {
        width: 100%;
        max-width: 213px;
        text-align: right;
    }

    .spinner {
        margin: 1em auto 0;
        width: 18px;
        height: 18px;
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

    .sepolia {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        max-width: 760px;
        height: 46px;
        padding: 35px 22px 35px 10px;
        background-color: ${({ chainId }) =>
            String(chainId) === "11155111" ? "#E1F8FF" : "#fff"};
        font-size: 0.8rem;
        opacity: ${({ chainId }) =>
            String(chainId) === "11155111" ? "1" : "0.5"};
    }

    .sepolia li:nth-child(1) {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
    }

    .sepolia li:nth-child(2) {
        width: auto;
        min-width: 80px;
        text-align: right;
        white-space: nowrap;
    }

    .sepolia li:nth-child(3) {
        width: 100%;
        max-width: 213px;
        text-align: right;
    }

    .mumbai {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        max-width: 760px;
        height: 46px;
        padding: 35px 22px 35px 10px;
        background-color: ${({ chainId }) =>
            String(chainId) === "80001" ? "#E1F8FF" : "#fff"};
        font-size: 0.8rem;
        opacity: ${({ chainId }) =>
            String(chainId) === "80001" ? "1" : "0.5"};
    }

    .mumbai li:nth-child(1) {
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
    }

    .mumbai li:nth-child(2) {
        width: auto;
        min-width: 80px;
        text-align: right;
        white-space: nowrap;
    }

    .mumbai li:nth-child(3) {
        width: 100%;
        max-width: 213px;
        text-align: right;
    }

    .circle-icon {
        min-width: 18px;
        margin-right: 12px;
    }

    .request-tokens {
        margin-top: 1.5em;
        display: inline-flex;
        flex-direction: column;
        width: 100%;
        max-width: 760px;
        padding: 38px 42px 59px 30px;
        border: 1px solid #dcdcdc;
    }

    .request-tokens h1 {
        color: #676767;
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 0.8em;
    }

    .address-wrapper {
        position: relative;
        display: inline-flex;
        flex-direction: row;
        padding: 17px 0 10px 0;
        border-bottom: 1px solid ${({ isActive }) =>
            isActive ? "black" : "#c5c5c5"};
        align-items: center;
    }
    
    .address-icon {
        display: block;
        opacity: ${({ isActive }) => (isActive ? "1" : "0.38")};
        width: 25px;
        height: 25px;
    }

    .input-address {
        flex: 1;
        display: inline-flex;
        height: 28px;
        margin-left: 14px;
        border: none;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        color: #000000;
        background-color: #fff;
        outline: none;
        letter-spacing: 0.2px;
        font-family: monospace;
    }

    .notification {
        position: absolute;
        top: 60px;
        color: red;
        font-size: 0.75rem;
        transition: all 0.4s ease;
    }

    .note-captcha {
        display: inline-flex;
        flex-direction: column;
        margin-top: 43px;
        gap: 30px 0;
    }

    .note-captcha p {
        color: #676767;
        font-size: 13.5px;
        margin-bottom: 0.5em;
    }

    .note-captcha ul {
        flex: 1;
        display: inline-flex;
        flex-direction: column;
    }

    .note-captcha li {
        margin: 12px 0 0 20px;
        list-style: disc;
        font-size: 13.5px;
    }

    .claim-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 48px;
        margin-top: 70px;
        border: 1px solid #0066ff;
        border-radius: 6px;
        background-color: #ffffff;
        font-weight: 400;
        font-size: 1rem;
        letter-spacing: 0.01em;
        color: white;
        cursor: pointer;
        background-color: #0066ff;
        transition all 0.4s ease;
    }

    .claim-button:active {
        box-shadow: inset 5px 5px 10px -3px rgba(0, 0, 0, 0.7);
    }

    .claim-button:hover:not([disabled]) {
        background-color: white;
        color: #1c1c1c;
    }

    .claim-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (min-width: 460px) {
        .mumbai, 
        .sepolia{
           padding: 0px 22px 0px 10px; 
        }
    }

    @media(min-width: 560px) {
        .select-networks {
            padding: 3em 1.5em;
        }

        .title {
            font-size: 0.9rem;
            margin-bottom: 1.5em;
        }

        .sepolia,
        .mumbai {
            font-size: 1rem;
            padding: 30px 22px 30px 10px;
        }

        .circle-icon {
            min-width: 30px;
            font-size: 18px;
        }

        .request-tokens h1 {
            font-size: 0.9rem;
        }

        .input-address {
            font-size: 1rem;
        }

        .notification {
            font-size: 0.9rem;
        }

        .request-tokens {
            padding: 3em;
        }

        .note-captcha p {
            font-size: 14px;
        }

        .note-captcha li {
            font-size: 1rem;
            line-height: 1.4;
        }
    }

    @media(min-width: 780px) {
        padding-bottom: 5em;

        .home-top {
            flex-direction: row;
            justify-content: space-between;
            gap: unset;
        }

        .home-image {
            width: 280px;
        }

        .home-title-container {
            margin-left: 2em;
        }

        .home-title-container .home-title {
            font-size: 3.3rem;
            margin-left: 1.5em;
        }

        .home-link {
            order: 2;
            align-self: start;
            margin-top: 1em;
        }

        .home-link-text {
            font-size: 0.9rem;
        }

        .content-wrapper-networks,
        .content-wrapper-request {
            margin: 6em auto 0;
            display: flex;
            flex-direction: row;
            gap: 25px;
        }

        .content-wrapper-networks br:nth-of-type(1),
        .content-wrapper-request br:nth-of-type(1) {
            display: none;
        }

        .content-wrapper-networks .home-title,
        .content-wrapper-request .home-title {
            margin-bottom: 0.5em;
        }

        .instructions {
            max-width: 350px;
        }

        .sepolia,
        .mumbai {
            padding: 50px 22px 50px 10px;
        }

        .request-tokens {
            margin: unset;
        }

        .claim-button {
            padding: 1.2em 0;
        }
    }

    @media (min-width: 922px) {
        .sepolia,
        .mumbai {
            padding: 25px 22px 25px 10px;
        }
    }
`
const Home = () => {
    const { chainId, enableWeb3, isWeb3Enabled } = useContext(Web3Context)
    const [isLoading, setIsLoading] = useState(false)
    const [address, setAddress] = useState("")
    const [isActive, setIsActive] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [data, setData] = useState("")
    const [message, setMessage] = useState("")
    const [logs, setLogs] = useState({})
    console.log(typeof logs.balanceSepolia)

    const handleChange = (event) => {
        setAddress(event.target.value)
    }

    const listenForTransactionMine = async (transactionResponse) => {
        try {
            const provider = await enableWeb3()
            provider.on(transactionResponse.hash, (transactionReceipt) => {
                setIsConfirmed(true)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const closeModal = () => {
        setIsOpen(!isOpen)
    }

    const updateUI = async () => {
        setIsLoading(true)
        try {
            const data = await getFaucetsBalances()
            setLogs(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const claimTokens = () => {
        const regex = /[0-9A-Fa-f]{6}/g

        // checks if the address is a valid hex string using the regex pattern
        if (address.match(regex)) {
            fetch("https://felina-api2.p.rapidapi.com/v1/api/request", {
                method: "POST",
                headers: {
                    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
                    "X-RapidAPI-Host": "felina-api2.p.rapidapi.com",
                    "Content-Type": "application/json",
                },
                mode: "cors",
                credentials: "omit",
                body: JSON.stringify({
                    chainId,
                    address,
                }),
            })
                .then((res) => res.json())
                .then(async (data) => {
                    if (data.transactionResponse) {
                        setData(data)
                        setIsOpen(!isOpen)
                        await listenForTransactionMine(data.transactionResponse)
                    } else {
                        setMessage(data.message)
                    }
                })
                .catch((error) => console.log(error))
        } else {
            setMessage("Please insert a valid address.")
        }
    }

    useEffect(() => {
        const handleClick = (event) => {
            if (event.target.id === "input-address") {
                setIsActive(true)
            } else {
                setIsActive(false)
            }
        }
        window.addEventListener("click", handleClick)
    }, [isActive])

    useEffect(() => {
        try {
            updateUI()
        } catch (error) {
            console.log(error)
        }
    }, [chainId])

    useEffect(() => {
        if (message) setTimeout(() => setMessage(""), 10000)
    }, [message])

    return (
        <Container chainId={chainId} isActive={isActive}>
            <Meta title={"Felina Hub | Faucets"} />
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    data={data}
                    isConfirmed={isConfirmed}
                    closeModal={closeModal}
                    chainId={chainId}
                />
            )}
            <div className="home-top">
                <div className="home-image-container">
                    <img className="home-image" src="../../../VF01455.png" />
                </div>
                <div className="home-title-container">
                    <h1 className="home-title">Felina Token</h1>
                    <h1 className="home-title">Faucets</h1>
                </div>
                <Link href="/transactions" className="home-link">
                    <span className="home-link-text">
                        Check the latests transactions
                    </span>{" "}
                    <BsArrowRightCircle className="home-link-icon" />
                </Link>
            </div>

            <div className="content-wrapper-networks">
                <div className="instructions">
                    <h1 className="home-title">Select a network</h1>
                    <br />
                    <p>
                        Connect your wallet to one of the avaliable networks and
                        request tokens every 10 minutes.
                    </p>
                    <br />
                    <p>
                        If you don't have Metamask installed,{" "}
                        <a
                            href="https://metamask.io/download/"
                            target="_blank"
                            style={{
                                color: "#ff006e",
                                textDecoration: "underline",
                            }}
                        >
                            click here
                        </a>{" "}
                        to learn how to set up a wallet.
                    </p>
                    <br />
                    <p>
                        The amount of tokens we distribute is determined based
                        on the remaining balance of the faucet.
                    </p>
                </div>
                <br />
                <div className="select-networks">
                    <div className="title">
                        <ul>Networks</ul>
                        <ul>Amount</ul>
                        <ul>Remaining balance</ul>
                    </div>
                    <ul className="sepolia">
                        <li>
                            {String(chainId) === "11155111" ? (
                                <BsCircleFill className="circle-icon" />
                            ) : (
                                <BsCircle className="circle-icon" />
                            )}
                            Ethereum: Sepolia Testnet
                        </li>
                        <li>
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                logs.sepoliaFaucetDripAmount + " FEL"
                            )}
                        </li>
                        <li>
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                logs.balanceSepolia.slice(0, -18) + " FEL"
                            )}
                        </li>
                    </ul>
                    <ul className="mumbai">
                        <li>
                            {String(chainId) === "80001" ? (
                                <BsCircleFill className="circle-icon" />
                            ) : (
                                <BsCircle className="circle-icon" />
                            )}{" "}
                            Polygon: Mumbai Testnet
                        </li>
                        <li>
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                logs.mumbaiFaucetDripAmount + " FEL"
                            )}
                        </li>
                        <li>
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                logs.balanceMumbai.slice(0, -18) + " FEL"
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="content-wrapper-request">
                <div className="instructions">
                    <h1 className="home-title">Request tokens</h1>
                    <br />
                    <p>
                        Insert the address to which you would like the faucet to
                        send you the tokens. (Double check the address and the
                        network before sending the request).
                    </p>
                    <br />
                    <p>
                        Solve the hCaptcha to activate the request button and
                        click on it to claim tokens.
                    </p>
                </div>

                <div className="request-tokens">
                    <h1>Your wallet address</h1>
                    <div className="address-wrapper">
                        <FaAddressCard className="address-icon" />
                        <input
                            id="input-address"
                            className="input-address"
                            placeholder="0x00..."
                            name="address"
                            value={address}
                            onChange={handleChange}
                        />
                        <p className="notification">{message}</p>
                    </div>
                    <div className="note-captcha">
                        <ul>
                            <p>Note</p>
                            <li>
                                <strong>
                                    ⚠️THESE TESTNET TOKENS ARE NOT REAL MONEY⚠️
                                </strong>
                            </li>
                            <li>
                                This faucet was created as a personal project
                                for developing purposes.
                            </li>
                            <li>Users can request tokens every 10 minutes.</li>
                        </ul>
                    </div>
                    <button
                        id="claim-button"
                        disabled={
                            !isWeb3Enabled ||
                            (logs.sepoliaFaucetDripAmount === "0" &&
                                logs.mumbaiFaucetDripAmount === "0")
                        }
                        className="claim-button"
                        onClick={claimTokens}
                    >
                        Request tokens
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default Home

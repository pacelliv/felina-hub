import { useContext, useState, useEffect } from "react"
import { useWeb3Contract } from "react-moralis"
import { Web3Context } from "../Web3Context"
import {
    tokenAbi,
    burnerAbi,
    tokenContractAddresses,
    burnerContractAddresses,
} from "../constants"
import Placeholder from "../components/Placeholder"
import { ethers } from "ethers"
import { getTransactionsData } from "../fetchData"
import Meta from "../components/Meta"
import styled from "styled-components"

const Container = styled.div`
    padding: 0 1em 4em;

    @media (max-width: 780px) {
        padding: 2em 1em 1em;
    }
`

const Header = styled.div`
    padding: 0 0.8em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: -3em auto 0;

    h1 {
        font-size: 1.2rem;
    }

    .network-container {
        display: flex;
        align-items: center;
        gap 10px;
    }

    .logo-ethereum {
        width: 10px;
    }

    .logo-polygon {
        width: 16px;
    }

    @media(min-width: 940px) {
        padding: 0;
    }
`

const Divider = styled.div`
    height: 1px;
    background-color: #e8e8e8;
    margin: 1em auto 6em;
`

const CardsContainer = styled.div`
    max-width: 930px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    gap: 10px;
    justify-items: center;
    margin: 0 auto;
    padding-bottom: 3em;

    @media (max-width: 938px) {
        padding-bottom: 1em;
    }
`

const Div = styled.div`
    background-color: #f4f6ff;
    width: 300px;
    border-radius: 7px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    transition: all 0.3s ease;
    align-self: center;

    :hover {
        background-color: #e0e4f7;
    }
`

const Stat = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .type {
        font-weight: 600;
        font-size: 1.3rem;
    }

    .value {
        font-weight: 700;
        font-size: 1.1rem;
    }

    .spinner {
        margin: 0.5em auto 0;
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
`

const Icon = styled.img`
    width: 35px;
`

const Dashboard = () => {
    const { chainId, isWeb3Enabled } = useContext(Web3Context)
    const [isLoading, setIsLoading] = useState(false)
    const [targetSupply, setTargetSupply] = useState(0)
    const [currentCirculation, setCurrentCirculation] = useState(0)
    const [dailyBurnAmount, setDailyBurnAmount] = useState(0)
    const [totalTokenBurn, setTotalTokenBurn] = useState(0)
    const [logs, setLogs] = useState([])

    const tokenAddress =
        chainId in tokenContractAddresses
            ? tokenContractAddresses[chainId][0]
            : null

    const burnerAddress =
        chainId in burnerContractAddresses
            ? burnerContractAddresses[chainId][0]
            : null

    const { runContractFunction: getDailyBurnAmount } = useWeb3Contract({
        abi: burnerAbi,
        contractAddress: burnerAddress,
        functionName: "getDailyBurnAmount",
        params: {},
    })

    const { runContractFunction: totalBurnt } = useWeb3Contract({
        abi: burnerAbi,
        contractAddress: burnerAddress,
        functionName: "totalBurnt",
        params: {},
    })

    const { runContractFunction: getTargetSupply } = useWeb3Contract({
        abi: tokenAbi,
        contractAddress: tokenAddress,
        functionName: "getTargetSupply",
        params: {},
    })

    const { runContractFunction: totalSupply } = useWeb3Contract({
        abi: tokenAbi,
        contractAddress: tokenAddress,
        functionName: "totalSupply",
        params: {},
    })

    const updateUI = async () => {
        setIsLoading(true)
        try {
            const totalBurntFromContractCall = (await totalBurnt()).toString()
            const targetSupplyFromContractCall = (
                await getTargetSupply()
            ).toString()
            const currentCirculationFromContractCall = (
                await totalSupply()
            ).toString()
            const dailyBurnAmountFromContractCall = (
                await getDailyBurnAmount()
            ).toString()
            const { logsData } = await getTransactionsData(chainId)

            setTotalTokenBurn(totalBurntFromContractCall)
            setTargetSupply(targetSupplyFromContractCall)
            setCurrentCirculation(currentCirculationFromContractCall)
            setDailyBurnAmount(dailyBurnAmountFromContractCall)
            setLogs(logsData)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        try {
            updateUI()
        } catch (error) {
            console.log(error)
        }
    }, [chainId])

    return (
        <>
            <Meta title={"Felina Hub | Dashboard"} />
            {isWeb3Enabled ? (
                <Container>
                    <Header>
                        <h1>Stats</h1>
                        <div className="network-container">
                            <img
                                className={
                                    chainId === 80001
                                        ? "logo-polygon"
                                        : "logo-ethereum"
                                }
                                src={`./${
                                    chainId === 80001
                                        ? "polygon-matic"
                                        : "ethereum-eth"
                                }-logo.svg`}
                            />
                            <span>
                                {chainId === 80001
                                    ? "Polygon Mumbai"
                                    : "Ethereum Sepolia"}
                            </span>
                        </div>
                    </Header>
                    <Divider />
                    <CardsContainer>
                        <Div>
                            <Icon src="../../money-bill-transfer-solid.svg" />
                            <Stat>
                                <p className="type">Transactions</p>
                                {isLoading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <p className="value">{logs.length}</p>
                                )}
                            </Stat>
                        </Div>
                        <Div>
                            <Icon src="../../print-solid.svg" />
                            <Stat>
                                <p className="type">Initial Supply</p>
                                {isLoading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <p className="value">1,000,000,000 FEL</p>
                                )}
                            </Stat>
                        </Div>
                        <Div>
                            <Icon src="../../glass-water-solid.svg" />
                            <Stat>
                                <p className="type">Total Supply</p>
                                {isLoading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <p className="value">
                                        {Number(
                                            ethers.utils
                                                .formatEther(currentCirculation)
                                                .slice(0, -2)
                                        ).toLocaleString("en")}{" "}
                                        FEL
                                    </p>
                                )}
                            </Stat>
                        </Div>

                        <Div>
                            <Icon src="../../bullseye-solid.svg" />
                            <Stat>
                                <p className="type">Target Supply</p>
                                {isLoading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <p className="value">
                                        {Number(
                                            ethers.utils
                                                .formatEther(targetSupply)
                                                .slice(0, -2)
                                        ).toLocaleString("en")}{" "}
                                        FEL
                                    </p>
                                )}
                            </Stat>
                        </Div>
                        <Div>
                            <Icon src="../../fire-solid.svg" />
                            <Stat>
                                <p className="type">Total Burnt</p>
                                {isLoading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <p className="value">
                                        {Number(
                                            ethers.utils
                                                .formatEther(totalTokenBurn)
                                                .slice(0, -2)
                                        ).toLocaleString("en")}{" "}
                                        FEL
                                    </p>
                                )}
                            </Stat>
                        </Div>
                        <Div>
                            <Icon src="../../arrow-trend-down-solid.svg" />
                            <Stat>
                                <p className="type">Burning Rate</p>
                                {isLoading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    <p className="value">
                                        {Number(
                                            ethers.utils
                                                .formatEther(dailyBurnAmount)
                                                .slice(0, -2)
                                        ).toLocaleString("en")}{" "}
                                        FEL/day
                                    </p>
                                )}
                            </Stat>
                        </Div>
                    </CardsContainer>
                </Container>
            ) : (
                <Placeholder />
            )}
        </>
    )
}

export default Dashboard

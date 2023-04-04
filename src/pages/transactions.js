import { useContext, useEffect, useState } from "react"
import Table from "../components/transactions/Table"
import Placeholder from "../components/Placeholder"
import { Web3Context } from "../Web3Context"
import { getTransactionsData } from "../fetchData"
import Meta from "../components/Meta"
import styled from "styled-components"

const Div = styled.div`
    padding: 0 1em 4em;

    @media (max-width: 780px) {
        padding-top: 2em;
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

const StatsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 2em;

    @media (max-width: 505px) {
        flex-direction: column;
    }
`

const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;

    .sub-container {
        padding: 0.8em 1em;
        width: 100%;
        border: solid 1px transparent;
        border-radius: 10px;
        box-shadow: 0px 0px 5px -1px gray;
        max-width: 305px;
    }

    .card-title {
        text-transform: uppercase;
        font-size: 0.8rem;
        margin-bottom: 0.2em;
        letter-spacing: 0.5px;
        color: gray;
    }

    .card-stat {
        font-size: 1.1rem;
        transition: all 0.2s ease;
    }

    .sub-container:hover {
        .card-stat {
            color: #0077c6;
        }
    }

    @media (max-width: 900px) {
        flex-direction: column;

        .sub-container {
            max-width: 450px;
        }
    }

    @media (max-width: 505px) {
        .sub-container {
            max-width: 450px;
        }
    }
`

const Transactions = () => {
    const { chainId, isWeb3Enabled } = useContext(Web3Context)
    const [isLoading, setIsLoading] = useState(false)
    const [logs, setLogs] = useState([])
    const [networkFeeData, setNetworkFeeData] = useState({
        gasPrice: "",
        maxPriorityFeePerGas: "",
        maxFeePerGas: "",
    })

    useEffect(() => {
        const loadTransactionData = async () => {
            setIsLoading(true)

            try {
                const { logsData, feeData } = await getTransactionsData(chainId)
                setLogs(logsData)
                setNetworkFeeData({
                    gasPrice: feeData.gasPrice,
                    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
                    maxFeePerGas: feeData.maxFeePerGas,
                })
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        loadTransactionData()
    }, [chainId])

    if (isLoading && isWeb3Enabled) {
        return (
            <div style={{ width: "300px", margin: "0 auto" }}>
                <img src="../../../loading.svg" style={{ width: "100%" }} />
            </div>
        )
    }

    return (
        <>
            <Meta title={"Felina Hub | Transactions"} />
            {isWeb3Enabled ? (
                <Div>
                    <Header>
                        <h1>Transactions</h1>
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
                    <StatsContainer>
                        <Container>
                            <div className="sub-container">
                                <p className="card-title">
                                    No. of Transactions
                                </p>
                                <p className="card-stat">
                                    {logs.length.toLocaleString("en")}
                                </p>
                            </div>
                            <div className="sub-container">
                                <p className="card-title">Gas Price</p>
                                <p className="card-stat">
                                    {networkFeeData.gasPrice.slice(0, 1) +
                                        "." +
                                        networkFeeData.gasPrice.slice(1)}{" "}
                                    gwei
                                </p>
                            </div>
                        </Container>
                        <Container>
                            <div className="sub-container">
                                <p className="card-title">
                                    Max Priority Fee Per Gas
                                </p>
                                <p className="card-stat">
                                    {networkFeeData.maxPriorityFeePerGas.slice(
                                        0,
                                        1
                                    ) +
                                        "." +
                                        networkFeeData.maxPriorityFeePerGas.slice(
                                            1
                                        )}{" "}
                                    gwei
                                </p>
                            </div>
                            <div className="sub-container">
                                <p className="card-title">Max Fee Per Gas</p>
                                <p className="card-stat">
                                    {networkFeeData.maxFeePerGas.slice(0, 1) +
                                        "." +
                                        networkFeeData.maxFeePerGas.slice(
                                            1
                                        )}{" "}
                                    gwei
                                </p>
                            </div>
                        </Container>
                    </StatsContainer>
                    <Table logs={logs} />
                </Div>
            ) : (
                <Placeholder />
            )}
        </>
    )
}

export default Transactions

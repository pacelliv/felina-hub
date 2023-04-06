import styled from "styled-components"
import { useEffect, useContext } from "react"
import { Web3Context } from "../../Web3Context"
import { AiOutlineSetting } from "react-icons/ai"

const Container = styled.div`
    position: relative;
    opacity: ${({ modalIsOpen }) => modalIsOpen && "0.5"};

    .dropdown {
        width: 230px;
        position: absolute;
        top: 45px;
        right: 0;
        box-shadow: 0px 0px 5px -1px gray;
        border: 1px solid #ecedef;
        border-radius: 6px;
        background-color: white;
        padding: 1em 0;
    }

    .list,
    .network {
        font-size: 0.85rem;
    }

    .text {
        padding-left: 1em;
    }

    .chain-connected {
        padding: 0.5em 0 0.5em 1em;
        position: relative;
    }

    .dropdown-logo {
        width: 15px;
        margin-right: 10px;
    }

    .chain-ethereum {
        position: absolute;
        top: 11px;
        left: 40px;
    }

    .chain-polygon {
        position: absolute;
        top: 7px;
        left: 40px;
    }

    .chain {
        position: relative;
        cursor: pointer;
        width: 100%;
        padding: 0.5em 0 0.5em 1em;
        letter-spacing: 0.2px;
        font-size: 0.85rem;
    }

    .chain:hover {
        background-color: #d1d1d1;
    }

    .margin-top {
        margin-top: 1em;
    }
`

const Button = styled.button`
    padding: 0.5em 1em;
    border-radius: 6px;
    border: 1px solid white;
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: inherit;
    font-size: 0.85rem;
    color: white;
    transition: hover 0.5s ease;
    background-color: #1c1c1c;
    box-shadow: 0 0px 5px -1px #fff;
    cursor: ${({ modalIsOpen }) => (modalIsOpen ? "default" : "pointer")};

    &:hover:not([disabled]) {
        border: 1px solid transparent;
        color: #1c1c1c;
        background-color: white;
    }

    .button-logo {
        font-size: 1.1rem;
        pointer-events: none;
    }

    @media (max-width: 350px) {
        font-size: 0.8rem;
    }
`

const SwitchChainButton = ({
    dropdownNetwork,
    setDropdownNetwork,
    modalIsOpen,
}) => {
    const { chainIdHex, chainId, isWeb3Enabled } = useContext(Web3Context)

    const switchChain = async (_chainIdHex, _name, _rcpUrl) => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        chainId:
                            _chainIdHex === "0xaa36a7" ? "0x13881" : "0xaa36a7",
                    },
                ],
            })
        } catch (switchError) {
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId:
                                    _chainIdHex === "0xaa36a7"
                                        ? "0x13881"
                                        : "0xaa36a7",
                                chainName:
                                    _chainIdHex === "0xaa36a7"
                                        ? "Polygon Mumbai"
                                        : "Ethereum Sepolia",
                                rpcUrls: [_rcpUrl],
                                nativeCurrency: {
                                    name:
                                        _chainIdHex === "0xaa36a7"
                                            ? "Ether"
                                            : "Matic",
                                    symbol:
                                        _chainIdHex === "0xaa36a7"
                                            ? "ETH"
                                            : "MATIC",
                                    decimals: 18,
                                },
                                blockExplorerUrls: [
                                    _chainIdHex === "0xaa36a7"
                                        ? "https://matic-mumbai.chainstacklabs.com"
                                        : "https://sepolia.infura.io/v3/",
                                ],
                            },
                        ],
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    useEffect(() => {
        const handleClick = (event) => {
            if (event.target.id !== ("button" || "button-logo")) {
                setDropdownNetwork(false)
            }
        }
        window.addEventListener("click", handleClick)
    }, [dropdownNetwork])

    return (
        <Container modalIsOpen={modalIsOpen}>
            <Button
                id="button"
                onClick={() => setDropdownNetwork(!dropdownNetwork)}
                disabled={!isWeb3Enabled || modalIsOpen}
                modalIsOpen={modalIsOpen}
            >
                <AiOutlineSetting className="button-logo" />
                &#x25bc;
            </Button>
            {dropdownNetwork && (
                <div className="dropdown">
                    <ul className="list">
                        <li className="text">Connected to:</li>
                        <li className="chain-connected">
                            <img
                                className="dropdown-logo"
                                src={`../../../${
                                    chainId === 11155111
                                        ? "ethereum-eth"
                                        : "polygon-matic"
                                }-logo.svg`}
                            />
                            <span
                                className={
                                    chainId === 11155111
                                        ? "chain-ethereum"
                                        : "chain-polygon"
                                }
                            >
                                {chainId === 11155111
                                    ? "Ethereum Sepolia"
                                    : "Polygon Mumbai"}
                            </span>
                        </li>
                    </ul>
                    <ul className="list margin-top">
                        <li className="text">Switch to:</li>
                        <li
                            onClick={() => switchChain(chainIdHex)}
                            className="chain"
                            style={{
                                display: chainId === 80001 ? "none" : "block",
                            }}
                        >
                            <img
                                className="dropdown-logo"
                                src="../polygon-matic-logo.svg"
                            />
                            <span className="chain-polygon">
                                Polygon Mumbai
                            </span>
                        </li>
                        <li
                            style={{
                                display:
                                    chainId === 11155111 ? "none" : "block",
                            }}
                            onClick={() => switchChain(chainIdHex)}
                            className="chain"
                        >
                            <img
                                className="dropdown-logo"
                                src="../ethereum-eth-logo.svg"
                            />
                            <span className="chain-ethereum">
                                Ethereum Sepolia
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </Container>
    )
}

export default SwitchChainButton

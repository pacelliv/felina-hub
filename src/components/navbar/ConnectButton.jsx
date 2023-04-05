import Jazzicon, { jsNumberForAddress } from "react-jazzicon"
import { FaWallet } from "react-icons/fa"
import styled from "styled-components"
import { useEffect, useContext } from "react"
import { Web3Context } from "../../Web3Context"

const Button = styled.button`
    padding: 0.5em 1em;
    border-radius: 6px;
    border: 1px solid white;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.85rem;
    color: white;
    box-shadow: 0 0px 5px -1px #fff;
    transition: hover 0.5s ease;
    background-color: #1c1c1c;

    &:hover {
        border: 1px solid transparent;
        box-shadow: unset;
        color: #1c1c1c;
        background-color: white;
    }

    @media (max-width: 350px) {
        font-size: 0.8rem;
    }
`

const ConnectButton = () => {
    const {
        enableWeb3,
        isWeb3EnableLoading,
        isWeb3Enabled,
        Moralis,
        deactivateWeb3,
        account,
    } = useContext(Web3Context)

    // I need a `connectWallet function` that calles `enableWeb3`:
    // checks if the `enableWeb3` function exists && the window object
    // if it exist set a new Item to localStorage
    const connectWallet = async () => {
        const wallet = await enableWeb3()
        if (typeof wallet !== "undefined") {
            if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected")
            }
        }
    }

    // If the wallet is connected to the app, automatically connects the wallet
    // so the user doesn't needs to press the connect wallet button to display the address
    useEffect(() => {
        if (
            !isWeb3Enabled &&
            typeof window !== "undefined" &&
            window.localStorage.getItem("connected")
        ) {
            enableWeb3()
        }
    }, [isWeb3Enabled])

    // This useEffect checks for changes on the account connected to Metamask
    // Prints to the console if a new account connected to the app
    // Deletes the `connected` key from localStorage and disconnects the wallet with `deactivateWeb3()`
    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    return (
        <Button onClick={connectWallet} disabled={isWeb3EnableLoading}>
            {isWeb3Enabled ? (
                <Jazzicon diameter={20} seed={jsNumberForAddress(account)} />
            ) : (
                <FaWallet />
            )}
            {isWeb3Enabled
                ? `${account.slice(0, 5)}...${account.slice(
                      account.length - 4
                  )}`
                : "Connect"}
        </Button>
    )
}

export default ConnectButton

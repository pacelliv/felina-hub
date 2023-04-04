import { createContext } from "react"
import { useMoralis } from "react-moralis"

const Web3Context = createContext()

const Web3ContextProvider = ({ children }) => {
    const {
        enableWeb3,
        isWeb3EnableLoading,
        isWeb3Enabled,
        Moralis,
        deactivateWeb3,
        account,
        chainId: chainIdHex,
    } = useMoralis()

    const chainId = parseInt(chainIdHex)

    return (
        <Web3Context.Provider
            value={{
                enableWeb3,
                isWeb3EnableLoading,
                isWeb3Enabled,
                Moralis,
                deactivateWeb3,
                account,
                chainId,
                chainIdHex,
            }}
        >
            {children}
        </Web3Context.Provider>
    )
}

export { Web3Context, Web3ContextProvider }

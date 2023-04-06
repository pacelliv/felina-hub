import { MoralisProvider } from "react-moralis"
import { Web3ContextProvider } from "../Web3Context"
import { ThemeContextProvider } from "../ThemeContext"
import Layout from "../components/Layout"
import "@/styles/globals.css"

const App = ({ Component, pageProps }) => {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Web3ContextProvider>
                <ThemeContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeContextProvider>
            </Web3ContextProvider>
        </MoralisProvider>
    )
}

export default App

import Head from "next/head"

const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

Meta.defaultProps = {
    title: "Felina Hub",
    keywords: "smart contract, erc20, faucet, transactions, stats",
    description: "Official faucet and transaction explore for the Felina token",
}

export default Meta

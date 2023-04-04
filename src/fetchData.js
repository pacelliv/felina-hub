const getFaucetsBalances = async () => {
    try {
        const res = await fetch(
            "https://felina-api2.p.rapidapi.com/v1/api/faucets",
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
                    "X-RapidAPI-Host": "felina-api2.p.rapidapi.com",
                },
            }
        )
        if (!res.ok) {
            throw {
                message: "Failed to fetch balances",
                statusText: res.statusText,
                status: res.status,
            }
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const getTransactionsData = async (_chainId) => {
    try {
        const res = await fetch(
            `https://felina-api2.p.rapidapi.com/v1/api/transactions/${_chainId}`,
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_X_RAPID_API_KEY,
                    "X-RapidAPI-Host": "felina-api2.p.rapidapi.com",
                },
            }
        )
        if (!res.ok) {
            throw {
                message: "Failed to fetch transacion data",
                statusText: res.statusText,
                status: res.status,
            }
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export { getFaucetsBalances, getTransactionsData }

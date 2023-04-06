import { createContext, useState } from "react"

const ThemeContext = createContext()

const ThemeContextProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <ThemeContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider }

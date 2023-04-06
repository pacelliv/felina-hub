import Navbar from "./navbar/Navbar"
import Footer from "./Footer"
import styled from "styled-components"
import { ThemeContext } from "../ThemeContext"
import { useContext } from "react"

const Div = styled.div`
    min-height: 100vh;
    position: relative;
    background-color: ${({ isOpen }) => isOpen && "rgba (0,0,0,0.4)"};
`

const Main = styled.main`
    margin: 4em auto 4em auto;
    padding-bottom: 9em;

    @media (min-width: 780px) {
        margin: 6em auto 8em auto;
    }
`

const Layout = ({ children }) => {
    const { isOpen } = useContext(ThemeContext)

    return (
        <Div isOpen={isOpen}>
            <Navbar modalIsOpen={isOpen} />
            <Main>{children}</Main>
            <Footer isOpen={isOpen} />
        </Div>
    )
}

export default Layout

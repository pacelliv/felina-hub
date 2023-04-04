import { menuItems } from "./menuItems"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import ConnectButton from "./ConnectButton"
import { FaBars, FaTimes } from "react-icons/fa"
import { useState, useRef } from "react"
import SwitchChainButton from "./SwitchChainButton"

const Nav = styled.div`
    padding: 0.9em 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    z-index: 99;
    position: sticky;
    background-color: #1c1c1c;

    .navbar-logo {
        font-family: "Permanent Marker", cursive;
        font-weight: 600;
        letter-spacing: 2px;
        color: white;
        z-index: 20;
    }

    .navbar-list {
        display: flex;
        gap: 0 1.5em;
    }

    .link {
        position: relative;
    }

    .nav-links {
        font-size: 0.95rem;
        color: #c7c7c7;
        transition: all 0.4s ease;
        position: relative;
        padding: 1em;
    }

    .nav-links:hover {
        color: white;
    }

    .nav-active {
        color: white;
    }

    .nav-active::before {
        position: absolute;
        top: 52px;
        left: 0;
        content: "";
        height: 5px;
        width: 100%;
        background-color: #00ff19;
    }

    .close-menu,
    .navbar-icon {
        display: none;
        cursor: pointer;
        color: white;
    }

    .container {
        display: flex;
        gap: 7px;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 860px) {
        position: sticky;
        padding: 0.9em 0.5em;

        .close-menu,
        .navbar-icon {
            display: block;
            font-size: 2rem;
        }

        .close-menu {
            align-self: flex-end;
            color: white;
            position: absolute;
            top: 20px;
            right: 20px;
        }

        .list-container {
            width: 100%;
            background-color: #1c1c1c;
            position: absolute;
            top: 64px;
            left: 0;
            transition: all 0.4s ease;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            height: ${({ listContainerRef, isOpen }) =>
                isOpen ? listContainerRef.current.scrollHeight + "px" : "0px"};
        }

        .navbar-list {
            flex-direction: column;
            width: 100%;
        }

        .link {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .link:hover {
            background-color: #696969;
        }

        .nav-links {
            font-size: 1.1rem;
            width: 100%;
            display: flex;
            align-items: center;
            padding: 1em;
        }

        .nav-links:hover {
            padding-left: 2em;
        }

        .nav-active {
            color: #00ff19;
        }

        .nav-active:hover {
            color: #00ff19;
        }

        .nav-active::before {
            height: 0px;
        }

        .buttons-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
`

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const listContainerRef = useRef()
    const [dropdownNetwork, setDropdownNetwork] = useState(false)
    const router = useRouter()

    const handleClick = () => setIsOpen(!isOpen)

    return (
        <Nav isOpen={isOpen} listContainerRef={listContainerRef}>
            <Link href="/" className="navbar-logo">
                Felina Hub
            </Link>
            <div className="list-container" ref={listContainerRef}>
                <ul className="navbar-list">
                    {menuItems.map(({ title, url, cName }, index) => (
                        <div key={index} className="link">
                            <Link
                                href={url}
                                className={`${
                                    router.pathname === url
                                        ? `${cName} nav-active`
                                        : cName
                                }`}
                                onClick={handleClick}
                            >
                                {title}
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="container">
                <div className="buttons-container">
                    <ConnectButton />
                </div>
                <div className="buttons-container">
                    <SwitchChainButton
                        dropdownNetwork={dropdownNetwork}
                        setDropdownNetwork={setDropdownNetwork}
                    />
                </div>
                {isOpen ? (
                    <FaTimes className="navbar-icon" onClick={handleClick} />
                ) : (
                    <FaBars className="navbar-icon" onClick={handleClick} />
                )}
            </div>
        </Nav>
    )
}

export default Navbar

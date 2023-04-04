import Link from "next/link"
import styled from "styled-components"
import { FaGithub } from "react-icons/fa"
import { MdOutlineMail } from "react-icons/md"
import { SiTwitter } from "react-icons/si"

const Container = styled.div`
    padding: 1em 0.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #1c1c1c;
    color: white;
    position: absolute;
    bottom: 0;
    width: 100%;

    .footer-logo {
        color: white;
        font-family: "Permanent Marker", cursive;
        font-weight: 600;
        letter-spacing: 2px;
    }

    .social-media {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
    }

    .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        transition: all 0.5s ease;
    }

    .box:hover {
        color: white;
    }

    .icon {
        width: 25px;
        height: 25px;
    }

    .yellow {
        color: #ffbe0b;
    }

    .pink {
        color: #ff006e;
    }

    .lightblue {
        color: #3a86ff;
    }

    .app {
        font-size: 0.75rem;
    }

    @media (min-width: 680px) {
        padding: 1.5em 1em;
        margin-top: auto;

        .social-media {
            gap: 30px;
        }
    }
`

const Footer = () => {
    return (
        <Container className="footer">
            <Link href="/" className="footer-logo">
                By Pacelliv
            </Link>
            <div className="social-media">
                <a
                    href="https://github.com/pacelliv"
                    target="_blank"
                    className="github-link"
                >
                    <div className="box yellow">
                        <FaGithub className="icon" />
                        <p className="app">Github</p>
                    </div>
                </a>
                <a
                    href="https://twitter.com/pacelliv3"
                    target="_blank"
                    className="twitter-link"
                >
                    <div className="box pink">
                        <SiTwitter className="icon" />
                        <p className="app">Twitter</p>
                    </div>
                </a>
                <a
                    href="/mailto:flores.eugenio03@gmail.com"
                    target="_blank"
                    className="email-link"
                >
                    <div className="box lightblue">
                        <MdOutlineMail className="icon" />
                        <p className="app">Email</p>
                    </div>
                </a>
            </div>
        </Container>
    )
}

export default Footer

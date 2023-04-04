import { useContext } from "react"
import { Web3Context } from "../../Web3Context"
import styled from "styled-components"

const StyleBody = styled.tbody`
    border: none;
    overflow: auto;
`

const Row = styled.tr`
    border-bottom: 1px #e8e8e8 solid;
    transition: all 0.2s ease;

    :hover {
        background-color: whitesmoke;
    }

    :last-child {
        .td {
            border-bottom: 0;
        }
    }
`

const Cell = styled.td`
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 1em;
    letter-spacing: 0.5px;
    font-size: 0.88rem;
`

const Body = ({ getTableBodyProps, page, prepareRow }) => {
    const { chainId } = useContext(Web3Context)

    const baseUrl =
        chainId === 80001 ? "mumbai.polygonscan.com" : "sepolia.etherscan.io"

    return (
        <StyleBody {...getTableBodyProps()}>
            {page.map((row) => {
                prepareRow(row)
                return (
                    <Row {...row.getRowProps()}>
                        {row.cells.map((row) => {
                            if (row.column.id === "_value") {
                                return (
                                    <Cell {...row.getCellProps()}>
                                        {`${
                                            Number(row.value) % 1 != 0
                                                ? Number(row.value).toFixed(2)
                                                : Number(row.value)
                                        } FEL`}
                                    </Cell>
                                )
                            } else if (row.column.id === "transactionHash") {
                                return (
                                    <Cell {...row.getCellProps()}>
                                        <a
                                            href={`https://${baseUrl}/tx/${row.value}`}
                                            target="_blank"
                                            style={{ color: "#0077C6" }}
                                        >
                                            {row.value}
                                        </a>
                                    </Cell>
                                )
                            } else if (row.column.id === "_from") {
                                return (
                                    <Cell {...row.getCellProps()}>
                                        <a
                                            href={`https://${baseUrl}/${row.value}`}
                                            target="_blank"
                                            style={{ color: "#0077C6" }}
                                        >
                                            {row.value}
                                        </a>
                                    </Cell>
                                )
                            } else if (row.column.id === "_to") {
                                return (
                                    <Cell {...row.getCellProps()}>
                                        <a
                                            href={`https://${baseUrl}/address/${row.value}`}
                                            target="_blank"
                                            style={{ color: "#0077C6" }}
                                        >
                                            {row.value}
                                        </a>
                                    </Cell>
                                )
                            } else if (row.column.id === "blockNumber") {
                                return (
                                    <Cell {...row.getCellProps()}>
                                        <a
                                            href={`https://${baseUrl}/block/${row.value}`}
                                            target="_blank"
                                            style={{ color: "#0077C6" }}
                                        >
                                            {row.value}
                                        </a>
                                    </Cell>
                                )
                            }
                        })}
                    </Row>
                )
            })}
        </StyleBody>
    )
}

export default Body

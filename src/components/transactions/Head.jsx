import styled from "styled-components"

const StyleHead = styled.thead`
    border-bottom: 1px #e8e8e8 solid;
    color: #1c1c1c;

    tr {
        padding: 1em 0;
    }

    th {
        text-align: left;
        padding: 0 1em;
    }
`

const Head = ({ headerGroups }) => {
    return (
        <StyleHead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                        </th>
                    ))}
                </tr>
            ))}
        </StyleHead>
    )
}
export default Head

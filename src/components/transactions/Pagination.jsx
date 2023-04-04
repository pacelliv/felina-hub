import styled from "styled-components"

const StylePagination = styled.div`
    margin: 5px auto 0em auto;
    padding: 1em 1.2em 1.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3px;
    font-size: 0.7rem;
`

const Div = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    .span {
        color: #606060;
        font-weight: 500;
        font-size: 0.75rem;
    }
    select {
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        padding: 0.1em;
    }
`

const Button = styled.button`
    background-color: #e1e6fd;
    border: none;
    color: #606060;
    font-family: inherit;
    font-weight: 500;
    padding: 0.5em 0.7em;
    font-size: inherit;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;

    :hover:not([disabled]) {
        color: white;
        background-color: #3498db;
    }

    :disabled {
        cursor: default;
    }
`

const Span = styled.span`
    background-color: #e1e6fd;
    padding: 0.5em 0.7em;
    border-radius: 5px;
    border: none;
    color: #606060;
    transition: all 0.3s ease;
`

const Pagination = ({
    gotoPage,
    previousPage,
    nextPage,
    pageIndex,
    pageOptions,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageSize,
    setPageSize,
}) => {
    return (
        <StylePagination>
            <Div>
                <span className="span">Show:</span>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    {[10, 25, 50, 100].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
                <span className="span">Records</span>
            </Div>

            <Div>
                <Button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    style={{ opacity: !canPreviousPage && "0.5" }}
                >
                    {"<<"}
                </Button>
                <Button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    style={{ opacity: !canPreviousPage && "0.5" }}
                >
                    Previous
                </Button>
                <Span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </Span>
                <Button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    style={{ opacity: !canNextPage && "0.5" }}
                >
                    Next
                </Button>
                <Button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    style={{ opacity: !canNextPage && "0.5" }}
                >
                    {">>"}
                </Button>
            </Div>
        </StylePagination>
    )
}

export default Pagination

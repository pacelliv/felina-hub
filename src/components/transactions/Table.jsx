import { useMemo } from "react"
import {
    useTable,
    useResizeColumns,
    useFlexLayout,
    usePagination,
} from "react-table"
import { COLUMNS } from "./columns"
import Head from "./Head"
import Body from "./Body"
import Pagination from "./Pagination"
import styled from "styled-components"

const Container = styled.div`
    border: solid 1px transparent;
    border-radius: 10px;
    box-shadow: 0px 0px 5px -1px gray;

    & {
        scrollbar-width: thin;
    }

    ::-webkit-scrollbar {
        width: 12px;
        position: absolute;
        bottom: 10px;
    }

    ::-webkit-scrollbar-track {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        width: 90%;
        padding: 0.2em;
        heght: 1px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
        height: 1px;
    }
`

const Header = styled.div`
    padding: 1em;

    h1 {
        font-size: 0.9rem;
        font-weight: 400;
    }
`

const TableComponent = styled.table`
    width: inherit;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    font-size: 0.83rem;
    margin-bottom: 0;

    & {
        scrollbar-width: thin;
    }

    ::-webkit-scrollbar {
        width: 12px;
        position: absolute;
        bottom: 10px;
    }

    ::-webkit-scrollbar-track {
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        width: 90%;
        padding: 0.2em;
        heght: 1px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
        height: 1px;
    }
`

const Table = (props) => {
    const defaultColumn = useMemo(
        () => ({
            minWidth: 30,
            maxWidth: 150,
        }),
        []
    )

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.logs, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: { pageSize: 25 },
        },
        useFlexLayout,
        useResizeColumns,
        usePagination
    )

    const { pageIndex, pageSize } = state

    return (
        <Container>
            <Header>
                <h1>Showing the {data.length} latests transactions</h1>
            </Header>
            <Pagination
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            <TableComponent {...getTableProps()}>
                <Head headerGroups={headerGroups} />
                <Body
                    getTableBodyProps={getTableBodyProps}
                    page={page}
                    prepareRow={prepareRow}
                />
            </TableComponent>
            <Pagination
                gotoPage={gotoPage}
                previousPage={previousPage}
                nextPage={nextPage}
                pageIndex={pageIndex}
                pageOptions={pageOptions}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </Container>
    )
}

export default Table

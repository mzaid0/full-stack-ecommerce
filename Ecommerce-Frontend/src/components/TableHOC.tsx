import { useTable, Column, TableOptions, useSortBy, usePagination } from "react-table";
// import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 7,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      pageCount,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      state: { pageIndex },
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className="w-full">
        <h2 className="tracking-wider text-xl py-2 font-light text-center">
          {heading}
        </h2>
        <table
          {...getTableProps()}
          className="w-full bg-white rounded-lg mb-4 overflow-x-auto"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column: any) => (
                  <th
                    className="px-6 py-3 tracking-wider font-light"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={column.id}
                  >
                    {column.render("Header")}
                    {/* {
                      column.isSorted && <span>{column.isSortedDesc ? <HiArrowSmUp/>:<HiArrowSmDown/>}</span>
                    } */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="shadow-md" {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td
                      className="px-6 py-2 text-sm text-center"
                      {...cell.getCellProps()}
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {showPagination && (
          <div className="flex items-center gap-4 text-sm justify-center">
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded-2xl disabled:text-gray-400"
              disabled={!canPreviousPage}
              onClick={previousPage}
            >
              Prev
            </button>
            <span>
              {pageIndex + 1} page of {pageCount}
            </span>
            <button
              className="px-3 py-1 text-sm bg-gray-200 rounded-2xl disabled:text-gray-400"
              disabled={!canNextPage}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;

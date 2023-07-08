import { useState, useMemo, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { Button, PageButton } from "./PaginationButtons";
import BooleanDisplay from "./BooleanDisplay";
import Filter from "./Filter";

import CellCommunity from "./CellCommunity";
import CellDefault from "./CellDefault";
import CellNumber from "./CellNumber";

function Table() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [loading, setLoading] = useState(true);

  const nameSort = (rowA, rowB) => {
    let dir = 1;
    // Sort alphabetically by name
    dir = rowA.original.community.name > rowB.original.community.name ? 1 : -1;
    return dir;
  };

  // Custom filter for name column
  const nameFilter = (row, columnId, value) => {
    let content = row.getValue(columnId);

    // If content.title contains value, it's a match
    if (content.name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }

    if (content.title.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    return false;
  };

  // Custom filter for nsfw column
  const nsfwFilter = (row, columnId, value) => {
    return row.getValue(columnId).toString() === value;
  };

  // Custom formatting for numbers
  function numberWithCommas(x) {
    // RegEx for number formatting? Browser compatibility issues -> https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const columns = useMemo(
    () => [
      {
        header: "Communities",
        footer: (props) => props.column.id,
        columns: [
          {
            id: "name",
            header: () => "Name",
            accessorKey: "id",
            accessorFn: (row) => row.community,
            cell: (info) => <CellCommunity community={info.getValue()} />,
            footer: (props) => props.column.id,
            sortingFn: nameSort,
            filterFn: nameFilter,
          },
          {
            id: "actor_id",
            header: () => "URL",
            accessorFn: (row) => row.community.actor_id,
            cell: (info) => <CellDefault value={info.getValue()} />,
            footer: (props) => props.column.id,
          },
          {
            id: "nsfw",
            header: () => "NSFW",
            accessorFn: (row) => row.community.nsfw,
            cell: (info) => <BooleanDisplay value={info.getValue()} />,
            footer: (props) => props.column.id,
            filterFn: nsfwFilter,
            sortType: "basic",
            /*
            enableColumnFilter: false,
            */
          },
        ],
      },
      {
        header: "Statistics",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "subscribers",
            accessorFn: (row) => row.counts.subscribers,
            header: () => "Subscribers",
            cell: (info) => (
              <CellNumber value={numberWithCommas(info.getValue())} />
            ),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "posts",
            accessorFn: (row) => row.counts.posts,
            header: () => "Posts",
            cell: (info) => (
              <CellNumber value={numberWithCommas(info.getValue())} />
            ),
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "comments",
            accessorFn: (row) => row.counts.comments,
            header: () => "Comments",
            cell: (info) => (
              <CellNumber value={numberWithCommas(info.getValue())} />
            ),
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  const fetchData = async (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  // Load data on mount
  useEffect(() => {
    fetchData("./communities.json");
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <>
      {/* table */}
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {loading && (
                <div className="text-center p-20 text-gray-900">
                  <ArrowPathIcon
                    className="animate-spin h-5 w-5 mr-2 inline-block text-gray-500"
                    aria-hidden="true"
                  />
                  Loading communities...
                </div>
              )}

              {!loading && (
                <>
                  <table className="min-w-full divide-y divide-gray-200 border-b border-gray-200">
                    <thead className="bg-gray-50">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <th
                                key={header.id}
                                colSpan={header.colSpan}
                                {...{
                                  className:
                                    header.column.id === "name"
                                      ? "w-2/5 px-3 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                      : "px-3 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                }}
                              >
                                {header.isPlaceholder ? null : (
                                  <div
                                    {...{
                                      className: header.column.getCanSort()
                                        ? "cursor-pointer select-none"
                                        : "font-bold tracking-widest",
                                      onClick:
                                        header.column.getToggleSortingHandler(),
                                    }}
                                  >
                                    <span>
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                    </span>
                                    {{
                                      asc: (
                                        <span className="inline-flex self-auto">
                                          <ChevronDoubleDownIcon
                                            className="ml-1 h-3 w-3 inline-block text-red-500"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ),
                                      desc: (
                                        <span className="inline-flex self-auto">
                                          <ChevronDoubleUpIcon
                                            className="ml-1 h-3 w-3 inline-block text-green-500"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ),
                                    }[header.column.getIsSorted()] ?? null}
                                  </div>
                                )}
                                {header.column.getCanFilter() ? (
                                  <div className="py-2">
                                    <Filter
                                      column={header.column}
                                      table={table}
                                    />
                                  </div>
                                ) : null}
                              </th>
                            );
                          })}
                        </tr>
                      ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {table.getRowModel().rows.map((row) => {
                        return (
                          <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => {
                              if (cell.column.id === "name") {
                                return (
                                  <td key={cell.id} className="px-3 py-2">
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </td>
                                );
                              } else
                                return (
                                  <td
                                    key={cell.id}
                                    className="px-6 py-2 whitespace-pre-wrap"
                                  >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </td>
                                );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="px-3 py-2 flex items-center justify-between">
                    <div className="flex-1 flex justify-between sm:hidden ">
                      <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.canPreviousPage}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.canNextPage}
                      >
                        Next
                      </Button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="flex gap-x-2 min-w-min whitespace-nowrap place-items-center">
                        <p className="mt-1 text-sm text-gray-700">
                          Page{" "}
                          <span className="font-medium">
                            {table.getState().pagination.pageIndex + 1}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium">
                            {table.getPageCount()}
                          </span>
                        </p>
                        <select
                          value={table.getState().pagination.pageSize}
                          onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                          }}
                          className="block text-gray-700 text-sm w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                              Show {pageSize}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <nav
                          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                          aria-label="Pagination"
                        >
                          <PageButton
                            className="rounded-l-md"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                          >
                            <span className="sr-only">First</span>
                            <ChevronDoubleLeftIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </PageButton>
                          <PageButton
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </PageButton>
                          <PageButton
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </PageButton>
                          <PageButton
                            className="rounded-r-md"
                            onClick={() =>
                              table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                          >
                            <span className="sr-only">Last</span>
                            <ChevronDoubleRightIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </PageButton>
                        </nav>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/* ---Pagination */}
            </div>
          </div>
        </div>
      </div>
      {/* Pagination */}
    </>
  );
}

export default Table;

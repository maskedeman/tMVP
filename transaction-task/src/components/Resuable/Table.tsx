import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  flexRender,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import TableFooter from "./TableFooter";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { BiSort } from "react-icons/bi";
import { VscLoading } from "react-icons/vsc";
import { FcEmptyTrash } from "react-icons/fc";

interface Props<T extends { idx: string }> {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading: boolean;
  isError: boolean;
  pageChangeHandler?: (selected: number) => void;
  className?: string;
  totalEntries: number | undefined;
  allowRow?: boolean;
  showFooter?: boolean;
  containsActions?: boolean;
  pageSize?: number;
  currentPage?: number;
}

export default function Table<T extends { idx: string }>({
  data,
  columns,
  isLoading,
  isError,
  totalEntries,
  pageChangeHandler = () => {},
  allowRow = false,
  showFooter = false,
  containsActions = false,
  pageSize=25 ,
  currentPage = 1,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    enableSorting: !isError,
    manualPagination: true,
    state: { sorting, rowSelection },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="px-1 overflow-x-auto">
      {!isLoading && !isError && totalEntries && showFooter ? (
        <TableFooter
          totalEntries={totalEntries}
          pageSize={pageSize}
          pageChangeHandler={pageChangeHandler}
          currentPage={currentPage}
        />
      ) : null}
      <div className="w-full">
      <table className="w-full min-w-max mt-2 text-center"> 
  <thead className="sticky top-0 z-10 border-b bg-white">
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            className={`group text-[12px] py-2 text-start font-semibold last:pr-4 ${
              header.column.getCanSort()
                ? "cursor-pointer select-none"
                : ""
            } ${containsActions ? "last:w-1" : ""}`}
            onClick={header.column.getToggleSortingHandler()}
            style={{
              width: header.getSize(),
            }}
          >
            <div className="flex items-center whitespace-nowrap justify-between font-bold text-base">
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
              <div className="flex items-center gap-x-2">
                {{
                  asc: <ChevronUpIcon className="h-5 text-primary" />,
                  desc: (
                    <ChevronDownIcon className="h-5 text-primary" />
                  ),
                }[header.column.getIsSorted() as string] ??
                  (header.column.getCanSort() ? (
                    <BiSort className="invisible h-5 group-hover:visible" />
                  ) : null)}
              </div>
            </div>
          </th>
        ))}
      </tr>
    ))}
  </thead>
  <tbody className="text-center">
    {table.getRowModel().rows.map((row) => (
      <tr
        key={row.id}
        className={`border-y border-primaryHover ${
          row.getIsSelected()
            ? "bg-primarySelect"
            : allowRow
            ? "hover:bg-primaryHover"
            : ""
        } ${allowRow ? "cursor-pointer" : "cursor-default"}`}
        onClick={() => {
          allowRow &&
            navigate(row?.original?.idx, { state: row?.original });
        }}
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className={`py-1 text-gray-600 font-normal last:pr-4 text-center`}
          >
            <span className="flex items-center">
              {flexRender(
                cell.column.columnDef.cell,
                cell.getContext()
              )}
            </span>
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
      </div>

      {isLoading ? (
        <VscLoading className="animate-spin h-8 w-8 text-primary mx-auto mt-12" />
      ) : isError ? (
        <div className="mt-12 flex flex-col items-center gap-4">
          <span className="font-medium">
            An error occurred while fetching data
          </span>
        </div>
      ) : totalEntries === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-4">
          <FcEmptyTrash className="h-12 w-12 text-primary" />
          <span className="font-medium">No data available for this table</span>
        </div>
      ) : null}
    </div>
  );
}

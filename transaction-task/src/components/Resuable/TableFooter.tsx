import Pagination from "./Pagination";

interface Props {
  totalEntries: number;
  pageSize: number;
  pageChangeHandler: (selected: number) => void;
  currentPage?: number;
}

export default function TableFooter({
  totalEntries,
  pageSize,
  pageChangeHandler,
  currentPage = 1,
}: Props) {
  const totalPageCount = Math.ceil(totalEntries / pageSize);

  const handlePageChange = (selected: number) => {
    pageChangeHandler(selected);
  };

  return (
    <div className="flex items-center justify-between pt-4 text-sm font-medium">
      <span className="text-grayText text-xs">
        Showing {(currentPage - 1) * pageSize + 1} to{" "}
        {Math.min(pageSize * currentPage, totalEntries)} of {totalEntries}{" "}
        Entries
      </span>

      <div className="flex items-center gap-4">
        <Pagination
          totalPageCount={totalPageCount}
          pageChangeHandler={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}


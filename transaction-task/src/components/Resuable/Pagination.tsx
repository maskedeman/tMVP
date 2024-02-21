import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

interface Props {
  totalPageCount: number;
  currentPage: number;
  pageChangeHandler: (selected: number) => void;
}

export default function Pagination({
  totalPageCount,
  currentPage,
  pageChangeHandler,
}: Props) {
  return (
    <div className="flex gap-1 text-[15px] font-medium">
      <button
        onClick={() => {
          if (currentPage > 1) {
            pageChangeHandler(currentPage - 1);
          }
        }}
        disabled={currentPage === 1}
        className="rounded w-6 h-6 flex items-center justify-center hover:bg-primaryHover"
      >
        <ChevronLeftIcon className="h-4" />
      </button>
      <span className="rounded w-6 h-6 flex items-center justify-center">
        {currentPage}
      </span>
      <button
        onClick={() => {
          if (currentPage < totalPageCount) {
            pageChangeHandler(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPageCount}
        className="rounded w-6 h-6 flex items-center justify-center hover:bg-primaryHover"
      >
        <ChevronRightIcon className="h-4" />
      </button>
    </div>
  );
}

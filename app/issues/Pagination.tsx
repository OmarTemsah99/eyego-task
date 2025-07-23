import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  perPage,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, total);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always include first page
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Complex pagination logic
      for (
        let i = Math.max(2, page - delta);
        i <= Math.min(totalPages - 1, page + delta);
        i++
      ) {
        range.push(i);
      }

      if (page - delta > 2) {
        rangeWithDots.push(1, "...");
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (page + delta < totalPages - 1) {
        rangeWithDots.push("...", totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return totalPages <= 7 ? range : rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4">
        {/* Results info */}
        <div className="text-slate-400 text-sm">
          Showing{" "}
          <span className="font-medium text-slate-200">{startItem}</span> to{" "}
          <span className="font-medium text-slate-200">{endItem}</span> of{" "}
          <span className="font-medium text-slate-200">{total}</span> results
        </div>

        {/* Pagination controls */}
        <div className="flex items-center space-x-1">
          {/* Previous button */}
          <button
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            className="inline-flex items-center px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-300 
                     bg-slate-700 border border-slate-600 rounded-lg
                     hover:bg-slate-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700 
                     transition-all duration-200">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          {/* Page numbers */}
          <div className="hidden sm:flex items-center space-x-1">
            {getPageNumbers().map((pageNum, index) => (
              <React.Fragment key={index}>
                {pageNum === "..." ? (
                  <span className="px-3 py-2 text-slate-500">...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(pageNum as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                              ${
                                page === pageNum
                                  ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                                  : "text-slate-300 bg-slate-700 border-slate-600 hover:bg-slate-600 hover:text-white"
                              } border focus:z-10 focus:ring-2 focus:ring-blue-500`}>
                    {pageNum}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile page indicator */}
          <div className="sm:hidden px-2.5 py-1.5 text-xs text-slate-300 bg-slate-700 rounded-lg border border-slate-600">
            {page} of {totalPages}
          </div>

          {/* Next button */}
          <button
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
            className="inline-flex items-center px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-300 
                     bg-slate-700 border border-slate-600 rounded-lg
                     hover:bg-slate-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-700 
                     transition-all duration-200">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

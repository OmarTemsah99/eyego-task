import React from "react";

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
  return (
    <div className="mt-4 flex justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50">
        Prev
      </button>
      <span className="text-white">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50">
        Next
      </button>
    </div>
  );
}

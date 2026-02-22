import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { IMetaPagination } from "@/shared/interfaces/response/IMetaPagination";

export function SimplePagination({
  total,
  currentPage,
  next,
  perPage,
  prev,
}: IMetaPagination) {
  const totalPages = Math.ceil(total / perPage);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setSearchParams({ page: newPage.toString(), search });
      }
    },
    [totalPages, setSearchParams, search]
  );

  const getDisplayedPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const displayedPages = useMemo(getDisplayedPages, [totalPages, currentPage]);

  return (
    <Pagination id="pagination" data-testid="pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            id="pagination-prev"
            title="Anterior"
            onClick={() => prev && handlePageChange(currentPage - 1)}
            aria-disabled={!prev}
            className={!prev ? "opacity-50 cursor-not-allowed" : ""}
            data-testid="pagination-prev"
          />
        </PaginationItem>

        {displayedPages.map((page, idx) => (
          <PaginationItem key={idx}>
            {page === "..." ? (
              <span className="px-2 select-none">...</span>
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageChange(page as number)}
                data-testid={`pagination-page-${page}`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            id="pagination-next"
            aria-label="Próximo"
            onClick={() => next && handlePageChange(currentPage + 1)}
            aria-disabled={!next}
            className={!next ? "opacity-50 cursor-not-allowed" : ""}
            data-testid="pagination-next"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

import Link from "next/link";

type PaginationProps = {
  page: number;
  totalPages: number;
  baseUrl: string;
};

const Pagination = ({ page, totalPages, baseUrl }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`${baseUrl}?page=${page - 1}`}
          className="px-4 text-lg  text-gray-600 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}

      {pages.map((currentPage) => (
        <Link
          key={currentPage}
          href={`${baseUrl}?page=${currentPage}`}
          className={`${
            page === currentPage && "font-black bg-violet-600 text-white"
          } px-4 text-lg  text-gray-600 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
        >
          {currentPage}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          href={`${baseUrl}?page=${page + 1}`}
          className="px-4 text-lg  text-gray-600 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
};

export default Pagination;

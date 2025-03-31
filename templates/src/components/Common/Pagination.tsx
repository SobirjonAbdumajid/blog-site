
import React from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  if (totalPages <= 1) return null;
  
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  
  return (
    <div className="flex justify-center mt-8">
      <div className="flex space-x-1">
        {/* Previous page */}
        {currentPage > 1 && (
          <Link
            to={`${baseUrl}/${currentPage - 1}`}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Previous
          </Link>
        )}
        
        {/* First page if not in range */}
        {startPage > 1 && (
          <>
            <Link
              to={`${baseUrl}/1`}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              1
            </Link>
            {startPage > 2 && (
              <span className="px-4 py-2">...</span>
            )}
          </>
        )}
        
        {/* Page numbers */}
        {pages.map(page => (
          <Link
            key={page}
            to={`${baseUrl}/${page}`}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? 'bg-gray-800 text-white'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        ))}
        
        {/* Last page if not in range */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-4 py-2">...</span>
            )}
            <Link
              to={`${baseUrl}/${totalPages}`}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              {totalPages}
            </Link>
          </>
        )}
        
        {/* Next page */}
        {currentPage < totalPages && (
          <Link
            to={`${baseUrl}/${currentPage + 1}`}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;

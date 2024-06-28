import React from 'react';
import ReactPaginate from 'react-paginate';
import { Box } from '@chakra-ui/react';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import './Pagination.css';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <Box mt={4}>
      <ReactPaginate
        previousLabel={<MdArrowBackIos />}
        nextLabel={<MdArrowForwardIos />}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        disabledClassName={'disabled'}
        breakLinkClassName={'break-me'}
      />
    </Box>
  );
};

export default Pagination;

import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import TransactionItem from './TransactionItem';
import Pagination from './Pagination/Pagination';
import { Transaction } from '../db/database';

interface TransactionListProps {
  transactions: Transaction[];
  searchQuery: string;
  filters: { status: string; type: string };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete, searchQuery, filters }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 10;

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesStatus = !filters.status || transaction.status === filters.status;
    const matchesType = !filters.type || transaction.type === filters.type;
    const matchesSearchQuery = !searchQuery || transaction.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearchQuery;
  });

  const displayedTransactions = filteredTransactions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <Box>
      <Table mt={4} variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th width='16%'>Status</Th>
            <Th width='16%'>Type</Th>
            <Th>Client Name</Th>
            <Th width='15%'>Amount</Th>
            <Th width='12%'>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayedTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </Tbody>
      </Table>
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </Box>
  );
};

export default TransactionList;

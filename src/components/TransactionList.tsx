import React, { useEffect, useRef } from 'react';
import { Table, Thead, Tbody, Tr, Th, Text, VStack, useToast, Flex } from '@chakra-ui/react';
import TransactionItem from './TransactionItem';
import Pagination from './Pagination/Pagination';
import { Transaction } from '../db/database';

interface TransactionListProps {
  transactions: Transaction[];
  searchQuery: string;
  filters: { status: string; type: string };
  onEdit: (id: number, updatedTransaction: Partial<Transaction>) => void;
  onDelete: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete, searchQuery, filters }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemsPerPage = 10;
  const toast = useToast();
  const toastShown = useRef(false);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesStatus = !filters.status || transaction.status === filters.status;
    const matchesType = !filters.type || transaction.type === filters.type;
    const matchesSearchQuery = !searchQuery || transaction.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearchQuery;
  });

  const displayedTransactions = filteredTransactions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  useEffect(() => {
      if (filteredTransactions.length === 0 && !toastShown.current) {
        toast({
          title: 'No results found',
          description: 'Please try again with a different search',
          status: 'warning',
          duration: 2000,
          isClosable: true,
        });
        toastShown.current = true;
      } else if (filteredTransactions.length > 0) {
        toastShown.current = false;
      }
    }, [filteredTransactions, toast]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <Flex direction='column' justifyContent='space-between' h='77vh'>
      {filteredTransactions.length === 0 ? (
        <VStack spacing={4} mt={4}>
          <Text fontSize="lg" color="gray.500">No results found</Text>
        </VStack>
      ) : (
        <>
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
        </>
      )}
    </Flex>
  );
};

export default TransactionList;

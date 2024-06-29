import React, { useState, useEffect } from 'react';
import { VStack, Button, Flex } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { initDatabase, getTransactions, Transaction, addTransactions, updateTransaction, deleteTransaction } from '../db/database';
import TransactionList from '../components/TransactionList';
import ImportModal from '../components/ImportModal';
import TransactionBar from '../components/TransactionBar';
import ExportCsv from '../components/ExportCsv';
import { IoReturnUpBackSharp } from "react-icons/io5";

const Home: React.FC = () => {
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ status: '', type: '' });
  const [isExportMode, setIsExportMode] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const initDB = async () => {
      await initDatabase();
    };
    initDB();
  }, []);

  const { data: transactions = [] } = useQuery<Transaction[]>('transactions', getTransactions);

  const importMutation = useMutation(addTransactions, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
    },
  });

  const editMutation = useMutation(updateTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
    },
  });

  const deleteMutation = useMutation(deleteTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions');
    },
  });

  const handleImport = async (importedTransactions: Transaction[]) => {
    importMutation.mutate(importedTransactions);
  };

  const handleEdit = async (id: number, updatedTransaction: Partial<Transaction>) => {
    const existingTransaction = transactions.find(transaction => transaction.id === id);

    if (!existingTransaction) {
      throw new Error('Transaction not found');
    }

    const transactionToUpdate: Transaction = {
      ...existingTransaction,
      ...updatedTransaction
    };

    editMutation.mutate(transactionToUpdate);
  };

  const handleDelete = async (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleExport = () => {
    setIsExportMode(true);
  };

  const handleBack = () => {
    setIsExportMode(false);
  };

  return (
    <VStack spacing={4} align="stretch">
      {isExportMode ? (
        <Flex justify="space-between" wrap="wrap" mb={4} align="center">
          <Button onClick={handleBack} colorScheme="teal" variant="outline" leftIcon={<IoReturnUpBackSharp size={20}/>}>
            Back
          </Button>
          <Button onClick={() => setIsExportMode(true)} colorScheme="teal" variant="outline">
            Export
          </Button>
        </Flex>
      ) : (
        <TransactionBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          onImportClick={() => setImportModalOpen(true)}
          onExportClick={handleExport}
        />
      )}
      {isExportMode ? (
        <ExportCsv onBackClick={handleBack} transactions={transactions} />
      ) : (
        <>
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchQuery={searchQuery}
            filters={filters}
          />
          <ImportModal
            onImport={handleImport}
            isOpen={isImportModalOpen}
            onRequestClose={() => setImportModalOpen(false)}
          />
        </>
      )}
    </VStack>
  );
};

export default Home;

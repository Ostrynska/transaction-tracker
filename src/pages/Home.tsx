import React, { useState, useEffect } from 'react';
import { VStack } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { initDatabase, getTransactions, Transaction, addTransactions, updateTransaction, deleteTransaction } from '../db/database';
import TransactionList from '../components/TransactionList';
import ImportModal from '../components/ImportModal';
import TransactionBar from '../components/TransactionBar';
import ExportCsv from "../components/ExportCsv";

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
    editMutation.mutate({ id, ...updatedTransaction });
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
    <>
      <VStack spacing={4} align="stretch">
        <TransactionBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          onImportClick={() => setImportModalOpen(true)}
          onExportClick={handleExport}
        />
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
    </>
  );
};

export default Home;
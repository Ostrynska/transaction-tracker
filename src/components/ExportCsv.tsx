import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, Checkbox, FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td, Stack } from '@chakra-ui/react';
import Papa from 'papaparse';
import { Transaction } from '../db/database';
import Pagination from './Pagination/Pagination';

interface ExportCSVProps {
  transactions: Transaction[];
  onBackClick: () => void;
}

interface ExportFormInputs {
  id: boolean;
  status: boolean;
  type: boolean;
  clientName: boolean;
  amount: boolean;
}

const ExportCsv: React.FC<ExportCSVProps> = ({ transactions, onBackClick }) => {
  const { register, handleSubmit, watch } = useForm<ExportFormInputs>({
    defaultValues: {
      id: true,
      status: true,
      type: true,
      clientName: true,
      amount: true,
    },
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 10;
  const selectedColumns = watch();

  const onExportSubmit: SubmitHandler<ExportFormInputs> = (data) => {
    const columnsToExport = Object.keys(data).filter(key => data[key as keyof ExportFormInputs]);
    const filteredData = transactions
      .filter(transaction => selectedRows.includes(transaction.id))
      .map(transaction =>
        columnsToExport.reduce((obj, key) => {
          obj[key] = transaction[key as keyof Transaction];
          return obj;
        }, {} as Record<string, unknown>)
      );

    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleRowSelect = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const currentDisplayedIds = displayedTransactions.map(transaction => transaction.id);
      setSelectedRows(prev => [...new Set([...prev, ...currentDisplayedIds])]);
    } else {
      const currentDisplayedIds = displayedTransactions.map(transaction => transaction.id);
      setSelectedRows(prev => prev.filter(rowId => !currentDisplayedIds.includes(rowId)));
    }
  };

  const filteredTransactions = transactions;
  const displayedTransactions = filteredTransactions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <Box>
      <Button onClick={onBackClick} mb={4} colorScheme="teal" variant="outline">
        Back
      </Button>
      <form onSubmit={handleSubmit(onExportSubmit)}>
        <FormControl as="fieldset">
          <FormLabel as="legend">Select columns to export:</FormLabel>
          <Stack spacing={2} direction="row">
            <Checkbox {...register('id')}>ID</Checkbox>
            <Checkbox {...register('status')}>Status</Checkbox>
            <Checkbox {...register('type')}>Transaction Type</Checkbox>
            <Checkbox {...register('clientName')}>Client Name</Checkbox>
            <Checkbox {...register('amount')}>Amount</Checkbox>
          </Stack>
          <Button type="submit" colorScheme="green" mt={4}>Export</Button>
        </FormControl>
      </form>

      <Table mt={4} variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>
              <Checkbox isChecked={selectAll} onChange={handleSelectAll} />
            </Th>
            {selectedColumns.id && <Th>ID</Th>}
            {selectedColumns.status && <Th>Status</Th>}
            {selectedColumns.type && <Th>Type</Th>}
            {selectedColumns.clientName && <Th>Client Name</Th>}
            {selectedColumns.amount && <Th>Amount</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {displayedTransactions.map(transaction => (
            <Tr key={transaction.id}>
              <Td>
                <Checkbox
                  isChecked={selectedRows.includes(transaction.id)}
                  onChange={() => handleRowSelect(transaction.id)}
                />
              </Td>
              {selectedColumns.id && <Td>{transaction.id}</Td>}
              {selectedColumns.status && <Td>{transaction.status}</Td>}
              {selectedColumns.type && <Td>{transaction.type}</Td>}
              {selectedColumns.clientName && <Td>{transaction.clientName}</Td>}
              {selectedColumns.amount && <Td>{transaction.amount}</Td>}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </Box>
  );
};

export default ExportCsv;

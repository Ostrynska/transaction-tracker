import React from 'react';
import { Box, Flex, Input, Select, Button, useBreakpointValue, InputGroup, InputLeftElement, IconButton } from '@chakra-ui/react';
import { MdOutlineSearch } from "react-icons/md";
import { LuRefreshCcw } from "react-icons/lu";

interface TransactionBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: { status: string; type: string };
  setFilters: (filters: { status: string; type: string }) => void;
  onImportClick: () => void;
  onExportClick: () => void;
}

const TransactionBar: React.FC<TransactionBarProps> = ({ searchQuery, setSearchQuery, filters, setFilters, onImportClick, onExportClick }) => {
  const inputSize = useBreakpointValue({ base: 'sm', md: 'md' });

  const handleRefresh = () => {
    setSearchQuery('');
    setFilters({ status: '', type: '' });
  };

  return (
    <Flex justify="space-between" wrap="wrap" mb='48px' align="center">
      <Box>
        <Flex flex="1" justify="space-between" align="center">
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <MdOutlineSearch color='teal' size={24}/>
            </InputLeftElement>
            <Input
              placeholder="Search Clients"
              color='teal'
              _placeholder={{ color: 'inherit' }}
              variant='filled'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size={inputSize}
              w="240px"
              mr={2}
            />
          </InputGroup>

          <Select
            placeholder="Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            size={inputSize}
            maxW="140px"
            mr={2}
            borderColor='teal'
            color='teal'
            _placeholder={{ color: 'inherit' }}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
          <Select
            placeholder="Type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            size={inputSize}
            maxW="140px"
            borderColor='teal'
            color='teal'
            _placeholder={{ color: 'inherit' }}
          >
            <option value="Refill">Refill</option>
            <option value="Withdrawal">Withdrawal</option>
          </Select>
          <IconButton
            icon={<LuRefreshCcw />}
            size={inputSize}
            onClick={handleRefresh}
            aria-label="Refresh"
            colorScheme='teal'
            variant='outline'
            ml={2}
          />
        </Flex>
      </Box>
      <Box>
        <Button size={inputSize} onClick={onImportClick} mr={2} colorScheme='teal' variant='outline'>
          Import
        </Button>
        <Button size={inputSize} onClick={onExportClick} colorScheme='teal' variant='outline'>
          Export
        </Button>
      </Box>
    </Flex>
  );
};

export default TransactionBar;

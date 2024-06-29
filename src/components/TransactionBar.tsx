import React from 'react';
import {
  Box,
  Flex,
  Input,
  Select,
  Button,
  useBreakpointValue,
  InputGroup,
  InputLeftElement,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
} from '@chakra-ui/react';
import { MdOutlineSearch } from 'react-icons/md';
import { LuRefreshCcw } from 'react-icons/lu';

interface TransactionBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: { status: string; type: string; amountRange: [number, number] };
  setFilters: (filters: { status: string; type: string; amountRange: [number, number] }) => void;
  onImportClick: () => void;
  onExportClick: () => void;
  onRefreshClick: () => void;
}

const TransactionBar: React.FC<TransactionBarProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  onImportClick,
  onExportClick,
  onRefreshClick,
}) => {
  const inputSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Flex justify="space-between" wrap="wrap" mb="48px" align="center">
      <Box>
        <Flex flex="1" justify="space-between" align="center">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdOutlineSearch color="teal" size={24} />
            </InputLeftElement>
            <Input
              placeholder="Search Clients"
              color="teal"
              _placeholder={{ color: 'inherit' }}
              variant="filled"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size={inputSize}
              w="240px"
              mr={2}
            />
          </InputGroup>
        <Button onClick={onRefreshClick} mr={2} colorScheme="teal" variant="solid">
            <LuRefreshCcw size={40} />
        </Button>
          <Select
            placeholder="Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            size={inputSize}
            maxW="140px"
            mr={2}
            borderColor="teal"
            color="teal"
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
            borderColor="teal"
            color="teal"
            _placeholder={{ color: 'inherit' }}
          >
            <option value="Refill">Refill</option>
            <option value="Withdrawal">Withdrawal</option>
          </Select>
          <Flex flexDirection="column" ml={6}>
            <Text fontSize="sm" color="teal">Amount</Text>
            <RangeSlider
              defaultValue={[0, 100]}
              min={0}
              max={100}
              step={10} width='100px'
              onChangeEnd={(val) => setFilters({ ...filters, amountRange: val as [number, number] })}
              size={inputSize}
            >
              <RangeSliderTrack bg="teal.100" >
                <RangeSliderFilledTrack bg="teal" />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={4} index={0} />
              <RangeSliderThumb boxSize={4} index={1} />
            </RangeSlider>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Button size={inputSize} onClick={onImportClick} mr={2} colorScheme="teal" variant="outline">
          Import
        </Button>
        <Button size={inputSize} onClick={onExportClick} colorScheme="teal" variant="outline">
          Export
        </Button>
      </Box>
    </Flex>
  );
};

export default TransactionBar;

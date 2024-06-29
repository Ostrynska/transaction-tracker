import React, { useState, ChangeEvent } from 'react';
import Papa from 'papaparse';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useBreakpointValue,
  useToast
} from '@chakra-ui/react';
import { Transaction } from '../db/database';

interface ImportModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onImport: (data: Transaction[]) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onRequestClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const toast = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

const validateCSV = (data: unknown[]): data is Transaction[] => {
  if (!Array.isArray(data)) {
    return false;
  }

  for (const item of data) {
    if (
      typeof item !== 'object' ||
      item === null ||
      !('status' in item) ||
      !('type' in item) ||
      !('clientName' in item) ||
      !('amount' in item)
    ) {
      return false;
    }
  }

  return true;
};


  const handleImport = () => {
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'csv') {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a CSV file.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      Papa.parse<Transaction>(file, {
        header: true,
        complete: (results) => {
          if (results.errors.length) {
            toast({
              title: 'Error',
              description: 'There was an error parsing the CSV file.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            return;
          }

          if (!validateCSV(results.data)) {
            toast({
              title: 'Invalid Format',
              description: 'The CSV file format is incorrect. Please ensure it has the required columns: status, type, clientName, amount.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            return;
          }
        onImport(results.data);
          toast({
            title: 'Success',
            description: 'The file has been successfully imported.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          onRequestClose();
        },
      });
    } else {
      toast({
        title: 'No File Selected',
        description: 'Please select a file to import.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onRequestClose} 
    >
      <ModalOverlay />
      <ModalContent mt='250'>
        <ModalHeader>Import Transactions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input type="file" onChange={handleFileChange}/>
        </ModalBody>
        <ModalFooter>
          <Button size={buttonSize} colorScheme="teal" mr={3} onClick={handleImport}>
            Import
          </Button>
          <Button size={buttonSize} colorScheme="teal" variant="outline" onClick={onRequestClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImportModal;

import React from 'react';
import { Tr, Td, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, IconButton, Button } from '@chakra-ui/react';
import { MdDelete, MdEditSquare } from "react-icons/md";
import EditModal from './EditModal';

interface Transaction {
  id: number;
  status: string;
  type: string;
  clientName: string;
  amount: number;
}

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (id: number, updatedTransaction: Partial<Transaction>) => void;
  onDelete: (id: number) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete }) => {
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const handleDeleteClick = () => {
    onDeleteOpen();
  };

  const handleDeleteConfirm = () => {
    onDelete(transaction.id);
    onDeleteClose();
  };

  const handleEditClick = () => {
    onEditOpen();
  };

  return (
    <>
      <Tr>
        <Td>{transaction.id}</Td>
        <Td>{transaction.status}</Td>
        <Td>{transaction.type}</Td>
        <Td>{transaction.clientName}</Td>
        <Td>{transaction.amount}</Td>
        <Td>
          <IconButton
            icon={<MdEditSquare size={18} />}
            size="md"
            colorScheme="teal"
            variant='ghost'
            onClick={handleEditClick}
            aria-label='Edit'
          />
          <IconButton
            icon={<MdDelete size={18} />}
            size="md"
            colorScheme="teal"
            variant='ghost'
            ml={2}
            onClick={handleDeleteClick}
            aria-label='Delete'
          />
        </Td>
      </Tr>

      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Transaction
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <EditModal
        isOpen={isEditOpen}
        onRequestClose={onEditClose}
        transaction={transaction}
        onEdit={onEdit}
      />
    </>
  );
};

export default TransactionItem;

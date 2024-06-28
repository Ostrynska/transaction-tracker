import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input
} from '@chakra-ui/react';

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  transaction: { id: number, status: string, type: string, clientName: string, amount: number };
  onEdit: (id: number, updatedTransaction: Partial<{ status: string; type: string; clientName: string; amount: number }>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onRequestClose, transaction, onEdit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: transaction
  });

  const onSubmit = (data: any) => {
    onEdit(transaction.id, data);
    onRequestClose();
  };

  React.useEffect(() => {
    reset(transaction);
  }, [transaction, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onRequestClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.status}>
            <FormLabel>Status</FormLabel>
            <Select {...register('status', { required: 'Status is required' })}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Input {...register('type')} />
          </FormControl>
          <FormControl>
            <FormLabel>Client Name</FormLabel>
            <Input {...register('clientName')} />
          </FormControl>
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input type="number" {...register('amount')} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
          <Button variant="ghost" onClick={onRequestClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;

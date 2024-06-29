import React, { useEffect } from 'react';
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
  Input,
  FormErrorMessage
} from '@chakra-ui/react';
import { Transaction } from '../db/database';

interface EditFormData {
  status: string;
  type: string;
  clientName: string;
  amount: string;
}

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  transaction: { id: number, status: string, type: string, clientName: string, amount: number };
  onEdit: (id: number, updatedTransaction: Partial<Transaction>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onRequestClose, transaction, onEdit }) => {
  const { register, handleSubmit, reset, formState: { errors }, trigger } = useForm<EditFormData>({
    defaultValues: {
      ...transaction,
      amount: transaction.amount.toString(),
    }
  });

  useEffect(() => {
    reset({
      ...transaction,
      amount: transaction.amount.toString(),
    });
  }, [transaction, reset]);

  const onSubmit = (data: EditFormData) => {
    onEdit(transaction.id, {
      ...data,
      amount: parseFloat(data.amount)
    });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onRequestClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.status} mb={4}>
            <FormLabel>Status</FormLabel>
            <Select {...register('status', { required: 'Status is required' })}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
            <FormErrorMessage>
              {errors.status && errors.status.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.type} mb={4}>
            <FormLabel>Type</FormLabel>
            <Select {...register('type', { required: 'Type is required' })}>
              <option value="Refill">Refill</option>
              <option value="Withdrawal">Withdrawal</option>
            </Select>
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.clientName} mb={4}>
            <FormLabel>Client Name</FormLabel>
            <Input
              {...register('clientName', {
                required: 'Client Name is required',
                validate: (value) => value.trim().split(' ').length >= 2 || 'Client Name must include first and last name'
              })}
              onBlur={() => trigger('clientName')}
            />
            <FormErrorMessage>
              {errors.clientName && errors.clientName.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.amount} mb={4}>
            <FormLabel>Amount</FormLabel>
            <Input
              type="text"
              {...register('amount', {
                required: 'Amount is required',
                pattern: {
                  value: /^[0-9]+([,.][0-9]{1,2})?$/,
                  message: 'Amount must be a valid number with up to two decimal places'
                },
                validate: (value) => parseFloat(value.replace(',', '.')) >= 0 || 'Amount must be at least 0'
              })}
            />
            <FormErrorMessage>
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button variant="ghost" onClick={onRequestClose}>Cancel</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;

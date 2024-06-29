import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Heading } from '@chakra-ui/react';
import { Transaction } from '../../db/database';

interface TransactionStatusPieChartProps {
  transactions: Transaction[];
}

const COLORS = ['#234E52', '#38B2AC', '#2C7A7B'];

const TransactionStatusPieChart: React.FC<TransactionStatusPieChartProps> = ({ transactions }) => {
  const data = [
    { name: 'Pending', value: transactions.filter(t => t.status === 'Pending').length },
    { name: 'Completed', value: transactions.filter(t => t.status === 'Completed').length },
    { name: 'Cancelled', value: transactions.filter(t => t.status === 'Cancelled').length },
  ];

  return (
    <Box mt={8} p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading as="h3" size="md" mb={4} textAlign="center">
        Transaction Status Distribution
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={150}
            dataKey="value"
            label
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TransactionStatusPieChart;

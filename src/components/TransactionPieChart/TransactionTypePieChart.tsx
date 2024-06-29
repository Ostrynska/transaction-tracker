import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Heading } from '@chakra-ui/react';
import { Transaction } from '../../db/database';

interface TransactionTypePieChartProps {
  transactions: Transaction[];
}

const COLORS = ['#234E52', '#38B2AC'];

const TransactionTypePieChart: React.FC<TransactionTypePieChartProps> = ({ transactions }) => {
  const data = [
    { name: 'Refill', value: transactions.filter(t => t.type === 'Refill').length },
    { name: 'Withdrawal', value: transactions.filter(t => t.type === 'Withdrawal').length },
  ];

  return (
    <Box mt={8} p={4} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading as="h3" size="md" mb={4} textAlign="center">
        Transaction Types Distribution
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

export default TransactionTypePieChart;

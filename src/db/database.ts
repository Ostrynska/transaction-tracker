import initSqlJs, { Database } from 'sql.js';

let db: Database;

const LOCAL_STORAGE_KEY = 'transactions_db';

export const initDatabase = async () => {
  const SQL = await initSqlJs({ locateFile: (file: unknown) => `https://sql.js.org/dist/${file}` });
  
  const savedDb = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedDb) {
    const savedData = Uint8Array.from(atob(savedDb), c => c.charCodeAt(0));
    db = new SQL.Database(savedData);
  } else {
    db = new SQL.Database();
    db.run(`CREATE TABLE transactions (
      id INTEGER PRIMARY KEY,
      status TEXT,
      type TEXT,
      clientName TEXT,
      amount REAL
    )`);

const transactions = [
    [1, 'Pending', 'Withdrawal', 'Dale Cotton', 28.43],
    [2, 'Completed', 'Refill', 'Paul Carter', 45.16],
    [3, 'Cancelled', 'Refill', 'Caldwell Reid', 63.00],
    [4, 'Cancelled', 'Refill', 'Quentin Bonner', 64.52],
    [5, 'Cancelled', 'Withdrawal', 'Colt Joyce', 70.67],
    [6, 'Completed', 'Refill', 'Neil Walls', 99.36],
    [7, 'Completed', 'Refill', 'Slade Rios', 52.60],
    [8, 'Cancelled', 'Withdrawal', 'Graham Harrell', 47.51],
    [9, 'Completed', 'Withdrawal', 'Kirk Byers', 96.35],
    [10, 'Cancelled', 'Withdrawal', 'Holmes Howell', 93.81],
    [11, 'Cancelled', 'Refill', 'Flynn Whitley', 95.75],
    [12, 'Cancelled', 'Refill', 'Chase Salas', 95.25],
    [13, 'Completed', 'Withdrawal', 'Aquila Skinner', 69.47],
    [14, 'Completed', 'Refill', 'Len Snyder', 78.59],
    [15, 'Completed', 'Refill', 'Thaddeus Watts', 38.72],
    [16, 'Pending', 'Withdrawal', 'Nehru Franks', 51.22],
    [17, 'Completed', 'Withdrawal', 'Lester Oconnor', 13.45],
    [18, 'Pending', 'Refill', 'Jameson White', 38.76],
    [19, 'Completed', 'Refill', 'Christian Stanton', 91.79],
    [20, 'Pending', 'Withdrawal', 'Vance Lowery', 13.40],
    [21, 'Cancelled', 'Refill', 'Kevin Wiley', 42.04],
    [22, 'Pending', 'Withdrawal', 'Plato Clay', 51.64],
    [23, 'Pending', 'Refill', 'Salvador Hardy', 60.54],
    [24, 'Pending', 'Withdrawal', 'Owen Langley', 64.23],
    [25, 'Completed', 'Refill', 'Zeus Ferrell', 32.59],
    [26, 'Completed', 'Refill', 'Hayden Puckett', 14.49],
    [27, 'Completed', 'Refill', 'Raja Fitzpatrick', 56.88],
    [28, 'Completed', 'Withdrawal', 'Hedley Mccall', 33.87],
    [29, 'Pending', 'Withdrawal', 'Ivan Noble', 55.21],
    [30, 'Completed', 'Withdrawal', 'Steven Soto', 94.57],
    [31, 'Pending', 'Refill', 'Omar Hutchinson', 54.11],
    [32, 'Completed', 'Withdrawal', 'Thor Mack', 7.84],
    [33, 'Pending', 'Withdrawal', 'Charles Sullivan', 76.74],
    [34, 'Pending', 'Withdrawal', 'Thor Gilbert', 90.68],
    [35, 'Completed', 'Withdrawal', 'Gabriel Fox', 54.20],
    [36, 'Cancelled', 'Withdrawal', 'Driscoll Tate', 72.10],
    [37, 'Completed', 'Refill', 'Armando Chase', 99.65],
    [38, 'Cancelled', 'Withdrawal', 'Thane Donovan', 84.18],
    [39, 'Completed', 'Refill', 'Price Dudley', 15.81],
    [40, 'Cancelled', 'Withdrawal', 'Yuli Brown', 67.19],
    [41, 'Cancelled', 'Refill', 'Jin Prince', 95.10],
    [42, 'Pending', 'Refill', 'Beck Butler', 64.97],
    [43, 'Pending', 'Withdrawal', 'Victor Quinn', 16.88],
    [44, 'Cancelled', 'Withdrawal', 'Dane Barker', 25.31],
    [45, 'Cancelled', 'Withdrawal', 'Felix Harper', 82.36],
    [46, 'Pending', 'Refill', 'Merrill Mullen', 30.56],
    [47, 'Cancelled', 'Refill', 'Laith Villarreal', 74.68],
    [48, 'Completed', 'Refill', 'Abraham Justice', 63.24],
    [49, 'Completed', 'Refill', 'Nathan Whitfield', 59.82],
    [50, 'Completed', 'Refill', 'David Rice', 84.71],
    [51, 'Completed', 'Withdrawal', 'Reuben Webb', 87.83],
    [52, 'Completed', 'Withdrawal', 'Lawrence Duffy', 10.96],
    [53, 'Pending', 'Refill', 'Hakeem Acevedo', 40.66],
    [54, 'Pending', 'Refill', 'Daquan Shields', 16.36],
    [55, 'Completed', 'Refill', 'Adam Shepherd', 45.97],
    [56, 'Pending', 'Refill', 'Derek Todd', 52.88],
    [57, 'Cancelled', 'Withdrawal', 'Nigel Roach', 46.92],
    [58, 'Pending', 'Refill', 'Oleg Willis', 97.76],
    [59, 'Pending', 'Withdrawal', 'Chancellor Stewart', 70.30],
    [60, 'Pending', 'Withdrawal', 'Gray Barry', 85.78],
    [61, 'Cancelled', 'Withdrawal', 'Cairo Mack', 73.98],
    [62, 'Pending', 'Refill', 'Erasmus Oneal', 89.31],
    [63, 'Pending', 'Refill', 'Levi Shepherd', 64.08],
    [64, 'Cancelled', 'Withdrawal', 'Cody York', 70.00],
    [65, 'Cancelled', 'Refill', 'Armand Miller', 10.93],
    [66, 'Completed', 'Withdrawal', 'Jameson Warren', 90.01],
    [67, 'Pending', 'Withdrawal', 'Merritt Nieves', 19.69],
    [68, 'Completed', 'Withdrawal', 'Callum Rosa', 43.04],
    [69, 'Pending', 'Withdrawal', 'James Garcia', 92.82],
    [70, 'Pending', 'Withdrawal', 'Kasimir Sandoval', 37.16],
    [71, 'Completed', 'Withdrawal', 'Noble Frank', 94.88],
    [72, 'Pending', 'Withdrawal', 'Cade Emerson', 47.94],
    [73, 'Cancelled', 'Refill', 'Sean Head', 11.36],
    [74, 'Cancelled', 'Withdrawal', 'Ross Crawford', 24.13],
    [75, 'Pending', 'Refill', 'Salvador Hopkins', 47.86],
    [76, 'Cancelled', 'Withdrawal', 'Quamar Peck', 5.46],
    [77, 'Cancelled', 'Withdrawal', 'Norman Whitley', 35.88],
    [78, 'Completed', 'Withdrawal', 'Dexter Chandler', 34.61],
    [79, 'Completed', 'Withdrawal', 'Adam Curry', 69.92],
    [80, 'Completed', 'Withdrawal', 'Elmo Huffman', 15.07],
    [81, 'Cancelled', 'Withdrawal', 'Eaton Sanchez', 31.20],
    [82, 'Completed', 'Refill', 'Cooper Cantrell', 14.69],
    [83, 'Cancelled', 'Withdrawal', 'Kermit Lawrence', 86.51],
    [84, 'Pending', 'Refill', 'Arsenio Wilkinson', 76.06],
    [85, 'Completed', 'Refill', 'Francis Marks', 93.64],
    [86, 'Completed', 'Withdrawal', 'Robert Nunez', 62.78],
    [87, 'Pending', 'Refill', 'Hyatt Spence', 74.23],
    [88, 'Pending', 'Withdrawal', 'Elmo Oliver', 0.73],
    [89, 'Cancelled', 'Refill', 'Brent Skinner', 48.10],
    [90, 'Pending', 'Refill', 'Linus Garcia', 61.99],
    [91, 'Pending', 'Refill', 'Bruce Vaughn', 16.55],
    [92, 'Cancelled', 'Refill', 'Galvin Knapp', 90.98],
    [93, 'Completed', 'Refill', 'Timothy Martinez', 36.48],
    [94, 'Cancelled', 'Refill', 'Myles Wright', 87.57],
    [95, 'Completed', 'Withdrawal', 'Robert Beard', 35.86],
    [96, 'Completed', 'Refill', 'Brendan Santana', 38.22],
    [97, 'Cancelled', 'Refill', 'Quamar Avery', 34.22],
    [98, 'Completed', 'Withdrawal', 'Upton Perez', 32.31],
    [99, 'Completed', 'Withdrawal', 'Grady Gordon', 7.33],
    [100, 'Pending', 'Withdrawal', 'Mark Velazquez', 66.59]
  ];

 const stmt = db.prepare("INSERT INTO transactions (id, status, type, clientName, amount) VALUES (?, ?, ?, ?, ?)");
    transactions.forEach(transaction => {
      stmt.run(transaction);
    });
    stmt.free();
    saveDatabase();
  }
};

const saveDatabase = () => {
  const data = db.export();
  const base64Data = btoa(String.fromCharCode.apply(null, data));
  localStorage.setItem(LOCAL_STORAGE_KEY, base64Data);
};

export const getTransactions = (): Transaction[] => {
  const res = db.exec("SELECT * FROM transactions");
  return res[0].values.map(row => ({
    id: row[0] as number,
    status: row[1] as string,
    type: row[2] as string,
    clientName: row[3] as string,
    amount: row[4] as number
  }));
};

export const addTransactions = async (transactions: Transaction[]): Promise<void> => {
  const stmt = db.prepare("INSERT INTO transactions (status, type, clientName, amount) VALUES (?, ?, ?, ?)");
  transactions.forEach(transaction => {
    stmt.run([transaction.status, transaction.type, transaction.clientName, transaction.amount]);
  });
  stmt.free();
  saveDatabase();
};

export const updateTransaction = async (transaction: Transaction): Promise<void> => {
  const stmt = db.prepare("UPDATE transactions SET status = ?, type = ?, clientName = ?, amount = ? WHERE id = ?");
  stmt.run([transaction.status, transaction.type, transaction.clientName, transaction.amount, transaction.id]);
  stmt.free();
  saveDatabase();
};

export const deleteTransaction = async (id: number): Promise<void> => {
  const stmt = db.prepare("DELETE FROM transactions WHERE id = ?");
  stmt.run([id]);
  stmt.free();
  saveDatabase();
};

export interface Transaction {
  id: number;
  status: string;
  type: string;
  clientName: string;
  amount: number;
}

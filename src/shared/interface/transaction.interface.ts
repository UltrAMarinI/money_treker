export interface Transaction {
  _id?: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string; // ISO-дата
  description?: string;
}

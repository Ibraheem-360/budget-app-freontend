export interface Expense {
    id?: number;
    userId?: number;
    category: string;
    amount: number;
    notes?: string;
    date: string;  // Backend expects date as string
}

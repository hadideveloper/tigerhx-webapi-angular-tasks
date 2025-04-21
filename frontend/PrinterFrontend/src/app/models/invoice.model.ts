export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customerName: string;
  products: Product[];
  totalAmount: number;
  notes?: string;
}

export interface Product {
  name: string;
  quantity: number;
  price: number;
}

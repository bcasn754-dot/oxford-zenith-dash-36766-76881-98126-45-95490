export interface PaymentMethod {
  id: string;
  name: string;
  nameAr: string;
  type: 'wallet' | 'bank' | 'transfer';
  logo: string;
  accountNumber?: string;
  recipientName?: string;
  recipientNameAr?: string;
  recipientPhone?: string;
}

export interface PaymentRequest {
  id: string;
  studentName: string;
  phoneNumber: string;
  paymentMethod: string;
  paymentMethodName: string;
  platformAccountNumber: string;
  receiptImage?: File;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  courseId?: string;
  courseName?: string;
}

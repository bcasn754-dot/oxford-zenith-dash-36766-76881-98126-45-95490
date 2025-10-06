import { PaymentMethod, PaymentRequest } from "@/models/payment.model";
import alngmLogo from "@/assets/payment-methods/alngm.jpeg";
import floosakLogo from "@/assets/payment-methods/floosak.jpeg";
import alkuraimiLogo from "@/assets/payment-methods/alkuraimi.png";
import jaibLogo from "@/assets/payment-methods/jaib.jpeg";
import jawaliLogo from "@/assets/payment-methods/jawali.png";
import mfloosLogo from "@/assets/payment-methods/mfloos.jpg";
import mobileMoneyLogo from "@/assets/payment-methods/mobilemoney.png";
import oneCashLogo from "@/assets/payment-methods/onecash.png";
import moneygramLogo from "@/assets/payment-methods/moneygram.png";
import westernunionLogo from "@/assets/payment-methods/westernunion.png";

const paymentMethods: PaymentMethod[] = [
  {
    id: "floosak",
    name: "Floosak",
    nameAr: "فلوسك",
    type: "wallet",
    logo: floosakLogo,
    accountNumber: "777123456",
  },
  {
    id: "jawali",
    name: "Jawali",
    nameAr: "جوالي",
    type: "wallet",
    logo: jawaliLogo,
    accountNumber: "777654321",
  },
  {
    id: "jaib",
    name: "Jaib",
    nameAr: "جيب",
    type: "wallet",
    logo: jaibLogo,
    accountNumber: "777888999",
  },
  {
    id: "mfloos",
    name: "M Floos",
    nameAr: "ام فلوس",
    type: "wallet",
    logo: mfloosLogo,
    accountNumber: "777111222",
  },
  {
    id: "mobilemoney",
    name: "Mobile Money",
    nameAr: "موبايل موني",
    type: "wallet",
    logo: mobileMoneyLogo,
    accountNumber: "777333444",
  },
  {
    id: "onecash",
    name: "One Cash",
    nameAr: "وان كاش",
    type: "wallet",
    logo: oneCashLogo,
    accountNumber: "777555666",
  },
  {
    id: "alkuraimi",
    name: "Al Kuraimi Islamic Bank",
    nameAr: "مصرف الكريمي الإسلامي",
    type: "bank",
    logo: alkuraimiLogo,
    accountNumber: "0123456789",
  },
  {
    id: "alngm",
    name: "Al Najm Bank",
    nameAr: "النجم",
    type: "bank",
    logo: alngmLogo,
    accountNumber: "9876543210",
  },
  {
    id: "moneygram",
    name: "MoneyGram",
    nameAr: "موني جرام",
    type: "transfer",
    logo: moneygramLogo,
    recipientName: "Hussein Abdulhamid Saif Mohammed",
    recipientNameAr: "حسين عبدالحميد سيف محمد",
    recipientPhone: "734200353",
  },
  {
    id: "westernunion",
    name: "Western Union",
    nameAr: "ويسترن يونيون",
    type: "transfer",
    logo: westernunionLogo,
    recipientName: "Hussein Abdulhamid Saif Mohammed",
    recipientNameAr: "حسين عبدالحميد سيف محمد",
    recipientPhone: "734200353",
  },
];

let paymentRequests: PaymentRequest[] = [];

export const paymentService = {
  getAllMethods: (): PaymentMethod[] => {
    return paymentMethods;
  },

  getMethodById: (id: string): PaymentMethod | undefined => {
    return paymentMethods.find((method) => method.id === id);
  },

  getMethodsByType: (type: 'wallet' | 'bank' | 'transfer'): PaymentMethod[] => {
    return paymentMethods.filter((method) => method.type === type);
  },

  submitPaymentRequest: (request: Omit<PaymentRequest, 'id' | 'status' | 'createdAt'>): PaymentRequest => {
    const newRequest: PaymentRequest = {
      ...request,
      id: `PAY-${Date.now()}`,
      status: 'pending',
      createdAt: new Date(),
    };
    paymentRequests.push(newRequest);
    return newRequest;
  },

  getAllRequests: (): PaymentRequest[] => {
    return paymentRequests;
  },

  getRequestById: (id: string): PaymentRequest | undefined => {
    return paymentRequests.find((req) => req.id === id);
  },
};

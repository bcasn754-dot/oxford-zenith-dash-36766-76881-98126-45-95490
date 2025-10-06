import { PaymentMethod } from "@/models/payment.model";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onClick: () => void;
}

export const PaymentMethodCard = ({ method, isSelected, onClick }: PaymentMethodCardProps) => {
  const { language } = useLanguage();

  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-elegant ${
        isSelected ? "ring-2 ring-accent shadow-elegant" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
          <img
            src={method.logo}
            alt={language === "ar" ? method.nameAr : method.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-foreground">
            {language === "ar" ? method.nameAr : method.name}
          </h3>
          <Badge variant="outline" className="mt-1">
            {method.type === "wallet" 
              ? (language === "ar" ? "محفظة" : "Wallet") 
              : method.type === "bank"
              ? (language === "ar" ? "بنك" : "Bank")
              : (language === "ar" ? "تحويل دولي" : "International Transfer")}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

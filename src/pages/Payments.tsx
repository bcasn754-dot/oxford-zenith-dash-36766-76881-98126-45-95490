import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentMethodCard } from "@/components/PaymentMethodCard";
import { PaymentForm } from "@/components/PaymentForm";
import { paymentService } from "@/services/payment.service";
import { PaymentMethod } from "@/models/payment.model";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Payments = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId") || undefined;
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const wallets = paymentService.getMethodsByType("wallet");
  const banks = paymentService.getMethodsByType("bank");
  const transfers = paymentService.getMethodsByType("transfer");

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {language === "ar" ? "طرق الدفع" : "Payment Methods"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {language === "ar" ? "اختر طريقة الدفع المناسبة" : "Choose your preferred payment method"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="wallets" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="wallets">
                {language === "ar" ? "المحافظ الإلكترونية" : "E-Wallets"}
              </TabsTrigger>
              <TabsTrigger value="banks">
                {language === "ar" ? "البنوك" : "Banks"}
              </TabsTrigger>
              <TabsTrigger value="transfers">
                {language === "ar" ? "التحويلات الدولية" : "International Transfers"}
              </TabsTrigger>
            </TabsList>
              
              <TabsContent value="wallets" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wallets.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      isSelected={selectedMethod?.id === method.id}
                      onClick={() => setSelectedMethod(method)}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="banks" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {banks.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      isSelected={selectedMethod?.id === method.id}
                      onClick={() => setSelectedMethod(method)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transfers" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {transfers.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      isSelected={selectedMethod?.id === method.id}
                      onClick={() => setSelectedMethod(method)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            {selectedMethod ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                  {language === "ar" ? "تفاصيل الدفع" : "Payment Details"}
                </h2>
                <PaymentForm selectedMethod={selectedMethod} courseId={courseId} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-muted rounded-xl p-8">
                <p className="text-muted-foreground text-center">
                  {language === "ar" 
                    ? "يرجى اختيار طريقة الدفع للمتابعة" 
                    : "Please select a payment method to continue"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payments;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PaymentMethod } from "@/models/payment.model";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { paymentService } from "@/services/payment.service";
import { courseService } from "@/services/course.service";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  studentName: z.string().min(3, "Name must be at least 3 characters"),
  phoneNumber: z.string().min(9, "Phone number must be at least 9 digits"),
  receiptImage: z.any().optional(),
});

interface PaymentFormProps {
  selectedMethod: PaymentMethod;
  courseId?: string;
}

export const PaymentForm = ({ selectedMethod, courseId }: PaymentFormProps) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [courseName, setCourseName] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<string>("");

  useEffect(() => {
    if (courseId) {
      const course = courseService.getById(courseId);
      if (course) {
        setCourseName(course.title);
        setCourseLevel(course.level || "");
        setCoursePrice(course.price ? `$${course.price}` : "");
      }
    }
  }, [courseId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      phoneNumber: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const request = paymentService.submitPaymentRequest({
      studentName: data.studentName,
      phoneNumber: data.phoneNumber,
      paymentMethod: selectedMethod.id,
      paymentMethodName: language === "ar" ? selectedMethod.nameAr : selectedMethod.name,
      platformAccountNumber: selectedMethod.accountNumber,
      receiptImage: receiptFile || undefined,
      courseId,
      courseName,
    });

    toast({
      title: language === "ar" ? "تم إرسال الطلب بنجاح" : "Request Submitted Successfully",
      description: language === "ar" 
        ? "سيتم مراجعة طلبك والرد عليك قريباً" 
        : "Your request will be reviewed and you will be notified soon",
    });

    navigate("/courses");
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="studentName">
            {language === "ar" ? "الاسم الكامل" : "Full Name"}
          </Label>
          <Input
            id="studentName"
            {...form.register("studentName")}
            placeholder={language === "ar" ? "أدخل اسمك الكامل" : "Enter your full name"}
            className="mt-1"
          />
          {form.formState.errors.studentName && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.studentName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phoneNumber">
            {language === "ar" ? "رقم الهاتف" : "Phone Number"}
          </Label>
          <Input
            id="phoneNumber"
            {...form.register("phoneNumber")}
            placeholder={language === "ar" ? "أدخل رقم هاتفك" : "Enter your phone number"}
            className="mt-1"
          />
          {form.formState.errors.phoneNumber && (
            <p className="text-sm text-destructive mt-1">
              {form.formState.errors.phoneNumber.message}
            </p>
          )}
        </div>

        {courseId && courseName && (
          <>
            <div>
              <Label>
                {language === "ar" ? "الدورة" : "Course"}
              </Label>
              <Input
                value={courseName}
                disabled
                className="mt-1 bg-muted"
              />
            </div>
            
            {courseLevel && (
              <div>
                <Label>
                  {language === "ar" ? "المستوى" : "Level"}
                </Label>
                <Input
                  value={courseLevel}
                  disabled
                  className="mt-1 bg-muted"
                />
              </div>
            )}
            
            {coursePrice && (
              <div>
                <Label>
                  {language === "ar" ? "السعر" : "Price"}
                </Label>
                <Input
                  value={coursePrice}
                  disabled
                  className="mt-1 bg-muted"
                />
              </div>
            )}
          </>
        )}

        <div>
          <Label>
            {language === "ar" ? "طريقة الدفع" : "Payment Method"}
          </Label>
          <Input
            value={language === "ar" ? selectedMethod.nameAr : selectedMethod.name}
            disabled
            className="mt-1 bg-muted"
          />
        </div>

        {selectedMethod.type === 'transfer' ? (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-accent">
              {language === "ar" ? "بيانات مسؤول المنصة" : "Platform Manager Information"}
            </h4>
            <div>
              <Label className="text-xs text-muted-foreground">
                {language === "ar" ? "الاسم" : "Name"}
              </Label>
              <p className="font-medium">
                {language === "ar" ? selectedMethod.recipientNameAr : selectedMethod.recipientName}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">
                {language === "ar" ? "رقم الهاتف" : "Phone Number"}
              </Label>
              <p className="font-mono font-bold text-accent">{selectedMethod.recipientPhone}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {language === "ar" 
                ? "قم بإرسال المبلغ وفقاً لهذه البيانات" 
                : "Send the amount according to this information"}
            </p>
          </div>
        ) : (
          <div>
            <Label>
              {language === "ar" ? "رقم حساب المنصة" : "Platform Account Number"}
            </Label>
            <Input
              value={selectedMethod.accountNumber}
              disabled
              className="mt-1 bg-muted font-mono font-bold text-accent"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {language === "ar" 
                ? "قم بتحويل المبلغ إلى هذا الرقم" 
                : "Transfer the amount to this number"}
            </p>
          </div>
        )}

        <div>
          <Label htmlFor="receipt">
            {language === "ar" ? "صورة إشعار الدفع" : "Payment Receipt Image"}
          </Label>
          <div className="mt-2">
            <label
              htmlFor="receipt"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-accent transition-colors"
            >
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewUrl}
                    alt="Receipt preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full p-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? "انقر لرفع الصورة" : "Click to upload image"}
                  </p>
                </div>
              )}
            </label>
            <input
              id="receipt"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={form.handleSubmit(onSubmit)}
        variant="gold"
        size="lg"
        className="w-full"
        disabled={!receiptFile}
      >
        {language === "ar" ? "إرسال الطلب" : "Submit Request"}
      </Button>
    </Card>
  );
};

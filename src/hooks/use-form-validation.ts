import { useState, useCallback } from "react";
import { z } from "zod";

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

export const useFormValidation = <T extends Record<string, any>>(
  schema: z.ZodSchema<T>
) => {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validate = useCallback(
    async (data: T): Promise<boolean> => {
      setIsValidating(true);
      setErrors({});

      try {
        await schema.parseAsync(data);
        setIsValidating(false);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const validationErrors: ValidationErrors<T> = {};
          error.errors.forEach((err) => {
            const path = err.path[0] as keyof T;
            validationErrors[path] = err.message;
          });
          setErrors(validationErrors);
        }
        setIsValidating(false);
        return false;
      }
    },
    [schema]
  );

  const validateField = useCallback(
    (field: keyof T, value: any): boolean => {
      try {
        // Simple field validation - just check if value is valid
        // You can extend this based on your schema structure
        if (value === undefined || value === null || value === "") {
          setErrors((prev) => ({ 
            ...prev, 
            [field]: "This field is required" 
          }));
          return false;
        }
        
        // Clear error for this field
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
        
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errorMessage = error.errors[0]?.message || "Validation error";
          setErrors((prev) => ({ ...prev, [field]: errorMessage }));
        }
        return false;
      }
    },
    []
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    errors,
    isValidating,
    validate,
    validateField,
    clearErrors,
    clearFieldError,
    hasErrors: Object.keys(errors).length > 0,
  };
};

// Common validation schemas
export const commonSchemas = {
  email: z.string().email({ message: "Invalid email address" }),
  
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
      message: "Invalid phone number",
    }),
  
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must not exceed 1000 characters" }),
};

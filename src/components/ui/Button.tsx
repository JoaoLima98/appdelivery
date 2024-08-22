import {
  TouchableOpacity,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { cn } from "@/lib/cn";

const variantButtonClasses = {
  default: "bg-primary",
  secondary: "bg-secondary",
  destructive: "bg-destructive",
  ghost: "bg-slate-700",
  link: "text-primary underline-offset-4",
};

const variantTextClasses = {
  default: "text-white",
  link: "text-primary underline-offset-4",
  secondary: "",
  destructive: "",
  ghost: "",
};



type VariantProps = {
  default: string;
  secondary: string;
  destructive: string;
  ghost: string;
  link: string;
};

type ButtonProps = {
  variant?: keyof VariantProps;
  text: string;
  textVariant?: keyof Omit<VariantProps, "secondary" | "destructive" | "ghost">;
  textClassName?: string;
  isLoading?: boolean;
} & React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const buttonTextVariant = ({
  textClassName,
  variant = 'default'
}: Omit<ButtonProps, "text">) => {
  return cn("text-center font-medium text-lg text-white", textClassName, variantTextClasses[variant]);
};

const buttonVariant = ({
  variant = "default",
  className,
}: Omit<ButtonProps, "text">) => {
  return cn(
    "flex flex-row items-center justify-center rounded-md py-2 h-12",
    variantButtonClasses[variant],
    className,
  );
};

export function Button({
  className,
  variant = "default",
  textVariant = "default",
  textClassName,
  text,
  isLoading = false,
  ...props
}: ButtonProps) {
  console.log(cn(buttonTextVariant({ textClassName })))
  return (
    <Pressable className={cn(buttonVariant({ variant, className }))} {...props}>
      {isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text className={cn(buttonTextVariant({variant, textClassName }))}>{text}</Text>
      )}
    </Pressable>
  );
}
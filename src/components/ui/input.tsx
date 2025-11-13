import { LucideEye, LucideEyeOff } from "lucide-react";
import * as React from "react";
import { FieldError } from "react-hook-form";
import { FormError, FormLabel } from "./form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: FieldError | undefined;
  label?: string;
  required?: boolean;
  helperText?: string;
}

const Input = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, required, icon, error, type, ...props }, ref) => {
      const containerClassNames = React.useMemo(() => {
        const baseClasses =
          "flex rounded-[4px] bg-background w-full border   px-3 h-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium  disabled:cursor-not-allowed disabled:opacity-50";
        const errorClass = error ? "outline-[.1px] outline-destructive" : "";
        return `${baseClasses} ${errorClass} ${className}`;
      }, [error, className]);

      const [show, setShow] = React.useState(false);

      return (
        <div>
          {label ? <FormLabel required={required}>{label}</FormLabel> : ""}

          <div
            className={containerClassNames}
            style={{
              paddingLeft: type === "file" ? "2px" : "auto",
            }}
          >
            {icon && <div className="flex items-center mr-2 ">{icon}</div>}
            <input
              type={
                type === "password"
                  ? show
                    ? "text"
                    : "password"
                  : type ?? "text"
              }
              className="w-full x active:border-none focus:outline-none active:outline-none bg-transparent placeholder:text-[13px] "
              ref={ref}
              style={{
                paddingTop: type === "file" ? "3px" : "0",
              }}
              {...props}
            />
            <div
              onClick={() => {
                setShow((prev) => !prev);
              }}
              style={{
                display: type === "password" ? "flex" : "none",
              }}
              className="items-center h-8 cursor-pointer"
            >
              {show ? <LucideEye size={16} /> : <LucideEyeOff size={16} />}
            </div>
          </div>
          <FormError error={error?.message} />
          {props.helperText ? <small>{props.helperText}</small> : ""}
        </div>
      );
    }
  )
);

export interface TextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError | undefined;
  label: string;
  required?: boolean;
  height?: string;
}
const TextArea = React.memo(
  React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, required, error, ...props }, ref) => {
      const containerClassNames = React.useMemo(() => {
        const baseClasses =
          "flex rounded-[4px] w-full border focus:outline-none  p-2  text-sm placeholder:text-[13px] file:font-medium disabled:cursor-not-allowed disabled:opacity-50 ";
        const errorClass = error ? "border-[.1px] border-destructive" : "";
        return `${baseClasses} ${errorClass} ${className}`;
      }, [error, className]);

      return (
        <div>
          <FormLabel required={required}>{label}</FormLabel>
          <textarea
            className={containerClassNames}
            ref={ref}
            style={{
              height: props.height ?? "90px",
            }}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
          <FormError error={error?.message} />
        </div>
      );
    }
  )
);

export { Input, TextArea };

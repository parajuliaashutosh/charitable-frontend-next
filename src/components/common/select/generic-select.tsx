"use client"

import { FormError, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import type { FieldError } from "react-hook-form"

type GenericSelectProps<T extends Record<string, string | number>> = {
  value: T[keyof T] | "ALL"
  error?: FieldError | undefined
  handleChange: (value: T[keyof T] | "ALL") => void
  label?: string
  required?: boolean
  hideOptions?: T[keyof T][]
  options: T
  placeholder?: string
  showAll?: boolean
  className?: string
  disabled?: boolean
  variant?: "PRIMARY" | "SECONDARY"
  colors?: Partial<Record<T[keyof T] | "ALL", string>>
  rounded?: "lg" | "none"
}

const GenericSelect = <T extends Record<string, string | number>>({
  value,
  error,
  handleChange,
  label,
  required = false,
  hideOptions = [],
  options,
  showAll = false,
  placeholder = "Select an option",
  className = "",
  variant = "PRIMARY",
  disabled = false,
  colors,
  rounded = "none",
}: GenericSelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<string | number>("")

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const optionSet = new Set(Object.values(options))

  const getSelectTriggerClasses = () => {
    const base = `rounded-[4px] w-full border-[1px] bg-background 
      dark:bg-[#02040A] dark:border-gray-600 dark:text-slate-300 
      px-3 h-[32px] text-sm ring-offset-background 
      disabled:cursor-not-allowed disabled:opacity-50`

    const errorClass = error
      ? "border-red-500"
      : "border-gray-300 hover:border-gray-400 focus:border-gray-400 data-[state=open]:border-gray-400"

    if (variant === "SECONDARY") {
      return "border-none bg-transparent dark:bg-transparent p-0 text-[13px]"
    }

    if (variant === "PRIMARY" && colors) {
      return `${base} ${errorClass} border-none p-0 ${className}`
    }

    return `${base} ${errorClass} text-[13px] ${className}`
  }

  return (
    <div>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <Select
        onValueChange={(e) => {
          setSelectedValue(e)
          handleChange(e as T[keyof T] | "ALL")
        }}
        value={selectedValue?.toString()}
        disabled={disabled}
      >
        <SelectTrigger
          className={getSelectTriggerClasses()}
          style={
            variant === "PRIMARY" && colors
              ? {
                  color: colors[value] ?? "#b02004",
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "0px",
                  borderRadius: rounded === "lg" ? "1rem" : "0",
                }
              : {}
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="z-[999]">
          {showAll && (
            <SelectItem
              key="ALL"
              value="ALL"
              className="text-[13px] rounded-none"
              style={
                variant === "PRIMARY" && colors
                  ? {
                      backgroundColor: colors["ALL"] ?? "#b02004",
                      color: "white",
                    }
                  : {}
              }
            >
              <span className="whitespace-nowrap">ALL</span>
            </SelectItem>
          )}

          {[...optionSet].map((option) => {
            if (hideOptions.includes(option as T[keyof T])) return null

            return (
              <SelectItem
                key={option}
                value={option.toString()}
                className="text-[13px] rounded-none"
                style={
                  variant === "PRIMARY" && colors && option in colors
                    ? {
                        backgroundColor: colors[option],
                        color: "white",
                      }
                    : {}
                }
              >
                <span className="whitespace-nowrap">{option}</span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>

      <FormError error={error?.message} />
    </div>
  )
}

export default GenericSelect

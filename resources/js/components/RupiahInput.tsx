import { useState, type InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> & {
  value?: string | number;
  onValueChange?: (value: string) => void;
};
export function RupiahInput({ value, onValueChange, ...props }: Props) {
  const [localValue, setLocalValue] = useState("");
  const digits = String(value ?? localValue).replace(/\D/g, "");
  const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return <input {...props} type="text" inputMode="numeric" value={formatted} onChange={event => {
    const input = event.currentTarget;
    const beforeCaret = input.value.slice(0, input.selectionStart ?? input.value.length).replace(/\D/g, "").length;
    const raw = input.value.replace(/\D/g, "");
    setLocalValue(raw);
    onValueChange?.(raw);
    requestAnimationFrame(() => {
      if (document.activeElement !== input) return;
      let position = 0; let count = 0;
      while (position < input.value.length && count < beforeCaret) {
        if (/\d/.test(input.value[position]!)) count++;
        position++;
      }
      input.setSelectionRange(position, position);
    });
  }} />;
}
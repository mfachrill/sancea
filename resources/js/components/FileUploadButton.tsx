import { useState, type InputHTMLAttributes } from "react";
import { Upload } from "lucide-react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;
export function FileUploadButton({ className = "", onChange, disabled, multiple, ...props }: Props) {
  const [names, setNames] = useState<string[]>([]);
  return <span className={`flex flex-wrap items-center gap-3 ${className}`}>
    <span className={`relative inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border border-slate-500 bg-slate-700 px-4 py-2 text-xs font-semibold text-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 ${disabled ? "cursor-not-allowed opacity-50" : "hover:bg-slate-600"}`}>
      <Upload size={16} aria-hidden="true" />{multiple ? "Pilih foto" : "Pilih foto"}
      <input {...props} type="file" multiple={multiple} disabled={disabled} aria-label={props["aria-label"] ?? "Pilih foto untuk diupload"} className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed" onChange={event => { setNames(Array.from(event.target.files ?? []).map(file => file.name)); onChange?.(event); }} />
    </span>
    <span aria-live="polite" className="min-w-0 max-w-full break-words text-xs font-normal normal-case text-slate-400">{disabled && !names.length ? "Upload belum tersedia" : names.length ? names.join(", ") : "Belum ada foto dipilih"}</span>
  </span>;
}
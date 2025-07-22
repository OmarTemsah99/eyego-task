import React, { useState, useRef, useEffect } from "react";

interface StatusFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
}

const defaultOptions = [
  { value: "ALL", label: "All Issues" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CLOSED", label: "Closed" },
];

export default function StatusFilterDropdown({
  value,
  onChange,
  options = defaultOptions,
}: StatusFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative w-48">
      <button
        type="button"
        className="w-full bg-slate-700 border border-slate-600 text-white px-4 py-2.5 rounded-xl flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-600 transition-all duration-200 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}>
        <span>{selected?.label ?? "Select"}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul className="absolute left-0 z-10 mt-2 w-full bg-slate-700 border border-slate-600 rounded-xl shadow-lg py-1 animate-fade-in">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`px-4 py-2 text-white cursor-pointer transition-all duration-150
                ${value === opt.value ? "bg-blue-600" : "rounded-xl"}
                hover:bg-blue-600 hover:rounded-none`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              role="option"
              aria-selected={value === opt.value}>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

interface StatusBadgeProps {
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "OPEN":
        return {
          label: "Open",
          bgColor: "bg-red-500/20",
          textColor: "text-red-400",
          borderColor: "border-red-500/30",
          dotColor: "bg-red-400",
          icon: <AlertCircle className="w-3 h-3" />,
        };
      case "IN_PROGRESS":
        return {
          label: "In Progress",
          bgColor: "bg-yellow-500/20",
          textColor: "text-yellow-400",
          borderColor: "border-yellow-500/30",
          dotColor: "bg-yellow-400",
          icon: <Loader2 className="w-3 h-3 animate-spin" />,
        };
      case "CLOSED":
        return {
          label: "Closed",
          bgColor: "bg-green-500/20",
          textColor: "text-green-400",
          borderColor: "border-green-500/30",
          dotColor: "bg-green-400",
          icon: <CheckCircle2 className="w-3 h-3" />,
        };
      default:
        return {
          label: status,
          bgColor: "bg-gray-500/20",
          textColor: "text-gray-400",
          borderColor: "border-gray-500/30",
          dotColor: "bg-gray-400",
          icon: <AlertCircle className="w-3 h-3" />,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap 
                 border transition-all duration-200 hover:scale-105
                 ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
      <span
        className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse`}></span>
      {config.icon}
      {config.label}
    </span>
  );
}

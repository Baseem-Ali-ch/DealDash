import type { WalletTransaction } from "@/lib/data/user-data"
import { cn } from "@/lib/utils"
import { ArrowDownLeft, ArrowUpRight } from "lucide-react"

interface WalletTransactionItemProps {
  transaction: WalletTransaction
}

export const WalletTransactionItem = ({ transaction }: WalletTransactionItemProps) => {
  const isCredit = transaction.type === "credit"

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isCredit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
            "dark:bg-opacity-20",
          )}
        >
          {isCredit ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
        </div>

        <div>
          <h4 className="font-medium text-sm">{transaction.description}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
        </div>
      </div>

      <div className="text-right">
        <p className={cn("font-medium", isCredit ? "text-green-600" : "text-red-600")}>
          {isCredit ? "+" : "-"}${transaction.amount.toFixed(2)}
        </p>
        <span
          className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            transaction.status === "completed"
              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
              : transaction.status === "pending"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
          )}
        >
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </span>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import type { WalletTransaction } from "@/lib/data/user-data"
import { WalletTransactionItem } from "@/molecules/wallet-transaction-item"
import { WithdrawalForm } from "@/molecules/wallet-withdrawal-form"
import { Button } from "@/atoms/button"
import { Input } from "@/atoms/input"
import { Search, ArrowDownUp } from "lucide-react"

interface WalletSectionProps {
  transactions: WalletTransaction[]
}

export const WalletSection = ({ transactions }: WalletSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [typeFilter, setTypeFilter] = useState<"all" | "credit" | "debit">("all")
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false)

  const itemsPerPage = 5

  // Calculate wallet balance
  const walletBalance = transactions.reduce((total, transaction) => {
    return transaction.type === "credit" ? total + transaction.amount : total - transaction.amount
  }, 0)

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === "all" || transaction.type === typeFilter
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

  // Paginate transactions
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleWithdraw = (amount: number, method: string, accountDetails: string) => {
    // In a real app, this would call an API to process the withdrawal
    console.log("Processing withdrawal:", { amount, method, accountDetails })

    // For demo purposes, we'll just close the form
    setTimeout(() => {
      setShowWithdrawalForm(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 pt-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6">My Wallet</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary/10 rounded-lg p-4 col-span-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
            <h2 className="text-3xl font-bold text-primary mt-1">${walletBalance.toFixed(2)}</h2>
          </div>
          <div className="flex flex-col gap-2">
            <Button className="flex-1">Add Funds</Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowWithdrawalForm(true)}>
              Withdraw
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search transactions"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                title={`Sort by ${sortOrder === "newest" ? "oldest" : "newest"} first`}
              >
                <ArrowDownUp className="h-4 w-4" />
              </Button>

              <Button variant={typeFilter === "all" ? "default" : "outline"} onClick={() => setTypeFilter("all")}>
                All
              </Button>
              <Button variant={typeFilter === "credit" ? "default" : "outline"} onClick={() => setTypeFilter("credit")}>
                Credits
              </Button>
              <Button variant={typeFilter === "debit" ? "default" : "outline"} onClick={() => setTypeFilter("debit")}>
                Debits
              </Button>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            {paginatedTransactions.length > 0 ? (
              <div>
                {paginatedTransactions.map((transaction) => (
                  <WalletTransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No transactions found matching your search criteria.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}{" "}
                transactions
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showWithdrawalForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <WithdrawalForm
              currentBalance={walletBalance}
              onClose={() => setShowWithdrawalForm(false)}
              onWithdraw={handleWithdraw}
            />
          </div>
        </div>
      )}
    </div>
  )
}

import { useState, useMemo } from "react";
import AddTransactionForm from "./AddTransactionForm";

export default function AccountContainer() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Coffee", category: "Food", amount: 3.5 },
    { id: 2, description: "Book", category: "Education", amount: 15 }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      const direction =
        prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });
  };

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];
    if (searchTerm) {
      filtered = filtered.filter((t) =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [transactions, searchTerm, sortConfig]);

  return (
    <div>
      <h1>Transactions</h1>

      <input
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />

      <button onClick={() => handleSort("description")}>
        Sort Description
      </button>
      <button onClick={() => handleSort("category")}>
        Sort Category
      </button>

      <div className="ui segment">
        <AddTransactionForm onAddTransaction={addTransaction} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td>{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

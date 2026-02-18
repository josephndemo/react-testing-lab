// Corrected AccountContainer.jsx
import React, { useState } from "react"; // <-- make sure useState is imported
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer({ initialTransactions = [] }) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");

  const handleAddTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const sortByDescription = () => {
    setTransactions((prev) =>
      [...prev].sort((a, b) => a.description.localeCompare(b.description))
    );
  };

  const sortByCategory = () => {
    setTransactions((prev) =>
      [...prev].sort((a, b) => a.category.localeCompare(b.category))
    );
  };

  return (
    <div>
      <h1>Transactions</h1>
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={sortByDescription}>Sort Description</button>
      <button onClick={sortByCategory}>Sort Category</button>
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
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

export default AccountContainer;

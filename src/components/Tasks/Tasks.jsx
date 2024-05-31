import React, { useState, useEffect } from 'react';
import { iconsImgs } from "../../utils/images";
import "./Tasks.css";

const Tasks = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 8;

  useEffect(() => {
    fetch('https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Logic to get current transactions based on pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Logic to paginate
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(transactions.length / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  const markAsDone = (id) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === id ? { ...transaction, completed: true } : transaction
    ));
  }

  return (
    <div className="transactions-container">
      <h2>All Tasks</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>To-Do</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>
                {transaction.priority === 'LOW' && <img src={iconsImgs.low} alt="Low" className="priority-icon" />}
                {transaction.priority === 'MEDIUM' && <img src={iconsImgs.medium} alt="Medium" className="priority-icon" />}
                {transaction.priority === 'HIGH' && <img src={iconsImgs.high} alt="High" className="priority-icon" />}
                <span className="todo-text">{transaction.todo}</span>
                {!transaction.completed && (
                  <div className="button-container">
                    <button onClick={() => markAsDone(transaction.id)} className="mark-done-button">
                      Mark as Done
                    </button>
                  </div>
                )}
              </td>
              <td className="status">
                {transaction.completed ? (
                  <div className="status-box done">
                    <img src={iconsImgs.done} alt="Done" className="status-icon" />
                  </div>
                ) : (
                  <div className="status-box in-progress">
                    <img src={iconsImgs.progress} alt="In Progress" className="status-icon" />
                  </div>
                )}
              </td>
              <td>{new Date(transaction.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevious} className="arrow">{"<"}</button>
        {pageNumbers.map(number => (
          <button 
            key={number} 
            onClick={() => handleClick(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button onClick={handleNext} className="arrow">{">"}</button>
      </div>
    </div>
  );
}

export default Tasks;

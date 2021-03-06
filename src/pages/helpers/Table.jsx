import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../../actions';
import '../../index.css';

class Table extends React.Component {
  componentDidUpdate() {
    const { user, expenses } = this.props;
    localStorage.setItem(user, JSON.stringify(expenses));
  }

  handleDeleting = (id) => {
    const { expenses, deleteExpenseProp } = this.props;
    const expensesUpdated = expenses.filter((expense) => expense.id !== id);
    deleteExpenseProp(expensesUpdated);
  }

  render() {
    const { expenses, editExpenseProp, edit } = this.props;
    return (
      <table className="table">
        <tr>
          <th role="columnheader" className="colum-header">Description</th>
          <th role="columnheader" className="colum-header">Tag</th>
          <th role="columnheader" className="colum-header">Payment Method</th>
          <th role="columnheader" className="colum-header">Value</th>
          <th role="columnheader" className="colum-header">Currency</th>
          <th role="columnheader" className="colum-header">Currency value</th>
          <th role="columnheader" className="colum-header">Expense Total</th>
          <th role="columnheader" className="colum-header">Base currency</th>
          <th role="columnheader" className="colum-header">Edit/Delete</th>
        </tr>
        { expenses && expenses.map((expense) => (
          <tr key={ expense.id }>
            <td role="cell" className="colum-cell">
              { expense.description }
            </td>
            <td role="cell" className="colum-cell">
              { expense.tag }
            </td>
            <td role="cell" className="colum-cell">
              { expense.method }
            </td>
            <td role="cell" className="colum-cell">
              { parseFloat(expense.value).toFixed(2) }
            </td>
            <td role="cell" className="colum-cell">
              { expense.exchangeRates[expense.currency].name }
            </td>
            <td role="cell" className="colum-cell">
              { parseFloat(expense.exchangeRates[expense.currency].ask)
                .toFixed(2) }
            </td>
            <td role="cell" className="colum-cell">
              { parseFloat(expense.exchangeRates[expense.currency].ask * expense.value)
                .toFixed(2) }
            </td>
            <td role="cell" className="colum-cell">Real</td>
            <td>
              <button
                type="button"
                onClick={ () => editExpenseProp(expense.id) }
                data-testid="edit-btn"
                disabled={ edit || edit === 0 }
              >
                Edit
              </button>
              <button
                type="button"
                onClick={ () => this.handleDeleting(expense.id) }
                data-testid="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteExpenseProp: PropTypes.func.isRequired,
  editExpenseProp: PropTypes.func.isRequired,
  edit: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  user: PropTypes.string.isRequired,
};

Table.defaultProps = {
  edit: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseProp: (id) => { dispatch(deleteExpense(id)); },
  editExpenseProp: (id) => { dispatch(editExpense(id)); },
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses, edit: state.wallet.edit, user: state.user.email });

export default connect(mapStateToProps, mapDispatchToProps)(Table);

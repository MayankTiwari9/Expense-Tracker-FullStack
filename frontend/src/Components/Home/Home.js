import React from 'react'
import ExpenseForm from '../ExpenseForm/ExpenseForm'
import ExpenseList from '../ExpenseList/ExpenseList'

const Home = () => {
  return (
    <div>
      <ExpenseForm/>
      <ExpenseList/>
    </div>
  )
}

export default Home

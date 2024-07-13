import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Customer from './Components/CustomerTable/Customer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div  className='fixed top-0 left-0 right-0  back z-50 py-4'>
      <h1 className='text-amber-950 opacity-75 font-bold'>Customer Transactions</h1>
    </div>
     <Customer/>
     
    </>
  )
}

export default App

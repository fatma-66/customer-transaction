import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import icon from '../../assets/download.png';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);





export default function Customer() {
    const [customer, setcustomer] = useState([])
    const [transactions, settransactions] = useState([])
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [searchedName, setsearchedName] = useState('')
    const [searchedAmount, setsearchedAmount] = useState('')
    const [showModal, setShowModal] = useState(false);

 

    



async function getAllCustomers(){
    let response = await axios.get(`https://fatma-66.github.io/customer-transaction/db.json`)
    .then((response)=> response).catch((error)=>error)
    setcustomer(response.data)
   console.log(response.data);
}


async function getAllTransaction(){
    await axios.get('https://fatma-66.github.io/customer-transaction/db.json').then(response => {
        settransactions(response.data);
        console.log(response.data);
      });
}



  const handleSearch = (event) => {
    setsearchedName(event.target.value);
    

  };

  const handleSearchAmount = (event) => {
    setsearchedAmount(event.target.value);

  };

  const filteredCustomers = customer.filter(customer =>{
    const customerTransactions = transactions.filter(
        transaction => transaction.customer_id == customer.id 
    
      );
 
    //   const totalAmount = customerTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
    
      return (
        customer.name.toLowerCase().includes(searchedName.toLowerCase()) && customerTransactions.some(transaction => transaction.amount.toString().includes(searchedAmount))
    
        
    
        
      );
  }
  );





  const selectedCustomerTransactions = transactions?.filter(transaction => transaction.customer_id == (selectedCustomer ? selectedCustomer.id : null));

  const data = {
    labels: selectedCustomerTransactions.map(transaction => transaction.date),
    datasets: [
      {
        label: `Total Transactions for ${selectedCustomer ? selectedCustomer.name : ''}`,
        data: selectedCustomerTransactions.map(transaction => transaction.amount),
        fill: false,
        backgroundColor: 'rgba(94, 62, 35, 0.2)',
        borderColor: '#ab7421',
      },
    ],
  };





      const handleRowClick = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
      };

  useEffect(()=>{
    getAllCustomers()
    getAllTransaction()
    
   } , []);


 



    return <>

     


<div className='py-11 mt-10 '>
<form className='flex gap-4'>
  <label htmlFor="simple-search" className="sr-only">Search</label>
  <div className="relative w-full mb-10">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
</svg>

    </div>
    <input
     type="text"
      id="simple-search"
      value={searchedName}
      onInput={handleSearch}
    //   onChange={(e)=>setsearchedName(e.target.value)}
       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search customer name..." />
  </div>

  <label htmlFor="simple-search" className="sr-only">Search</label>
  <div className="relative w-full mb-10">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
</svg>

    </div>
    <input
     type="number"
      id="simple-search"
      value={searchedAmount}
      onInput={handleSearchAmount}
       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search by amount" />
  </div>
  </form>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg px-24 bg-gray-50">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
    <thead className="text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr   >
      <th scope="col" className="px-6 py-3">
          Id
        </th>

        <th scope="col" className="px-6 py-3">
          Customer name
        </th>
        <th scope="col" className="px-6 py-3 ps-14">
          Transactions
        </th>
        <th scope="col" className="px-6 py-3">
          Total transaction
        </th>
        <th scope="col" className="px-6 py-3">
          Charts
        </th>
      </tr>
    </thead>
    <tbody >
        {
            filteredCustomers?.map((customer)=>{ return <tr  key={customer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer">
                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {customer.id}.
                </th>
               
                <th  scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {customer.name}
                </th>
                
                <td className="px-6 py-4 text-black">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                 transactions?.filter(transaction => transaction.customer_id == customer.id)
                                 .map(trans => (
                                   <tr key={trans.id} className="bg-white">
                                     <td className="px-6 py-4 text-black">{trans.amount}</td>
                                     <td className="px-6 py-4 text-black">{trans.date}</td>
                                   </tr>
                                 ))
                            }
                        </tbody>
                    </table>
                </td>
                {/* zero is the initial value for the process */}
                <td className="px-6 py-4">
                  
                    {transactions.filter(transaction => transaction.customer_id == customer.id)
                        .reduce((sum, transaction) => sum + transaction.amount, 0)}
                  
                </td>
                <td>
                    <img src={icon} alt='chart graph' className='w-16' onClick={() => handleRowClick(customer)} />
                </td>
             </tr>
            })
        }
     
    
    </tbody>
  </table>


 





</div>


{showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-4 w-3/4">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700 hover:border-gray-800"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
            <Line data={data} />
          </div>
        </div>
      )}
</div>



    </>
}



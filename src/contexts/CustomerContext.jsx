import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let CustomerContext = createContext()


export default function CustomerContextProvider(props){
  const [Customer, setCustomer] = useState(null)

    function getTableCustomers(){
        return axios.get(`http://localhost:5000/customers`)
        .then((response)=> response).catch((error)=>error)
       
    }


    // const [userLogin, setuserLogin] = useState(null)
    // const [userData, setuserData] = useState([])

    useEffect(()=>{
    
    },[])

    return<>
    <CustomerContext.Provider  value={{getTableCustomers}}>
        {props.children}
    </CustomerContext.Provider>
    </>
}
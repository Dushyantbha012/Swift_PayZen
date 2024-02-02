import { React,useEffect,useState } from "react";
import axios from "axios";
function Balance() {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const fetchBalance = async () => {
        const res = await axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/account/balance",
            headers:{authorisation: localStorage.getItem("token") },
          });
          if(res.status===200){
            setBalance(res.data.balance)
          }
    };
    const repFetchBalance = ()=>{
        setInterval(fetchBalance,1000);
    }
    repFetchBalance();
  },[]);
  return <div className="w-full text-center text-3xl mb-4">Your Balance is {balance}</div>;
}

export default Balance;

'use client'
import Balance from "@/components/Balance";
import Identity from "@/components/Identity";
import Transaction from "@/components/Transaction";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";





export default function TransactionPage({ params }: { params: { grant_id: string } }) {
  const router = useRouter();

  const [identity, setIdentity] = useState({});
  const [balance, setBalance] = useState({});
  const [transactions, setTransactions] = useState([])
  const [option, setOption] = useState('');


  const API_BASE_URL = 'http://localhost:3001';

  const grant_id = params.grant_id;


  const getTransactions = async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/getTransaction/${grant_id}`);
      console.log(response.data);
      const data = response.data;
      const transactions = data.transactions;
      setTransactions(
        transactions 
      )
      setOption('transaction')
    } catch (error) {
      console.error("Error creating link:", error);
    }
  }

  const getBalance = async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/getBalance/${grant_id}`);
      console.log(response.data);
      const data = response.data;
      const account = data.accounts[0];
      setBalance({
        accountNumber : account.accountNumber,
        accountName : account.accountName,
        balance: account.balance,
        currency: account.currency
      })
      setOption('balance')
    } catch (error) {
      console.error("Error creating link:", error);
    }
  }

  const getIdentity = async ()=>{
    try {
      const response = await axios.get(`${API_BASE_URL}/getIdentity/${grant_id}`);
      console.log(response.data);
      const data = response.data;
      const account = data.accounts[0];
      const fiService = data.fiService;
      const owner = data.owner;
      setIdentity({
        accountNumber : account.accountNumber,
        accountName : account.accountName,
        balance: account.balance,
        currency: account.currency,
        bankName: fiService.name,
        address: owner.address,
        phone: owner.phone,
        birthday: owner.birthday,
        email: owner.email,
        sex: owner.sex,
      })
      setOption('identity')
    } catch (error) {
      console.error("Error creating link:", error);
    }
  }

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={getIdentity} variant="contained" color="primary" sx={{ mr: 2 }}>Định danh</Button>
        <Button variant="contained" sx={{ mr: 2 }} onClick={getBalance}>Số dư</Button>
        <Button onClick={getTransactions} sx={{ mr: 2 }} variant="contained">Giao dịch</Button>
        <Button onClick={()=>router.push('/')} variant="contained">Hủy</Button>
      </Box>
      {option === 'identity' && <Identity account={identity} />}
      {option === 'balance' && <Balance account={balance} />}
      {option === 'transaction' && <Transaction transactions={transactions} />}
    </main>
  );
}


'use client'
import Balance from "@/components/Balance";
import Identity from "@/components/Identity";
import Transaction from "@/components/Transaction";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Success() {
  const router = useRouter()
  const [transactions, setTransactions] = useState([])

  const urlParams = new URLSearchParams(window.location.search);
  const publicToken = urlParams.get('publicToken');


  const API_BASE_URL = 'http://localhost:3001';

  useEffect(()=>{
    const getAccessToken = async () => {
      try {
        await axios.post(`${API_BASE_URL}/publicToken`, {publicToken});
      } catch (error) {
        console.error("Error creating link:", error);
      }
    };
    getAccessToken();
  },[])

  if(!publicToken){
    return (
      <></>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Tạo liên kết ngân hàng thành công
      <Button onClick={()=>router.push('/')} variant="outlined">Thoát</Button>
    </main>
  );
}

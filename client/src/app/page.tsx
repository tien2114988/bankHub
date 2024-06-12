'use client'
import { Box, Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(){
  const route = useRouter();
  const [banks, setBanks] = useState([]);

  

  const getTransaction = (grant_id : any) =>{
    route.push(`/transaction/${grant_id}`);
  }



  const API_BASE_URL = 'http://localhost:3001';

  

  useEffect(()=>{
    const getAccessToken = async () => {
      try {
        const reponse = await axios.get(`${API_BASE_URL}/getGrantId`);
        setBanks(reponse.data);
      } catch (error) {
        console.error("Error creating link:", error);
      }
    };
    getAccessToken();
  })


  const router = useRouter()


  const createLink = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/createLink`);
      router.push(response.data);
    } catch (error) {
      console.error("Error creating link:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Typography variant="h4" gutterBottom>
        Danh sách ngân hàng
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="stretch" width="100%" maxWidth="300px" gap={2}>
        {banks.map((bank: any) => (
          <Button onClick={()=>getTransaction(bank.grant_id)} key={bank.grant_id} variant="outlined" fullWidth>
            {bank.grant_id}
          </Button>
        ))}
        <Button onClick={createLink} variant="contained" fullWidth>
          Thêm ngân hàng
        </Button>
      </Box>
    </main>
  );
}

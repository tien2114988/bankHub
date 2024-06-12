'use client'
import { Box, Button, Dialog, DialogContent, Grid, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home(){
  const route = useRouter();
  const [banks, setBanks] = useState([]);

  const API_BASE_URL = 'http://localhost:3001';

  const getTransaction = (grant_id : any) =>{
    route.push(`/transaction/${grant_id}`);
  }

  const deleteBank = (grant_id : any) =>{
    const removeGrant = async () => {
      try {
        const reponse = await axios.post(`${API_BASE_URL}/removeGrant/${grant_id}`);
      } catch (error) {
        console.error("Error creating link:", error);
      }
    };
    removeGrant();
  }

  

  

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

  if(banks.length === 0){
    return (
      <Box sx={{ p: 2, height: "100vh"}}>
        <Typography variant="h4" gutterBottom>
          Danh sách ngân hàng
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="stretch" width="100%" maxWidth="300px" gap={2}>
          Chưa có ngân hàng
          <Button onClick={createLink} variant="contained" fullWidth>
            Thêm ngân hàng
          </Button>
        </Box>
      </Box>
        
    );
  }

  return (
    <Box sx={{ p: 2, height: "100vh"}} alignItems="center">
      <Typography variant="h4" gutterBottom>
        Danh sách ngân hàng
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="stretch" width="100%" maxWidth="300px" gap={2}>
        {banks.map((bank: any) => (
          <Box key={bank.grant_id} display="flex" alignItems="center">
            <Button onClick={() => getTransaction(bank.grant_id)} variant="outlined" fullWidth>
              {bank.grant_id}
            </Button>
            <IconButton onClick={() => deleteBank(bank.grant_id)} color="error">
              <DeleteIcon/>
            </IconButton>
          </Box>
        ))}
        <Button onClick={createLink} variant="contained" fullWidth>
          Thêm ngân hàng
        </Button>
      </Box>
    </Box>
      
  );
}

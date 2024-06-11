'use client'
import { Button, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home(){
  const router = useRouter()

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
      <Button onClick={createLink} variant="contained">Tạo Link</Button>
    </main>
  );
}

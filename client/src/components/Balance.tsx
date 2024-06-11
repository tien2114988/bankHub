import { Typography, Grid, Box } from '@mui/material'
import React from 'react'

interface AccountProps{
    account : any
}

const Balance : React.FC<AccountProps> = ({account}) => {
    console.log(account);
  return (
    <>
        <Typography color="primary" id="view-student-modal-title" variant="h5" component="h2" sx={{ mt: 5, mb: 5 }}>
            Thông tin tài khoản
          </Typography>
            <Grid item xs={2} sx={{ ml: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Số tài khoản : <Box color="darkblue" component="span">{account.accountNumber}</Box>
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Tên tài khoản : <Box color="darkblue" component="span">{account.accountName}</Box>
              </Typography>
              <Typography  variant="h6" sx={{ mb: 1 }}>
                Số dư : <Box color="darkblue" component="span">{account.balance + ' ' + account.currency}</Box>
              </Typography>
            </Grid>
            
    </>
    
  )
}

export default Balance;
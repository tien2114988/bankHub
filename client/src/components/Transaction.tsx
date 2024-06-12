import page from '@/app/page'
import { Typography, Grid, Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

interface AccountProps{
    transactions : any
}

const Transaction : React.FC<AccountProps> = ({transactions}) => {
  return (
    <>
        <Typography color="primary" id="view-student-modal-title" variant="h5" component="h2" sx={{ mt: 5, mb: 5 }}>
            Thông tin giao dịch
        </Typography>
        <TableContainer
          sx={{
            mt: 3,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
            "& .MuiTable-root": {
              minWidth: "800px",
            },
            "& .MuiTableCell-root": {
              padding: {
                lg: "16px",
                md: "12px",
                sm: "8px",
                xs: "8px",
              },
              fontSize: {
                lg: "16px",
                md: "14px",
                sm: "12px",
                xs: "10px",
              },
            },
            "& .MuiTableHead-root": {
              backgroundColor: "#f5f5f5",
            },
            "& .MuiTableRow-head": {
              "& .MuiTableCell-root": {
                fontWeight: "bold",
              },
            },
            "& .MuiTableBody-root": {
              "& .MuiTableRow-root:nth-of-type(odd)": {
                backgroundColor: "#f9f9f9",
              },
            },
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography color="teal" variant="h6">
                    Số tài khoản
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="teal" variant="h6">
                    Số lượng
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="teal" variant="h6">
                    Ngày giao dịch
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="teal" variant="h6">
                    Mô tả
                  </Typography>
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .map((transaction: any) => (
                  <TableRow key={transaction.accountNumber}>
                    <TableCell>
                        <Typography variant="h6" fontWeight={600}>
                          {transaction.accountNumber}
                        </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={600}>
                        {transaction.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {transaction.transactionDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {transaction.description}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>
    
  )
}

export default Transaction;
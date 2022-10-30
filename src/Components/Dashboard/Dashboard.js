import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import { Paper, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import { tableHeaders } from './tableHeader';
import axios from 'axios';
import validateTime from './validateTime';


const Dashboard = () => {
  const [allBookingData, setAllBookingData] = useState('');
  const [bookingData, setBookingData] = useState('');
  const [totalBookings, setTotalBookings] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    axios.get('https://strikebots.bybrisk.com/boatrr/getallbookings').then(res=> {
    // axios.get('https://27eb-113-193-88-86.in.ngrok.io/boatrr/getallbookings').then(res=> {
    setAllBookingData(res.data.allBookings)
    setTotalBookings(res.data.totalBookings)})
  }, [])

  useEffect(() => {
    setBookingData(allBookingData.slice(0,rowsPerPage))
  }, [allBookingData,rowsPerPage])
  

  let nextContentFrom = 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    nextContentFrom = newPage * rowsPerPage;
    const nextContentTo = newPage * rowsPerPage + rowsPerPage; //2*25+25 = 75
    setBookingData(allBookingData.slice(nextContentFrom, nextContentTo))
  };
  
  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10));
    
    setPage(0);
  };
  

  return (
    <div 
    style={{
      minHeight: '100vh',
      display:'flex',
      justifyContent:'center',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'}}>
      <div style={{
        width: '90%',
        float: 'left',
        fontWeight: 'bold'
      }}>Total Bookings: {totalBookings}</div>
      <Paper sx={{ width: '90%', overflow: 'hidden' }} elevation='5'>
        <Table className='' aria-label="simple table">
        <TableHead>
          
          <TableRow>
            {
              tableHeaders.map((header, i)=>(
                <TableCell align="center" key={i} style={{fontWeight: 'bold'}}>{header}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {bookingData && bookingData.map((data, i)=>(
          <TableRow key={i}>
            <TableCell align="center">{data.orderDetails? data.orderDetails.bookingStatus : 'N/A'}</TableCell>
            <TableCell align="center">{data.username}</TableCell>
            <TableCell align="center">{data.riderPhone}</TableCell>
             <TableCell align="center">{data.rideDetails? data.rideDetails.rideDate : ''}</TableCell>
            <TableCell align="center">{data.rideDetails? data.rideDetails.rideTime : 'N/A'}</TableCell>
            <TableCell align="center">{data.rideDetails? data.rideDetails.rideRoute : 'N/A'}</TableCell>
            <TableCell align="center">{data.rideDetails? data.rideDetails.bookingPrice : 'N/A'}</TableCell>
            <TableCell align="center">{data.rideDetails? data.rideDetails.discountCode : 'N/A'}</TableCell>
            <TableCell align="center">{data && data.orderDetails && data.orderDetails.orderID? data.orderDetails.orderID : 'N/A'}</TableCell>
            {/* <TableCell align="center">{data.rideDetails? data.rideDetails.rideRoute : 'N/A'}</TableCell> */}
            <TableCell align="center">{validateTime(data.createdAt)}</TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalBookings}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
        
    </div>
  )
}

export default Dashboard
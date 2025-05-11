import { Navigate } from "react-router-dom"
import { useAuth } from "../auth"
import { Box, IconButton, Modal, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import api from "../api"
import type { Item, Order } from "../data"
import { DataGrid, type GridColDef, type GridRowParams } from "@mui/x-data-grid"
import CloseIcon from "@mui/icons-material/Close"

const columns: GridColDef[] = [
  { field: 'orderid', headerName: 'ID', width: 70 },
  { field: 'item name', headerName: 'Item name', width: 130 },
  { field: 'ordered number', headerName: 'Ordered number', width: 130 },
  { field: 'date', headerName: 'Date', width: 90, },
  { field: 'fulfillment', headerName: 'Fulfillment', width: 160  },
];

export default function() {
  const { token } = useAuth()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Order[]>()
  const [show, setShow] = useState<Item>();
  const paginationModel = { page: 0, pageSize: 5 };
  
  async function getOrders()
  {
    setLoading(true)
    try
    {
      const {data} = await api.get<Order[]>('/items')
      setData(data)
    }
    catch(e)
    {
      console.error(e)
    }
    setLoading(false)
  }

  async function getInfo(e:GridRowParams<any>)
  {
    setLoading(true)
    try
    {
      const {data} = await api.get<Item>('/item/' + e.id)
      setShow(data)
    }
    catch(e)
    {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => {
    if(token) getOrders()
  }, [token])


  if(!token) return <Navigate to="/signin" />
  return (
    <>
      <Modal
        open={Boolean(show)}
        onClose={() => setShow(undefined)}
        aria-labelledby="item-modal-title">
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}>
        <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="item-modal-title" variant="h6">
            Order Details
          </Typography>
          <IconButton size="small" onClick={() => setShow(undefined)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        {show && Object.entries(show).map(([key, value]) => (
          <Typography key={key} variant="body2" sx={{ mb: 0.5 }}>
            <strong>{key.replace(/_/g, ' ')}: </strong>{value}
          </Typography>
        ))}
        </Box>
      </Modal>
        
      <Paper sx={{ height: '100%', width: '100%',  }}>
        <DataGrid
          loading={loading}
          rows={data}
          columns={columns}
          getRowId={(row) => row.orderid}
          onRowClick={e => getInfo(e)}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  )
}
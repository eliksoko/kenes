import { Navigate, Route, Routes } from 'react-router-dom'
import Signin from './components/signin'
import Form from './components/form'
import AppBar from './components/nav'
import { Box } from '@mui/material'
import { useUtils } from './utils'

export default function App()
{
  const {isMobile} = useUtils()
  
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100vw',
      height:'100vh'
    }}>
      <Box sx={[{
        bgcolor: '#37474f',
        boxShadow: '10px 10px 5px rgba(0,0,0,.5)',
        overflow: 'hidden'
      }, isMobile ? {
        width:'100%',
        height:'100vh',
      }:{
        width:'auto',
        minWidth:'300',
        minHeight:'200',
        m:'auto',
        borderRadius: 10,
        border: 1,
        borderColor: '#607d8b'
      }]}>
        <AppBar sx={{bgcolor: '#607d8b'}}/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mx: 'auto',
            gap: 1,
            p: 4
          }}>
          <Routes>
              <Route index path="/" element={<Form />} />
              <Route path="signin" element={<Signin  />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Box>  
    </Box>  
  )
}
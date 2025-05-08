import { Navigate, Route, Routes } from 'react-router-dom'
import Signin from './components/signin'
import Signup from './components/signup'
import Form from './components/form'
import AppBar from './components/nav'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

export default function App() {
  // useAuth
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleSize = () => setWidth(window.innerWidth);
  const isMobile = width < 500;

  useEffect(() => {
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

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
        <Routes>
          <Route index path="/" element={<Form />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>  
    </Box>  
  )
}
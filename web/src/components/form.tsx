import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../auth"
import { Box, Button, Toolbar } from "@mui/material"
export default function() {
  const navigate = useNavigate()
    const { user, signIn, signUp, signOut } = useAuth()
    if (!user) return <Navigate to="/signin" />
    
    // const onLogout = ev => {
    //   ev.preventDefault()

    //   axiosClient.post('/logout')
    //     .then(() => {
    //       setUser({})
    //       setToken(null)
    //     })
    // }

    // useEffect(() => {
    //   axiosClient.get('/user')
    //     .then(({ data }) => {
    //       setUser(data)
    //     })
    // }, [])

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 8,
          mx: 'auto',
          gap: 1
        }}>
          
      </Box>
    )
}
import { Link, useLocation } from "react-router"
import { AppBar, Box, Button,  Toolbar, Typography, type SxProps } from "@mui/material"
import { useAuth } from "../auth"

export default function({sx}:{sx:SxProps}) {
    const {pathname} = useLocation()
    const {signOut, user} = useAuth()
    
    return (
        <AppBar position="static" sx={sx}>
            <Toolbar sx={{ display: 'flex', justifyItems: 'start' }}>
            {
                pathname.startsWith('/signin') ?
                <>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Sign in</Typography>
                    <Box sx={{ display: { sm: 'block' } }}>
                        <Link to="/signup" viewTransition>Create an account</Link>
                    </Box>
                </> : 
                pathname.startsWith('/signup') ? 
                <>
                    <Typography variant="h6" component="div" sx={{ flex: 1 }}>Create an account</Typography>
                    <Box sx={{ display: { sm: 'block' } }}>
                        <Link to="/signin" viewTransition>Sign in</Link>
                    </Box>
                </> :
                user && <Button color="inherit" onClick={() => signOut()}>Sign out</Button>
            }
            </Toolbar>
        </AppBar>
    )
}
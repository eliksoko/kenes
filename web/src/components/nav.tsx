import { useLocation } from "react-router"
import { AppBar, Button,  Toolbar, Typography, type SxProps } from "@mui/material"
import { useAuth } from "../auth"

export default function({sx}:{sx:SxProps}) {
    const {pathname} = useLocation()
    const {token, signOut} = useAuth()
    
    return (
        <AppBar position="static" sx={sx}>
            <Toolbar sx={{ display: 'flex', justifyItems: 'start' }}>
            {
                pathname.startsWith('/signin') ?
                <>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Sign in</Typography>
                </> : 
                pathname.startsWith('/signup') ? 
                <>
                    <Typography variant="h6" component="div" sx={{ flex: 1 }}>Create an account</Typography>
                </> :
                token && <Button color="inherit" onClick={() => signOut()}>Sign out</Button>
            }
            </Toolbar>
        </AppBar>
    )
}
import { AuthProvider } from './auth'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { createTheme, ThemeProvider } from '@mui/material'
import { blueGrey, deepOrange } from '@mui/material/colors';
import App from './App'
import './index.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blueGrey[500],
      contrastText: '#fff', 
    },
    error: {
      main: deepOrange[500],
      contrastText: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  }
});

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
        </BrowserRouter>
    </AuthProvider>
)

import { Navigate, useNavigate } from "react-router-dom";
import { Button, Box, FormHelperText, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "../data";
import { useAuth } from "../auth";

export default function()
{
  const navigate = useNavigate();
  const {token,signIn} = useAuth();
  const {loading,submit,errors,values,setValues} = useForm({ 
    username: '', 
    password: '',
    showPassword: false
  })
  if(token) return <Navigate to="/" />
  return (
    <Box
      component="form"
      onSubmit={e => submit(e, async function()
      {
        const {username, password} = values
        const error = await signIn(username, password)
        if(error) return error
        navigate('/')
      })}
      noValidate
      display='contents'
      autoComplete='off'>
      <TextField
        required
        label="Username"
        type="username"
        size="small"
        value={values.username}
        onChange={e => setValues({ ...values, username: e.target.value })}
        error={Boolean(errors.username)}
        helperText={errors.username ?? ' '}
        variant="outlined"
      />
      <TextField
        required
        label="Password"
        variant="outlined"
        size="small"
        error={Boolean(errors.password)}
        helperText={errors.password ?? ' '}
        type={values.showPassword ? "text" : "password"}
        value={values.password}
        onChange={e => setValues({ ...values, password: e.target.value })}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={values.showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setValues({ ...values, showPassword: !values.showPassword })}
                  edge="end">
                {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <FormHelperText error={Boolean(errors.data)} sx={{ minHeight: '2em' }}>{errors?.data && errors.data}</FormHelperText>
      <Button loading={loading} type="submit" variant="contained" sx={{m:'auto'}}>Login</Button>
    </Box>
  )
}
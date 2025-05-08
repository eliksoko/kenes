import { useNavigate } from "react-router-dom";
import { type ChangeEvent, type SyntheticEvent } from "react";
import { useState } from "react";
import { useAuth } from "../auth";
import Button from '@mui/material/Button';
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validate, type Errors, type Values } from "../data";
import api from "../api";

export default function()
{
  const navigate = useNavigate();
  const {signIn} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<Values>({
    username: '',
    password: '',
    showPassword: false,
  });
  
  const handleChange = (type:string, e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
    setValues({ ...values, [type]: e.target.value });

  const handleCheckbox = () => 
    setValues({ ...values, showPassword: !values.showPassword });

  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    setLoading(true)
    const errors = validate(values)
    if (Object.keys(errors).length === 0) {
      const error = await signIn(values)
      if(error) errors.data = error
      else navigate('/')
    }
    setErrors(errors);
    setLoading(false);
  }
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        gap: 1,
        p: 8
      }}>
      <TextField
        required
        label="Username"
        type="username"
        size="small"
        value={values.username}
        onChange={e => handleChange('username', e)}
        error={Boolean(errors.username)}
        helperText={errors.username ?? " "}
        variant="outlined"
      />
      <TextField
        required
        label="Password"
        variant="outlined"
        size="small"
        error={Boolean(errors.password)}
        helperText={errors.password || ' '}
        type={values.showPassword ? "text" : "password"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={values.showPassword ? 'Hide password' : 'Show password'}
                  onClick={handleCheckbox}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        value={values.password}
        onChange={e => handleChange('password', e)}
      />
      <Button loading={loading} type="submit" variant="contained" sx={{m:'auto'}}>Login</Button>
    </Box>
  )
}
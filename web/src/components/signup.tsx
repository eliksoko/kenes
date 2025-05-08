

import {Link, useNavigate} from "react-router-dom";
import {createRef, useState, type ChangeEvent, type SyntheticEvent} from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Typography, TextField, FormControl, InputLabel, FilledInput, InputAdornment, IconButton, Button, OutlinedInput, FormHelperText } from "@mui/material";
import axios from "axios";
import { validate, type Errors, type Values } from "../data";
import { useAuth } from "../auth";
import api from "../api";
// import {useStateContext} from "../context";
// import MainLayout from "./components/main";

export default function()
{
  const navigate = useNavigate();
  const {signIn} = useAuth()
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
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
      p: 8,
    }}>
      
    <TextField
      label="Name"
      type="name"
      size="small"
      value={values.name}
      onChange={e => handleChange('name', e)}
      error={Boolean(errors.name)}
      helperText={errors.name ?? ' '}
      variant="outlined"
    />

    <TextField
      required
      label="Email"
      type="email"
      size="small"
      value={values.email}
      onChange={e => handleChange('email', e)}
      error={Boolean(errors.email)}
      helperText={errors.email ?? ' '}
      variant="outlined"
    />
    <TextField
      required
      label="Password"
      variant="outlined"
      size="small"
      error={Boolean(errors.password)}
      helperText={errors.password || ' '}
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
      <Button type="submit" variant="contained" sx={{m:'auto'}}>Create</Button>
    </Box>
  )
}
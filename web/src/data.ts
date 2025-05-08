

export interface User
{
  username: string
  password: string
}

export interface Values 
{
  username: string
  password: string
  showPassword: boolean
}

export interface Errors 
{
  username?: string
  password?: string
  data?: string
}

export const validate = (values:Values) => {
    const errors:Errors = {};
    if(import.meta.env.REACT_DEBUG){
      if (!values.username) errors.username = 'Username is required';
      if (!values.password) errors.password = 'Password is required';
      if (values.password.length < 6) errors.password = 'Password is too short';
    }
    return errors;
  }
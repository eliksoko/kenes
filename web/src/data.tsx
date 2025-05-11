import { useState, type FormEvent } from "react"

export interface Order
{
  orderid: number
  'item name':string
  'ordered number':number
  date:string
  fulfillment:string
}
export interface Item
{
  orderid: number
  item_name:string
  ordered_number:number
  price_per_unit:string
  total_price:string
  customer_name:string
  shipping_address:string
  date_ordered:string
  estimated_delivery:string
  fulfillment_status:string
  tracking_number:number
}

export interface Values 
{
  username: string
  password: string
  password2?: string
  showPassword: boolean
  showPassword2?: boolean
}

export interface Errors 
{
  username?: string
  password?: string
  password2?: string
  data?: string
}

export function validate(values:Values)
{
    const errors:Errors = {};
    if(!import.meta.env.REACT_DEBUG){
      if (!values.username) errors.username = 'Username is required';
      if (!values.password) errors.password = 'Password is required';
      if (values?.password2 && values.password2 != values.password) errors.password2 = 'Password validate should match';
    }
    return errors;
}

export function useForm(valuesDefault:Values)
{
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<Values>(valuesDefault);
  async function submit(e:FormEvent, callback:() => Promise<string|undefined>)
  {
    e.preventDefault()
    setLoading(true)
    const errors = validate(values)
    if(Object.keys(errors).length === 0) 
    {
      const error = await callback()
      if(error) errors.data = error
    }
    setErrors(errors)
    setLoading(false)
  }
  return {loading,submit,errors,values,setValues}
}
import React ,{useState}from 'react';
import {FormProps, CloneFormElementProps} from './index.d'
import {FormStore} from './form-api'

import FormItem from './components/form-item/index.tsx'




const FormList = ({fieldsRender=()=>{}}) => {
const [fields, setFields] = useState();

const add=(field)=>{
  setFields(()=>{

  })
}

  return <>
    {fieldsRender(fields,{})}
  </>
}


export default FormList;

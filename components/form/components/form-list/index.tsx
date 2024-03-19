import React, {forwardRef, useEffect, useState} from 'react';
import {FormProps, CloneFormElementProps} from './index.d'
import {FormStore} from './form-api'

import FormItem from './components/form-item/index.tsx'




const FormList =forwardRef( ({children=()=>{}},ref) => {
const [fields, setFields] = useState([{restField:{}}]);

const add=(field)=>{
  setFields((pre)=>{

    return [...pre,{restField:{}}]
  })

  console.log('add')
}
useEffect(()=>{
  console.log(fields)
},[fields])

  const remove =(name)=>{
    setFields((pre)=>{

      return pre.filter((_,index)=>{index===0})
    })
  }
  return <>
    {children(fields,{remove ,add})}
  </>
})


export default FormList;

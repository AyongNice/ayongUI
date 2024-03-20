import React, {forwardRef, useEffect, useState} from 'react';
import {FormProps, CloneFormElementProps} from './index.d'
import {FormStore} from './form-api'
import {generateUUID} from '../../../../utils/index.ts'
import FormItem from './components/form-item/index.tsx'


const FormList = forwardRef((props, ref) => {
  const [fields, setFields] = useState([{restField: {}, key: generateUUID()}]);
  const {
    onChange = () => {

    },
    children = () => {
    }
  } = props

  const add = (field) => {
    setFields((pre) => {

      return [...pre, {restField: {}, key: generateUUID()}]
    })


  }
  useEffect(() => {
    console.log(fields)
  }, [fields])

  const remove = key => {
    console.log('remove', key)
    setFields(pre => pre.filter(_ => key !== _.key))
  }
  return <>
    {children(fields, {remove, add, props: {...props, ref}})}
  </>
})

FormList.displayName= 'FormList'
export default FormList;

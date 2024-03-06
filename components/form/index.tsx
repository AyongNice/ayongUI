import React, {useEffect, useState} from 'react'

import fromStyle from './index.module.less'

import {useWatch, useForm} from './form-api'

import FormItem from './components/form-item/index.tsx'

const Form = ({
                name,
                style,
                form = {},
                labelCol,
                disabled = false,
                formLayout = 'right',
                wrapperCol,
                initialValues = {},
                onFinishFailed,
                autoComplete,
                children,
                submit = () => {
                },
                onFinish = () => {
                },

                onValuesChange = () => {
                },
              }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errorInfo, setErrorInfo] = useState({errorFields: []});
  const handleFormChange = (name, value) => {
    // 更新表单数据对象
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // useWatch(formData, handleFormChange);
  useEffect(() => {
    onValuesChange(formData)
  }, [formData])
  const handleSubmit = (e) => {
    e.preventDefault();


    if (errorInfo.errorFields.length) {
      return onFinishFailed(errorInfo)
    } else {
      onFinish()
    }
    submit(formData);
    console.log('Form submitted with data:', formData);
  };
  const _onFinishFailed = (field) => {
    setErrorInfo((prevState) => {
      prevState.errorFields.push(field)
      return prevState
    })
  };

  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {formLayout, disabled, onChange: handleFormChange, _onFinishFailed});
    }
    return child;
  });
  const [fromDate, setFromDate] = useState<object>()


  return (
    <form
      name={name}
      style={style}
      onSubmit={handleSubmit}
      className={formLayout === 'inline' ? fromStyle.formFlexWrap : ''}
      autoComplete={autoComplete}
    >
      {clonedChildren}
    </form>
  );
};

Form.Item = FormItem;
Form.useForm = useForm;
Form.useWatch = useWatch;
export default Form;


import React, {useEffect, useRef, useState} from 'react'

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


  const _fromDate = {...initialValues}
  const itemRef = {};
  const handleFormChange = (name, value) => {
    // 更新表单数据对象
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const clonedChildren = React.Children.map(children, child => {
//给formData 默认值

    if (React.isValidElement(child)) {
      console.log(child.props)
      _fromDate[child.props.name] = '';
      itemRef[child.props.name] = React.createRef();
      return React.cloneElement(child, {
        ref: itemRef[child.props.name],
        formLayout,
        disabled,
        onChange: handleFormChange,
        _onFinishFailed
      });
    }
    return child;
  });
  console.log('_fromDate:', _fromDate)

  const [formData, setFormData] = useState(_fromDate);
  const [errorInfo, setErrorInfo] = useState({errorFields: []});


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
//循环formData 判断对象里面的值是否为空 就调用 onFinishFailed
    //
    // if (itemRef.current) {
    //   console.log('itemRef.current:', itemRef.current);
    // }
    for (let key in formData) {
      if (!formData[key]) {
        // onFinishFailed({errorFields: [{name: key, errors: '不能为空'}]})
        itemRef[key].current.onRequired()
      }
    }


    submit(formData);
    console.log('Form submitted with data:', formData);
  };
  const _onFinishFailed = (type, field) => {
    console.log('from==_onFinishFailed:')
    setErrorInfo((prevState) => {

      if (type === 'push' && !prevState.errorFields.filter(_ => _.name === field.name).length) {
        prevState.errorFields.push(field)
      }
      if (type === 'out') {
        prevState.errorFields = prevState.errorFields.filter(_ => _.name !== field.name)
      }
      return prevState
    })
  };
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


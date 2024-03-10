import React, {useEffect, useRef, useState, createRef, useImperativeHandle, useMemo, forwardRef} from 'react'

import fromStyle from './index.module.less'

import {FormStore, useForm} from './form-api'

import FormItem from './components/form-item/index.tsx'

// useForm.js


const FormContext = React.createContext();

const CloneElement = forwardRef(({
                                   children,
                                   _fromDate,
                                   initialValues,
                                   onChange,
                                   formLayout,
                                   disabled,
                                   _onFinishFailed,
                                   errorInfo
                                 }, ref) => {
  const itemRef = useRef({});

  const onReset = () => {
    for (let key in _fromDate) {
      console.log('formUpDateValue:' + key, _fromDate[key], itemRef[key])

      if (itemRef[key].current) {
        // onFinishFailed({errorFields: [{name: key, errors: '不能为空'}]})
        itemRef[key].current.onReset()
      }
    }
  }

  const onVerify = () => {
    for (let key in _fromDate) {
      itemRef[key].current.onVerify()
    }
  }

  useImperativeHandle(ref, () => ({onReset, onVerify}));

  const clone = React.Children.map(children, (child: React.FC, index: number) => {
//给formData 默认值
    if (React.isValidElement(child)) {
      if (child.props.name) {

        if (['Radio', 'Switch'].includes(child?.props?.children.type?.displayName)) {
          _fromDate[child.props.name] = initialValues[child.props.name] || false;
        } else {
          // if (child?.props?.children.type?.displayName === 'Input')
          _fromDate[child.props.name] = initialValues[child.props.name] || '';
        }

        itemRef[child.props.name] = React.createRef();
      }
      return React.cloneElement(child, {
        ref: itemRef[child.props.name],
        formLayout,
        disabled,
        _fromDate,
        onChange,
        _onFinishFailed,
        errorInfo,
      });
    }
    return child;
  });
  return clone
});

const Form = React.forwardRef(({
                                 name,
                                 style,
                                 form = {},
                                 children,
                                 wrapperCol,
                                 initialValues = {},
                                 autoComplete,
                                 disabled = false,
                                 formLayout = 'right',
                                 submit = () => {
                                 },
                                 onFinish = () => {
                                 },
                                 onFinishFailed = () => {
                                 },
                                 onValuesChange = () => {
                                 },
                               }, ref) => {


  const _fromDate = {...initialValues}


  /**
   * 表单项值变化时的回调
   * @param name
   * @param value
   */
  const handleFormChange = (name, value) => {
    // 更新表单数据对象
    setFormData(prevData => {
        return {
          ...prevData,
          [name]: value
        }
      }
    );

  };
  const [errorInfo, setErrorInfo] = useState({errorFields: []});

  /**
   * 表单项校验失败的回调 传递给FormItem 组件调用触发
   * @param type
   * @param field
   */
  const _onFinishFailed = (type, field) => {
    setErrorInfo(prevState => {
      // 创建一个新的错误信息对象
      const newErrorInfo = {...prevState};

      if (type === 'remove') {
        // 移除指定字段
        newErrorInfo.errorFields = prevState.errorFields.filter(item => item.name !== field.name);
      }
      if (type === 'add') {
        // 添加或替换指定字段
        const existingFieldIndex = prevState.errorFields.findIndex(item => item.name === field.name);
        if (existingFieldIndex === -1) {
          // 如果字段不存在，则直接添加
          newErrorInfo.errorFields.push(field);
        } else {
          // 如果字段已存在，则替换
          newErrorInfo.errorFields[existingFieldIndex] = field;
        }
      }


      return newErrorInfo;
    });
  };

  const itemRef = useRef({});
//   const clonedChildren = React.Children.map(children, (child: React.FC, index: number) => {
// //给formData 默认值
//     if (React.isValidElement(child)) {
//       if (child.props.name) {
//
//         if (['Radio', 'Switch'].includes(child?.props?.children.type?.displayName)) {
//           _fromDate[child.props.name] = initialValues[child.props.name] || false;
//         } else {
//           // if (child?.props?.children.type?.displayName === 'Input')
//           _fromDate[child.props.name] = initialValues[child.props.name] || '';
//         }
//
//         itemRef[child.props.name] = React.createRef();
//       }
//       return React.cloneElement(child, {
//         ref: itemRef[child.props.name],
//         formLayout,
//         disabled,
//         _fromDate,
//         onChange: handleFormChange,
//         _onFinishFailed,
//         errorInfo,
//       });
//     }
//     return child;
//   });

  /**
   * FormStore 实例 变化的回调函数
   * @param store
   */
  const formUpDateValue = (store, type) => {
    setFormData(store);
    if (type === 'reset') {
      itemRef.current.onReset()
      // for (let key in store) {
      //   console.log('formUpDateValue:' + key, store[key], itemRef[key])
      //
      //   if (!store[key] && itemRef[key].current) {
      //     // onFinishFailed({errorFields: [{name: key, errors: '不能为空'}]})
      //     itemRef[key].current.onReset()
      //   }
      // }
    }

  }

  const [formInstance] = useForm(form);


  // console.log('formInstance:', formInstance)


  const [formData, setFormData] = useState();


  let formRef = useRef(null);
  // 将回调函数注册到 `FormStore` 实例上


  const resetFields = () => {
    setFormData(_fromDate);
    setErrorInfo({errorFields: []});
    console.log('form===resetFields')
    for (let key in formData) {

      // itemRef[key].current.onVerify()
    }
    // formRef.current && formRef.current.resetFields();
  };


  /**
   * 初始化表单数据
   */
  useEffect(() => {
    setFormData(_fromDate);
  }, [])

  /**
   *
   */
  useEffect(() => {
    formData && onValuesChange(formData)
    if (formInstance.getInternalHooks) {
      const {setCallbacks, setInitialValues, updateValue} = formInstance.getInternalHooks(formUpDateValue, submit);
      setInitialValues(formData)
    }
  }, [formData])


  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    itemRef.current.onVerify()

    setIsSubmiting(true);

  };

  useEffect(() => {

    setIsSubmiting(false);
    if (errorInfo.errorFields.length && isSubmiting) {
      onFinishFailed(errorInfo)

    } else {

      if (isSubmiting) {
        onFinish()
        submit(formData);
      }

    }

  }, [errorInfo.errorFields, isSubmiting])

  // 使用 useMemo 防止重复创建
  const fieldContextValue = useMemo(
    () => ({...formInstance}),
    [formInstance]
  );

  return (

    <form
      name={name}
      style={style}
      onSubmit={handleSubmit}
      className={formLayout === 'inline' ? fromStyle.formFlexWrap : ''}
      autoComplete={autoComplete}
      onReset={e => {
        e.preventDefault();
        // formInstance.resetFields();
        // onReset && onReset(e);
      }}
    >
      <FormContext.Provider value={fieldContextValue}>
        <CloneElement
          ref={itemRef}
          onChange={handleFormChange}
          children={children}
          _fromDate={_fromDate}
          formLayout={formLayout}
          disabled={disabled}
          _onFinishFailed={_onFinishFailed}
          initialValues={initialValues}
        />
      </FormContext.Provider>
    </form>

  );
});


Form.Item = FormItem;
Form.useForm = useForm;

export default Form;


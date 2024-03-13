import React, {useEffect, useRef, useState, createRef, useImperativeHandle, useMemo, forwardRef} from 'react'

import fromStyle from './index.module.less'

import {FormStore, useForm} from './form-api'

import FormItem from './components/form-item/index.tsx'

// useForm.js
import {FormProps, CloneFormElementProps} from './index.d'

const FormContext = React.createContext();

const CloneElement = forwardRef(({
                                   form,
                                   children,
                                   _fromDate,
                                   labelWidth,
                                   initialValues,
                                   onChange,
                                   formLayout,
                                   disabled,
                                   _onFinishFailed,
                                   errorInfo
                                 }: CloneFormElementProps, ref) => {
  const itemRef = useRef({});

  /**
   * 表单项值变化时的回调
   */
  const [formInstance] = useForm(form);

  /**
   * 重置表单
   */
  const onReset = () => {
    for (let key in _fromDate) {
      if (itemRef[key].current) {
        itemRef[key].current.onReset()
      }
    }
  }


  /**
   * 设置表单数据
   * @param fromDate
   */
  const onSet = (fromDate): void => {
    for (let key in fromDate) {
      if (itemRef[key] && itemRef[key].current) {
        itemRef[key].current.onSet(fromDate[key])
      }
    }
  }


  /**
   * 表单项校验
   */
  const onVerify = () => {
    for (let key in _fromDate) {
      itemRef[key].current.onVerify()
    }
  }

  useImperativeHandle(ref, () => ({onReset, onVerify, onSet}));

  const clone: React.FC = React.Children.map(children, (child: React.FC, index: number) => {
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
        form,
        labelWidth,
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
                                 labelWidth = '100px',
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
                               }: FormProps, ref: React.Ref<any>) => {

//  初始化表单数据内部数据
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

  // 错误信息
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

//组件ref
  const itemRef = useRef({});

  /**
   * FormStore 实例 变化的回调函数
   * @param store
   */
  const formUpDateValue = (store, type) => {
    setFormData(store);
    console.log('form===UpDateValue:---', store, type)
    if (type === 'reset') {
      itemRef.current.onReset()

    }
    if (type === 'set') {


      itemRef.current.onSet(store)
    }

  }
//  store 实例
  const [formInstance] = useForm(form);

  // 表单数据
  const [formData, setFormData] = useState();

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

      const {setInitialValues} = formInstance.getInternalHooks();
      setInitialValues(formData)
    }
  }, [formData])


  //每次运行 effect 时，都会创建新的 formInstance.getInternalHooks 将formUpDateValue数据监听回掉方式传递给formStore
  useEffect(() => {
    formInstance.getInternalHooks(formUpDateValue)
  })

  /**
   * 是否点击了提交按钮
   * 因为要在useEffect监听errorInfo.errorFields 和value的变化
   * 所以要用useState维持一个全局状态
   */
    // 是否点击了提交按钮  因为要监听errorInfo.errorFields的变化  所以要用useState维持一个状态
  const [isSubmiting, setIsSubmiting] = useState(false);


  /**
   * 提交表单
   * @param e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    itemRef.current.onVerify()
    setIsSubmiting(true);
  };

  /**
   * 监听错误信息和表单数据的变化 用于触发 onFinishFailed 和 onFinish
   */
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

  /**
   * 表单上下文
   */
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
      }}
    >
      <FormContext.Provider value={fieldContextValue}>
        <CloneElement
          ref={itemRef}
          form={form}
          labelWidth={labelWidth}
          onChange={handleFormChange}
          children={children}
          _fromDate={_fromDate}
          fromData={formData}
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


import React, {useEffect, useRef, useState, createRef, useImperativeHandle, useMemo} from 'react'

import fromStyle from './index.module.less'

import {useWatch} from './form-api'

import FormItem from './components/form-item/index.tsx'

// useForm.js
export class FormStore {
  constructor() {
    this.store = {};
    this.callbacks = Object.create(null);
    this.initialValues = {};
    this.fieldEntities = [];
    this.update = () => {

    }
  }

  // 通过 `useForm` 方法暴露出去的字段
  getForm = () => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    submit: this.submit,
    resetFields: this.resetFields,
    getInternalHooks: this.getInternalHooks,
  });
  // 封装一些内部 Hooks，挂到 `getForm` 下
  getInternalHooks = (update: Function = () => {
  }) => {

    this.updateValue = update;
    return {
      updateValue: this.updateValue,
      setInitialValues: this.setInitialValues,
      setCallbacks: this.setCallbacks,
      initEntityValue: this.initEntityValue,
      registerField: this.registerField,
    };

  }

  // 注册回调
  setCallbacks = callbacks => {
  };
  // 注册表单初始值
  setInitialValues = initialValues => {
    this.store = {...initialValues};
  };
  // 注册实例后，设置表单初始值
  initEntityValue = entity => {
  };
  // 注册实例
  registerField = entity => {


  };
  getFieldEntities = () => {
  };
  // 通知更新
  notifyObservers = (prevStore, nameList, info) => {
  };

  updateValue = (name, newValue) => {
  };

  // form actions，提交、校验、重置等方法
  submit = () => {
  };
  updateValue = (name, value) => {
    return this.store
  }
  // 重置所有字段
  resetFields = (): void => {
    for (let key in this.store) {
      this.store[key] = '';
    }
    this.updateValue(this.store)
    console.log('FormStore----resetFields:', this.store)

  };
}

const useForm = (form: any) => {
  // 使用 ref 防止重复创建
  const formRef = useRef();

  if (!formRef.current) {
    if (form) {
      // 传入初始值的时候直接使用这个创建好的示例
      formRef.current = form;
    } else {
      // 否则新建一个示例并挂到 formRef 下
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
};
const FormContext = React.createContext();
const Form = React.forwardRef(({
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
                               }, ref) => {


  const _fromDate = {...initialValues}
  const itemRef = {};


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


  const clonedChildren = React.Children.map(children, (child: React.FC, index: number) => {
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
        onChange: handleFormChange,
        _onFinishFailed,
        errorInfo,
      });
    }
    return child;
  });

  const [errorInfo, setErrorInfo] = useState({errorFields: []});


  const [formInstance] = useForm(form);


  // console.log('formInstance:', formInstance)


  // // 使用 ref 确保只执行一次
  // const mounted = useRef(false);
  // // 初次渲染时注册表单初始值
  // if (!mounted.current) {
  //   initialValues && setInitialValues && setInitialValues(initialValues);
  //   mounted.current = true;
  // }

  // 使用 useMemo 防止重复创建
  const fieldContextValue = useMemo(
    () => ({...formInstance}),
    [formInstance]
  );
  const [formData, setFormData] = useState();


  let formRef = useRef(null);
  // 将回调函数注册到 `FormStore` 实例上


  const resetFields = () => {
    setFormData(_fromDate);
    setErrorInfo({errorFields: []});
    console.log('form===resetFields')
    for (let key in formData) {

      if (formData[key]) {
        // onFinishFailed({errorFields: [{name: key, errors: '不能为空'}]})
        itemRef[key].current.onReset()
      }
    }
    // formRef.current && formRef.current.resetFields();
  };


  /**
   * FormStore 实例 变化的回调函数
   * @param store
   */
  const formUpDateValue = (store) => {
    console.log('formUpDateValue:--form', store)

    setFormData(store);

    for (let key in store) {
      if (!store[key]) {
        // onFinishFailed({errorFields: [{name: key, errors: '不能为空'}]})
        itemRef[key].current.onReset()
      }
    }
  }

  useEffect(() => {

    console.log('formUpDateValue:-[] ,useEffect', _fromDate)
    setFormData(_fromDate);
  }, [])
  useEffect(() => {

    formData && onValuesChange(formData)
    if (formInstance.getInternalHooks) {
      const {setCallbacks, setInitialValues, updateValue} = formInstance.getInternalHooks(formUpDateValue);

      setInitialValues(formData)
    }

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

      console.log(formData[key])
      if (!formData[key]) {
        // onFinishFailed({errorFields: [{name: key, errors: '不能为空'}]})
        itemRef[key].current.onRequired()
      }
    }


    submit(formData);
  };
  const _onFinishFailed = (type, field) => {
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
      onReset={e => {
        e.preventDefault();
        formInstance.resetFields();
        onReset && onReset(e);
      }}
    >
      <FormContext.Provider value={fieldContextValue}>
        {clonedChildren}
      </FormContext.Provider>
    </form>

  );
});


Form.Item = FormItem;
Form.useForm = useForm;
Form.useWatch = useWatch;

export default Form;


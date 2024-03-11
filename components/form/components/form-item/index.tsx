import React, {useState, useImperativeHandle, useEffect, useRef} from "react";
import fromStyle from '../../index.module.less'

const requiredPrompt: string = '为必选字段';
const maxLengthPrompt: string = '长度不能超过';
const reactCloneElement = ({child, value, disabled, onChange}) => {
  return React.cloneElement(child, {
    value,
    disabled,
    onChange,
  });
}

const FormItem = React.forwardRef(({
                                     label,
                                     name,
                                     style,
                                     labelWidth = '100px',
                                     rules = [],
                                     disabled,
                                     children,
                                     _fromDate,
                                     formLayout = 'right',
                                     errorInfo,
                                     onChange = () => {
                                     },
                                     _onFinishFailed = () => {
                                     },
                                   }, ref) => {
  let _textAlian = formLayout;
  let _display = 'flex';
  if (formLayout === 'vertical') {
    _textAlian = 'left';
    _display = 'inline';
  }
  const rulesMap = {
    required: {},
    maxLength: {},
    minLength: {},
    max: {},
    min: {},
  }
  if (!Array.isArray(children) && label && children.type.name !== 'Button') {

    rules.forEach(_ => {

      const keys = Object.keys(_);
      if (keys.includes('validator')) {
        rulesMap.validator = _.validator;
        //如果是自定义校验 则不需要其他校验
        return;
      }
      if (keys.includes('required')) {
        rulesMap.required.value = _.required;
        rulesMap.required.message = _.message;
      }

      if (keys.includes('max')) {
        rulesMap.max.value = _.max;
        rulesMap.max.message = _.message;
      }

      if (keys.includes('maxLength')) {
        rulesMap.maxLength.value = _.maxLength;
        rulesMap.maxLength.message = _.message;
      }

    })
  }

  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState(_fromDate[name] || '');
  // console.log('errorInfo', errorInfo)


  /**
   * MaxLength 校验
   * @param value 输入值
   */
  const onVerifyMaxLength = (value: string | boolean): string => {
    let message = '';
    //maxLength 校验
    if (rulesMap.maxLength.value) {
      // console.log('maxLength', rulesMap.maxLength.value, value.length)
      if (children.type.name === 'Input' && value.length > rulesMap?.maxLength.value) {
        message = rulesMap?.maxLength.message || maxLengthPrompt + rulesMap?.maxLength.value;
        _onFinishFailed('add', {name, errors: message})
      } else {
        message = ''
        _onFinishFailed('remove', {name, errors: message})
      }

      return message;
    }
    return '';

  }

  //必选项校验
  const onVerifyRequired = async (value: string | boolean) => {
    console.log('onVerifyRequired:', rulesMap.validator)
    let errors: string | Object = '';
    if (rulesMap.required.value) {

      if (value) {
        errors = onVerifyMaxLength(value)
        console.log('onVerifyRequired---message:', name, errors)
        if (errors) {
          _onFinishFailed('add', {name, errors})
        } else {
          _onFinishFailed('remove', {name, errors: rulesMap.required.message || name + requiredPrompt})
        }
      } else {
        errors = rulesMap?.required.message || label + requiredPrompt;
        _onFinishFailed('add', {name, errors})
      }
      // console.log('onVerifyRequired---message:', name, message)

    }
    if (typeof rulesMap.validator === 'function') {
      try {
        errors = await rulesMap.validator(name, value);
        _onFinishFailed('remove', {name, errors})
      } catch (error) {
        errors = error;
        console.log('onVerifyRequired---message:', error)
        _onFinishFailed('add', {name, errors})
      }
    }
    setErrorMessage(errors);
  }


  /**
   * 组件value改变触发
   * @param value  子组件值
   */
  const handleChange = (value) => {
    setValue(value);
    onChange(name, value); // 调用父组件传递过来的 onChange 方法，并传递名称和值
  };


  /**
   * 暴露给父组件的方法 用于 总体校验
   */
  const onVerify = () => {
    //button  多个children 不需要校验
    if (!Array.isArray(children) && children.type.name !== 'Button') {


      //required 校验
      onVerifyRequired(value)

    }
  }
  const isResetting = useRef(false); // 标志位表示是否是通过 onReset 触发的校验
  /**
   * 暴露给父组件的方法 重置数据
   */
  const onReset = () => {
    isResetting.current = true;

    setValue('');
    setErrorMessage('');
    console.log('onReset:', name)
  }

  const onSet = (value) => {
    setValue(value);
  }

  useImperativeHandle(ref, () => ({onVerify, onReset, onSet}))

  // 创建一个 ref 以跟踪首次渲染
  const isFirstRender = useRef(true);

  useEffect(() => {
    isResetting.current = true;

  }, [])

  useEffect(() => {
    // 如果是首次渲染，则将 isFirstRender.current 设置为 false，并且不执行后续逻辑
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // 在后续渲染中执行逻辑
    console.log('useEffect:value', value, isFirstRender.current, isResetting.current)

    if (!Array.isArray(children) && children.type.name !== 'Button' && (!isResetting.current || value)) {
      onVerifyRequired(value);
    }
  }, [value]); // 此处假设 value 是 useEffect 依赖的状态变量

  // 处理完规则后再克隆子元素
  let clonedChild = {}

  if (Array.isArray(children)) {
    clonedChild = React.Children.map(children, child => {

      if (React.isValidElement(child)) {
        return reactCloneElement({
          child,
          value,
          disabled,
          checked: value,
          onChange: handleChange,
        });
      }
      return child;
    })
  } else {
    clonedChild = reactCloneElement({
      value,
      disabled,
      checked: value,
      child: children,
      onChange: handleChange,
    });
  }
  // console.log('clonedChild:', clonedChild)

  return (
    <div className={fromStyle.item} style={{display: [_display], ...style}}>
      <div className={fromStyle.labelBox}
           style={{flex: 0.15}}
      >
        {label && <label style={{
          textAlign: [_textAlian],
          padding: formLayout === 'vertical' && 0,
          marginBottom: formLayout === 'vertical' && 8,
          maxWidth: labelWidth,
        }} className={`${fromStyle.label} ${rulesMap.required.value ? fromStyle.required : ''}`}>
          {label}</label>
        }
      </div>

      <div style={{flex: 0.85, width: formLayout !== 'vertical' && 'max-content'}} className={fromStyle.clonedChild}>
        <div>{clonedChild} </div>

        {errorMessage &&
          <div className={fromStyle.requiredBox}><span className={fromStyle.requiredMessage}>{errorMessage}</span>
          </div>}
      </div>
    </div>
  );
})

export default FormItem;

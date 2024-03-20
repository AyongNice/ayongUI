import React, {useState, useImperativeHandle, useEffect, useRef, useContext, useLayoutEffect} from "react";
import fromStyle from '../../index.module.less'
import {FormStore, useForm} from '../../form-api'
import {isPromise} from '../../../../utils/index.ts'
import {FormItemProps, RulesValue, CloneElementProps, TriggerType, FormProps, ItmeValue} from '../../index.d'

const requiredPrompt: string = '为必选字段';
const maxLengthPrompt: string = '长度不能超过';
const reactCloneElement = ({childSource, child, size, value, onBlur, disabled, onChange}: CloneElementProps) => {


  if (Array.isArray(childSource)) {
    return React.Children.map(childSource, child => {

      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          value,
          size,
          onBlur,
          disabled,
          onChange,
        });
      }
      return child;
    })
  } else {
    return React.cloneElement(child, {
      size,
      value,
      onBlur,
      disabled,
      onChange,
    });
  }


}


const FormItem = React.forwardRef((props: FormItemProps, ref: React.Ref<any>) => {

  const {
    label,
    name,
    size,
    style,
    form,
    isWarp,
    labelWidth,
    rules = [],
    disabled,
    children,
    _fromDate,
    formLayout = 'right',
    errorInfo,
    onChange = () => {
    },
    _onFinishFailed = () => {
    }
  }: FormItemProps = props;

  let _textAlian = formLayout;
  let _display = 'flex';
  if (formLayout === 'vertical') {
    _textAlian = 'left';
    _display = 'inline';
  }
  const rulesMap: { [key: string]: RulesValue } = {
    required: {},
    maxLength: {},
    minLength: {},
    max: {},
    min: {},
    validator: {}
  }

  if (!Array.isArray(children) && label && children?.type?.name !== 'Button') {

    rules.forEach(_ => {

      const keys = Object.keys(_);
      if (keys.includes('validator')) {
        rulesMap.validator.value = _.validator;
        rulesMap.validator.trigger = _.trigger || 'change';
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
        rulesMap.max.trigger = _.trigger || 'change';

      }

      if (keys.includes('maxLength')) {
        rulesMap.maxLength.value = _.maxLength;
        rulesMap.maxLength.message = _.message;
        rulesMap.maxLength.trigger = _.trigger || 'change';
      }

    })
  }

  const [errorMessage, setErrorMessage] = useState<FormProps.errorInfo>('');
  const [value, setValue] = useState<ItmeValue>(_fromDate && _fromDate[name] || '');
  /**
   * MaxLength 校验
   * @param value 输入值
   */
  const onVerifyMaxLength = (value: string | boolean, trigger: TriggerType): string => {
    let message = '';
    //maxLength 校验
    if (rulesMap.maxLength.value) {

      if (children?.type?.name === 'Input' && [rulesMap.maxLength.trigger, 'submit'].includes(trigger) && value.length > rulesMap?.maxLength.value) {
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


  const onVerifyRequired = async (value: string | boolean, trigger: TriggerType) => {

    let errors: string | Object = '';
    if (rulesMap.required.value) {

      if (value && value !== '') {
        errors = onVerifyMaxLength(value, trigger)
        if (errors) {
          _onFinishFailed('add', {name, errors})
        }
        if (!errors && typeof rulesMap.validator.value === 'function') {
          try {

            errors = await isPromise(rulesMap.validator.value, name, value);
            _onFinishFailed('remove', {name, errors})
          } catch (error) {
            if (![rulesMap.validator.trigger, 'submit'].includes(trigger)) return;
            errors = error as string;
            _onFinishFailed('add', {name, errors})
          }
        }

        if (errors === '') {
          _onFinishFailed('remove', {name, errors: rulesMap.required.message || name + requiredPrompt})
        }
      } else {

        if (![rulesMap.required.trigger, 'submit'].includes(trigger)) return;

        errors = rulesMap?.required.message || label + requiredPrompt;
        _onFinishFailed('add', {name, errors})

      }

    }

    setErrorMessage(errors);
  }


  /**
   * 组件value改变触发
   * @param value  子组件值
   */
  const handleChange = (value: ItmeValue) => {
    setValue(value);
    onChange(name, value); // 调用父组件传递过来的 onChange 方法，并传递名称和值
  };

  const onBlur = () => {
    onVerify('blur');
  }
  /**
   * 暴露给父组件的方法 用于 总体校验
   */
  const onVerify = (trigger: TriggerType) => {
    //button  多个children 不需要校验
    if (!Array.isArray(children) && children?.type?.name !== 'Button') {

      //required 校验
      onVerifyRequired(value, trigger);

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
  }


  /**
   * 暴露给父组件的方法 设置数据
   * @param value
   */
  const onSet = (value: ItmeValue): void => {
    setValue(value);
  }

  useImperativeHandle(ref, () => ({onVerify, onReset, onSet}))

  // 创建一个 ref 以跟踪首次渲染
  const isFirstRender = useRef(true);

  const [formInstance] = useForm(form);


  /**
   * 获取表单项的值 用户自定义函数渲染暴露给父组件使用
   */
  let _getFieldValue = () => {
  };
  // 在首次渲染时将 isFirstRender.current 设置为 false 防止重置方法 后续逻辑执行
  useEffect(() => {
    isResetting.current = true;
  }, [])


  /**
   * 获取表单项的值
   * 将 获取的FormStore的方法 getFieldValue 回掉方法 引用赋值给 _getFieldValue
   */
  if (formInstance.getInternalHooks) {
    const {getFieldValue} = formInstance.getInternalHooks({});
    _getFieldValue = getFieldValue;
  }

  useEffect(() => {
    // 如果是首次渲染，则将 isFirstRender.current 设置为 false，并且不执行后续逻辑
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // 在后续渲染中执行逻辑

    if (!Array.isArray(children) && children?.type?.name !== 'Button' && (!isResetting.current || value)) {
      onVerifyRequired(value, 'change');
    }
  }, [value]); // 此处假设 value 是 useEffect 依赖的状态变量

  // 处理完规则后再克隆子元素
  let clonedChild = {};


  if (typeof children === 'function') {

    clonedChild = children({
      getFieldValue: _getFieldValue,
      props: {...props, ref, isWarp: false}
    })

  } else {
    clonedChild = reactCloneElement({
      value,
      size,
      disabled,
      child: children,
      childSource: children,
      onChange: handleChange,
      onBlur,
    });
  }


  return (
    <div className={fromStyle.item} style={{display: [_display], ...style}}>

      {!isWarp && <div className={fromStyle.labelBox}
                       style={{flex: 0.15}}
      >
        {label && <label style={{
          textAlign: [_textAlian],
          padding: formLayout === 'vertical' && 0,
          marginBottom: formLayout === 'vertical' && 8,
          width: labelWidth,
        }} className={`${fromStyle.label} ${rulesMap.required.value ? fromStyle.required : ''}`}>
          {label}</label>
        }
      </div>}

      <div style={{flex: 0.85, width: formLayout !== 'vertical' && 'max-content'}} className={fromStyle.clonedChild}>
        <div>{clonedChild} </div>

        {errorMessage &&
          <div className={fromStyle.requiredBox}><span className={fromStyle.requiredMessage}>{errorMessage}</span>
          </div>}
      </div>
    </div>
  );
})
FormItem.displayName= 'FormItem'
export default FormItem;

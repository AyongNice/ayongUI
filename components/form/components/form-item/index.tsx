import React, {useState, useImperativeHandle} from "react";
import fromStyle from '../../index.module.less'

const requiredPrompt: string = '为必选字段';
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
      const keys = Object.keys(_)
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
  console.log('rulesMap:', rulesMap)

  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState(_fromDate[name] || '');
  // console.log('errorInfo', errorInfo)
  const handleChange = (value) => {

    if (!Array.isArray(children) && children.type.name !== 'Button') {
      let message = '';
      if (children.type.name === 'Input' && value.length > rulesMap?.maxLength.value) {
        message = rulesMap?.maxLength.message || rulesMap?.required.message;
        _onFinishFailed('push', {name: label, errors: message})
      } else {
        _onFinishFailed('out', {name: label})
      }
      setErrorMessage(message);
    }
    setValue(value);
    onChange(name, value); // 调用父组件传递过来的 onChange 方法，并传递名称和值
  };


  /**
   * 暴露给父组件的方法 用于校验是否为空
   */
  const onRequired = () => {
    console.log(rulesMap.required.value)
    if (!Array.isArray(children) && children.type.name !== 'Button' && rulesMap.required.value) {
      setErrorMessage(rulesMap.required.message || label + requiredPrompt);
    }
  }

  /**
   * 暴露给父组件的方法 重置数据
   */
  const onReset = () => {
    setValue('');
    setErrorMessage('');
    console.log('formitem---onReset:', value)
  }

  useImperativeHandle(ref, () => ({onRequired, onReset}))


  // 处理完规则后再克隆子元素
  let clonedChild = {}

  if (Array.isArray(children)) {
    clonedChild = React.Children.map(children, child => {

      if (React.isValidElement(child)) {
        return reactCloneElement({
          child,
          value,
          disabled,
          onChange: handleChange,
        });
      }
      return child;
    })
  } else {
    clonedChild = reactCloneElement({
      value,
      disabled,
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
          marginBottom: formLayout === 'vertical' && 8
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

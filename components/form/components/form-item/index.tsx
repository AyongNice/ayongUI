import React, {useState} from "react";
import fromStyle from '../../index.module.less'

const FormItem = ({
                    label,
                    name,
                    rules = [],
                    disabled,
                    children,
                    formLayout = 'right',
                    onChange = () => {
                    },
                    _onFinishFailed = () => {
                    },
                  }) => {
  let _textAlian = formLayout;
  let _display = 'flex';
  if (formLayout === 'vertical') {
    _textAlian = 'left';
    _display = 'block'
  }


  const rulesMap = {
    required: {},
    maxLength: {},
    minLength: {},
    max: {},
    min: {},
  }

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
  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (value) => {
    let message = '';
    if (children.type.name === 'Input' && value.length > rulesMap?.maxLength.value) {
      message = rulesMap?.maxLength.message || rulesMap?.required.message;
      _onFinishFailed({name: label, errors: message})
    }else {
      _onFinishFailed(label,true)
    }

    setErrorMessage(message);
    onChange(name, value); // 调用父组件传递过来的 onChange 方法，并传递名称和值
  };

  // 处理完规则后再克隆子元素
  const clonedChild = React.cloneElement(children, {
    disabled,
    onChange: handleChange,

  });
  return (
    <div>
      <div className={fromStyle.item} style={{display: [_display]}}>
        <div className={fromStyle.labelBox}
             style={{flex: 0.15,}}
        >
          {label && <label style={{
            textAlign: [_textAlian],
            padding: formLayout === 'vertical' && 0,
            marginBottom: formLayout === 'vertical' && 8
          }} className={`${fromStyle.label} ${rulesMap.required.value ? fromStyle.required : ''}`}>
            {label}</label>
          }
        </div>

        <div style={{flex: 0.85, width: formLayout !== 'vertical' && 'max-content'}}>{clonedChild}</div>
      </div>

      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
}

export default FormItem;

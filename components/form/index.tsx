import React, {useEffect, useState} from 'react'

import fromStyle from './index.module.less'

import {useWatch, useForm} from './form-api'


const FormItem = ({
                    label,
                    name,
                    rules = [],
                    disabled,
                    children,
                    formLayout = 'right',
                    onChange = () => {
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
  const handleChange = (value) => {
    console.log(value)
    onChange(name, value); // 调用父组件传递过来的 onChange 方法，并传递名称和值
  };

  // 处理完规则后再克隆子元素
  const clonedChild = React.cloneElement(children, {
    disabled,
    onChange: handleChange,
    maxLength: rulesMap?.maxLength.value,
  });
  return (
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
  )
    ;
};

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

    submit(formData);
    console.log('Form submitted with data:', formData);
  };


  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {formLayout, onChange: handleFormChange, disabled});
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


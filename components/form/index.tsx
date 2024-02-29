import React, {useEffect, useState} from 'react'

import fromStyle from './index.module.less'

const FormItem = ({
                    label,
                    formLayout = 'right',
                    name,
                    onChange = () => {
                    },
                    children
                  }) => {
  let _textAlian = formLayout;
  let _display = 'flex';
  if (formLayout === 'vertical') {
    _textAlian = 'left';
    _display = 'block'
  }

  const handleChange = (value) => {
    onChange(name, value); // 调用父组件传递过来的 onChange 方法，并传递名称和值
  };

  return (
    <div className={fromStyle.item} style={{display: [_display]}}>
      <div className={fromStyle.labelBox}
           style={{flex: 0.15, textAlign: [_textAlian]}}
      >
        <label style={{
          padding: formLayout === 'vertical' && 0,
          marginBottom: formLayout === 'vertical' && 8
        }} className={fromStyle.label}>{label}:&nbsp;</label>
      </div>
      <div style={{flex: 0.85}}>{
        React.cloneElement(children, {onChange: handleChange})
      }</div>
    </div>
  );
};

const Form = ({
                name,
                labelCol,
                formLayout = 'right',
                wrapperCol,
                style,
                initialValues,
                onFinish = () => {
                },
                submit = () => {
                },
                onFinishFailed,
                autoComplete,
                children
              }) => {
  const [formData, setFormData] = useState({});
  const handleFormChange = (name, value) => {
    console.log('handleFormChange', name, value)
    setFormData({...formData, [name]: value}); // 更新表单数据对象
  };
  useEffect(() => {
    console.log(formData)
  }, [formData])
  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      console.log()
      return React.cloneElement(child, {formLayout, onChange: handleFormChange});
    }
    return child;
  });
  const [fromDate, setFromDate] = useState<object>()
  const handleSubmit = (e) => {
    e.preventDefault();
    submit(formData);
  };

  return (
    <form
      name={name}
      onSubmit={handleSubmit}
      className={fromStyle.form}
      style={{style, display: formLayout === 'inline' && 'flex'}}
      autoComplete={autoComplete}
    >
      {clonedChildren}
      <button type='submit'>tij</button>
    </form>
  );
};

Form.Item = FormItem;

export default Form;


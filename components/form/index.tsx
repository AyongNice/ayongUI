import React, {useState} from 'react'

import fromStyle from './index.module.less'

const FormItem = ({label, formLayout = 'right', name, children}) => {
  let _textAlian = formLayout;
  let _display = 'flex';
  if (formLayout === 'vertical') {
    _textAlian = 'left';
    _display = 'block'
  }
  console.log(_textAlian)
  return (
    <div className={fromStyle.item} style={{display: [_display]}}>
      <div className={fromStyle.labelBox} style={{flex: 0.15}}>
        <label style={{
          textAlign: [_textAlian],
          padding: formLayout === 'vertical' && 0,
          marginBottom: formLayout === 'vertical' && 8
        }}
               className={fromStyle.label}
        >{label}:&nbsp;</label>
      </div>
      <div style={{flex: 0.85}}>{children}</div>
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
                onFinish,
                onFinishFailed,
                autoComplete,
                children
              }) => {
  console.log(formLayout)
  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {formLayout});
    }
    return child;
  });
  const [fromDate, setFromDate] = useState<object>()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFinish) {
      onFinish();
    }
  };

  return (
    <form className={fromStyle.form} name={name}
          onSubmit={handleSubmit}
          style={style}
          autoComplete={autoComplete}
    >
      {clonedChildren}
    </form>
  );
};

Form.Item = FormItem;

export default Form;


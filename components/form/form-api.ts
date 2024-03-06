import React, {useEffect, useState} from 'react'

export const useWatch = (formData, onChange = () => {
}) => {
  useEffect(() => {
    const handleChange = (name, value) => {
      onChange(name, value);
    };
    // 监听 formData 的变化
    for (const name in formData) {
      if (formData.hasOwnProperty(name)) {
        // 在这里做出对 formLayout 的判断
        const value = formData[name];
        handleChange(name, value);
      }
    }
  }, [formData, onChange]);
};
export const useForm = ({

                          // onFinishFailed = () => {
                          // },
                          // autoComplete = () => {
                          // },
                          // onFinish = () => {
                          // },
                          submit = () => {
                          },
                          onValuesChange = () => {
                          },
                        }) => {
  const [formData, setFormData] = useState({});

  const handleFormChange = (name, value) => {
    // 更新表单数据对象
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };



  useEffect(() => {
    onValuesChange(formData)
  }, [formData])
  const handleSubmit = (e) => {
    e.preventDefault();

    submit(formData);
    console.log('Form submitted with data:', formData);
  };
  // 使用 useWatch 监听表单数据变化
  useWatch(formData, handleFormChange);
  return {
    handleSubmit,
    formData,
    handleFormChange,
    setFormData
  };
};

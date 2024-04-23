import React, { useEffect, useRef, useState, createRef, useImperativeHandle, useMemo, forwardRef } from "react";

import fromStyle from "./index.module.less";

import { FormStore, useForm } from "./form-api";

import { isObject } from "../../utils/index.ts";

import FormItem from "./components/form-item/index.tsx";

// useForm.js
import { FormProps, CloneFormElementProps } from "./index.d";
import FormList from "./components/form-list/index.tsx";

const FormContext = React.createContext();

const CloneElement = forwardRef(
  (
    {
      form,
      size,
      children,
      _fromDate,
      labelWidth,
      initialValues,
      onChange,
      formLayout,
      disabled,
      _onFinishFailed,
      errorInfo,
      defaultValueUpDate = () => {},
    }: CloneFormElementProps,
    ref
  ) => {
    const itemRef = {};
    let cloneElement: React.FC = {};
    /**
     * 表单项值变化时的回调
     */
    const [formInstance] = useForm(form);

    /**
     * 重置表单
     */
    const onReset = () => {
      for (let key in _fromDate) {
        if (isObject(_fromDate[key]) && Object.keys(itemRef[key]).length > 1) {
          for (let key2 in itemRef[key]) {
            itemRef[key][key2]?.current.onReset();
          }
        } else {
          itemRef[key].current.onReset();
        }
      }
    };

    /**
     * 设置表单数据
     * @param fromDate
     */
    const onSet = (fromDate): void => {
      for (let key in fromDate) {
        if (isObject(fromDate[key]) && Object.keys(itemRef[key]).length > 1) {
          for (let key2 in itemRef[key]) {
            itemRef[key][key2]?.current.onSet(fromDate[key][key2]);
          }
        } else {
          itemRef[key] && itemRef[key].current.onSet(fromDate[key]);
        }
      }
    };

    /**
     * 表单项校验
     */
    const onVerify = () => {
      for (let key in _fromDate) {
        if (isObject(_fromDate[key]) && Object.keys(itemRef[key]).length > 1) {
          for (let key2 in itemRef[key]) {
            itemRef[key][key2]?.current.onVerify("submit");
          }
        } else {
          itemRef[key]?.current?.onVerify("submit");
        }
      }
    };
    const [updateComponent, setUpdateComponent] = useState(false);

    const formUpDateValue = (store, type) => {};

    useImperativeHandle(ref, () => ({ onReset, onVerify, onSet, formUpDateValue }));

    /**
     * 设置FormItem的name属性 默认值
     * @param child {React.FC} 表单项组件
     * @param value {any} 表单项的值
     */

    const setPropotypeValue = ({ child, value = false, listName, type = "" }): React.Ref<any> => {
      if (Array.isArray(child.props.name)) {
        const [FatherName, childName] = child.props.name;

        //设置每个FormItem的属性key
        if (!_fromDate[FatherName]) _fromDate[FatherName] = {};

        _fromDate[FatherName][childName] = (initialValues[FatherName] && initialValues[FatherName][childName]) || value;

        //设置每个FormItem的ref
        if (!itemRef[FatherName]) itemRef[FatherName] = {};
        itemRef[FatherName][childName] = React.createRef();
        return [FatherName, childName];
      } else {

        itemRef[child.props.name] = React.createRef();
        _fromDate[child.props.name] = initialValues[child.props.name] || value;
      }
    };

    cloneElement = React.Children.map(children, (child: React.FC, index: number) => {
      //给formData 默认值
      if (React.isValidElement(child)) {
        let nameList = [];

        if (child.props.name) {
          //如果是FormList组件单独做list
          if (child?.type?.displayName === "FormList") {
            nameList = setPropotypeValue({
              child,
              value: [],
              type: child?.type?.displayName,
              listName: child.props.name,
            });
          } else {
            if (["Radio", "Switch"].includes(child?.props?.children?.type?.displayName)) {
              nameList = setPropotypeValue({ child });
            } else {
              nameList = setPropotypeValue({ child, value: "" });
            }
          }

          // }
        }

        const [FatherName, childName] = nameList || ["", ""];
        return React.cloneElement(child, {
          ref: Array.isArray(child.props.name) ? itemRef[FatherName][childName] : itemRef[child.props.name],
          form,
          size,
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

    defaultValueUpDate(_fromDate);
    return cloneElement;
  }
);

const Form = React.forwardRef(
  (
    {
      name,
      style,
      size,
      labelWidth = "100px",
      form = {},
      children,
      initialValues = {},
      autoComplete,
      disabled = false,
      formLayout = "right",
      onSubmit = () => {},
      onFinish = () => {},
      onFinishFailed = () => {},
      onValuesChange = () => {},
    }: FormProps,
    ref: React.Ref<any>
  ) => {
    //  初始化表单数据内部数据
    const _fromDate = { ...initialValues };

    /**
     * 表单项值变化时的回调
     * @param name
     * @param value
     */
    const handleFormChange = ({ name, value, parentName, index, operationType }) => {
      //多层级数据结结构更新
      if (Array.isArray(name)) {
        const [FatherName, childName] = name;
        setFormData((prevData) => {
          return {
            ...prevData,
            [FatherName]: {
              ...prevData[FatherName],
              [childName]: value,
            },
          };
        });
        return;
      }

      // list集合数据 remove更新
      if (operationType === "remove") {
        // 更新表单数据对象
        return setFormData((prevData) => {
          if (parentName) {
            prevData[parentName].splice(index, 1);
            return prevData;
          }
        });
      }

      // 更新表单数据对象
      setFormData((prevData) => {
        // list集合数据更新
        if (parentName) {
          prevData[parentName][index] = { ...prevData[parentName][index], [name]: value };
          return prevData;
        } else {
          return {
            ...prevData,
            [name]: value,
          };
        }
      });
    };

    // 错误信息
    const [errorInfo, setErrorInfo] = useState({ errorFields: [] });

    /**
     * 表单项校验失败的回调 传递给FormItem 组件调用触发
     * @param type
     * @param field
     */
    const _onFinishFailed = (type, field) => {
      setErrorInfo((prevState) => {
        // 创建一个新的错误信息对象
        const newErrorInfo = { ...prevState };

        if (type === "remove") {
          // 移除指定字段
          newErrorInfo.errorFields = prevState.errorFields.filter((item) => item.name !== field.name);
        }
        if (type === "add") {
          // 添加或替换指定字段
          const existingFieldIndex = prevState.errorFields.findIndex((item) => item.name === field.name);
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
    const itemRef = useRef();

    // 表单数据
    const [formData, setFormData] = useState();

    /**
     * FormStore 实例 变化的回调函数
     * @param store
     */
    const formUpDateValue = (store, type) => {
      if (type === "reset") {
        store = _fromDate;

        itemRef.current.onReset();
      }
      if (type === "set") {
        itemRef.current.onSet(store);
      }
      setFormData(store);

      itemRef.current.formUpDateValue(store, type);
    };
    //  store 实例
    const [formInstance] = useForm(form);

    /**
     * 初始化表单数据
     * fomrData默认值 初始化更新
     */
    let defaultValueUpDate = (data) => {};

    useEffect(() => {
      setFormData(_fromDate);
    }, []);

    /**
     *
     */
    useEffect(() => {
      formData && onValuesChange(formData);
      if (formInstance?.getInternalHooks) {
        const { setInitialValues } = formInstance.getInternalHooks({
          update: formUpDateValue,
          submit: handleSubmit,
          errorInfo,
        });
        setInitialValues(formData);
      }
    }, [formData]);

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
      e?.preventDefault();

      itemRef.current.onVerify();
      isSubmit.current = true;
    };

    // 每次运行 effect 时，都会创建新的 formInstance.getInternalHooks 将formUpDateValue数据监听回掉方式传递给formStore
    useEffect(() => {
      if (!formInstance?.getInternalHooks && handleSubmit && formUpDateValue) return;

      formInstance?.getInternalHooks({ update: formUpDateValue, submit: handleSubmit, errorInfo });
    });

    const isSubmit = useRef(false); // 标志位表示是否是通过 onReset 触发的校验

    /**
     * 监听错误信息和表单数据的变化 用于触发 onFinishFailed 和 onFinish
     */
    useEffect(() => {
      if (errorInfo.errorFields.length && isSubmit.current) {
        onFinishFailed(errorInfo);
      } else {
        if (isSubmit.current) {
          onFinish();
          onSubmit(formData);
        }
      }
      isSubmit.current = false;
      // if (!formInstance?.getInternalHooks && handleSubmit && formUpDateValue) return;

      // formInstance?.getInternalHooks({update: formUpDateValue, submit: handleSubmit, errorInfo})
    }, [errorInfo.errorFields, isSubmit.current]);
    /**
     * 表单上下文
     */
    const fieldContextValue = useMemo(() => ({ ...formInstance }), [formInstance]);

    return (
      <form
        name={name}
        style={style}
        onSubmit={handleSubmit}
        className={formLayout === "inline" ? fromStyle.formFlexWrap : ""}
        autoComplete={autoComplete}
        onReset={(e) => {
          e.preventDefault();
        }}
      >
        <FormContext.Provider value={fieldContextValue}>
          <CloneElement
            ref={itemRef}
            form={form}
            size={size}
            labelWidth={labelWidth}
            onChange={handleFormChange}
            children={children}
            _fromDate={_fromDate}
            fromData={formData}
            formLayout={formLayout}
            disabled={disabled}
            defaultValueUpDate={defaultValueUpDate}
            _onFinishFailed={_onFinishFailed}
            initialValues={initialValues}
          />
        </FormContext.Provider>
      </form>
    );
  }
);

Form.Item = FormItem;
Form.useForm = useForm;
Form.List = FormList;
Form.displayName = "Form";
export default Form;

import React, {useEffect, useRef, useState} from 'react'

export class FormStore {
  store: { [key: string]: any };
  callbacks: { [key: string]: Function };
  initialValues: { [key: string]: any };
  fieldEntities: any[];
  update: Function;
  updateValue: Function;

  constructor() {
    this.store = {};
    this.callbacks = Object.create(null);
    this.initialValues = {};
    this.fieldEntities = [];
    this.update = () => {
    };
    this.updateValue = () => {
    };
  }

  getForm = () => ({
    getFieldValue: this.getFieldValue,
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    submit: this.submit,
    resetFields: this.resetFields,
    getInternalHooks: this.getInternalHooks,
  });

  getInternalHooks = (update: Function = () => {
  }, submit) => {
    this.updateValue = update;
    this.submit = submit;
    return {
      updateValue: this.updateValue,
      setInitialValues: this.setInitialValues,
      setCallbacks: this.setCallbacks,
      initEntityValue: this.initEntityValue,
      registerField: this.registerField,
    };
  };
  setFieldsValue = (values: { [key: string]: any }) => {
    this.store = {...values};
    this.updateValue(this.store, 'set');
  }
  setCallbacks = (callbacks: { [key: string]: Function }) => {
  };

  setInitialValues = (initialValues: { [key: string]: any }) => {
    this.store = {...initialValues};
  };

  initEntityValue = (entity: any) => {
  };

  registerField = (entity: any) => {
  };

  getFieldEntities = () => {
  };

  notifyObservers = (
    prevStore: { [key: string]: any },
    nameList: string[],
    info: any
  ) => {
  };

  submit = () => {
  };

  resetFields = (): void => {
    for (let key in this.store) {
      this.store[key] = '';
    }
    this.updateValue(this.store,'reset');
    console.log('FormStore----resetFields:', this.store);
  };
}

/**
 * useForm
 * @param form
 */
export const useForm = (form: any) => {
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

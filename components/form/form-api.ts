import React, {useEffect, useRef, useState} from 'react'

import {isObject} from '../../utils/index.ts'

export class FormStore {
  store: { [key: string]: any };
  callbacks: { [key: string]: Function };
  initialValues: { [key: string]: any };
  fieldEntities: any[];
  update: Function;
  updateValue: Function;
  formSubmit: Function;
  errorInfo: { errorFields: { name: string; errors: string }[] };

  constructor() {
    this.store = {};
    this.callbacks = Object.create(null);
    this.initialValues = {};
    this.fieldEntities = [];
    this.update = () => {
    };
    this.updateValue = () => {
    };
    this.formSubmit = () => {

    }

  }

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      submit: this.submit,
      resetFields: this.resetFields,
      getInternalHooks: this.getInternalHooks,
      verify: this.verify,
    }
  };
  verify = (name: string, value: any, rules: { [key: string]: any }[]) => {

  }
  getInternalHooks = (porps) => {
    const {update, submit, errorInfo} = porps;
    if(update && submit && errorInfo){
      this.formSubmit = submit;
      this.errorInfo = errorInfo;
      this.updateValue = update;
    }



    return {
      updateValue: this.updateValue,
      setInitialValues: this.setInitialValues,
      setCallbacks: this.setCallbacks,
      initEntityValue: this.initEntityValue,
      registerField: this.registerField,
      getFieldValue: this.getFieldValue,
    };
  };

  submit = () => {

    if (this.formSubmit) {

      this.formSubmit()

      if (this.errorInfo?.errorFields?.length) {

        throw new Error(JSON.stringify(this.errorInfo.errorFields));
      }
      return this.store;
    }

  }

  // 获取单个字段的值
  getFieldValue = (name: string) => {
    return this.store[name];
  }

  // 设置单个字段的值

  setFieldsValue = (values: { [key: string]: any }) => {

    this.store = {...this.store, ...values};
    if (this.updateValue) this.updateValue(this.store, 'set');

  }
  setCallbacks = (callbacks: { [key: string]: Function }) => {
  };


  // 设置初始值
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


  // 刷新所有字段的值
  resetFields = (): void => {

    for (let key in this.store) {

      if (isObject(this.store[key])) {
        for (let key2 in this.store[key]) {
          this.store[key][key2] = '';
        }

      } else {
        this.store[key] = '';

      }

    }
    this.updateValue(this.store, 'reset');
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

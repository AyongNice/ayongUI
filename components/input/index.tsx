import React, {useState, useRef, useEffect} from 'react';
import {Wrongs} from '../icon/icon';
import styles from './index.module.less';

function Input(props) {
  const {
    value = '',
    disabled,
    type = 'text',
    className = '',
    size = 'normal',
    maxLength = null,
    onFocus = () => {
    },
    onBlur = () => {
    },
    onKeyUp = () => {
    },
    onChange = (e) => {
    },
    placeholder = '请输入值',
    prefix = null,
    suffix = null,
    clerabled = true,
  } = props;

  const [valueInner, setValue] = useState(value);

  const styleClassName = `${styles.ayongInput} ${className} ${styles[size]}
    ${styles[type]} ${disabled && styles.notAllowed}`;

  const prefixRef = useRef(null);
  const suffixRef = useRef(null);
  const clearRef = useRef(null);

  const compensate = 5;
  const [paddingLeft, setPdl] = useState('5px');
  const [paddingRight, setPdr] = useState('5px');


  const [rightPlace, setRightPlace] = useState('5px');

  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (prefixRef.current) {
      setPdl(prefix ? prefixRef.current?.offsetWidth + compensate + 'px' : '5px');
    }
  }, [prefixRef.current]);

  useEffect(() => {
    if (suffixRef.current && !clearRef.current) {
      if (type == 'number') {
        const res = suffixRef.current?.offsetWidth + 4 + 'px';
        setPdr(res);
      } else {
        setPdr('5px');
      }
    } else if (suffixRef.current && clearRef.current) {
      if (type == 'number') {
        const clearWidth = clearRef.current?.offsetWidth + 4;
        const suffixWidth = suffixRef.current?.offsetWidth + 4;
        const res1 = clearWidth + suffixWidth + 'px';
        setPdr(res1);
        const res2 = suffixWidth + 'px';
        setRightPlace(res2);
      } else {
        setPdr('5px');
      }
    } else {
      //有删除,没有后插槽
      if (type == 'number') {
        const res = 20 + 'px';
        setPdr(res);
      } else {
        setPdr('5px');
      }
      /* if (clerabled) {
          if (type=='number') {
              const res =  20 + 'px';
              setPdr(res);
          }else{
              setPdr('5px');
          }
      }else{
          setPdr('5px');
      } */
    }
  }, [suffixRef.current, clearRef.current, reset]);

  const handleClear = () => {
    setValue('');
    setReset(!reset);
    setTimeout(() => {
      setReset(!reset);
    }, 0);
    // setPdr('5px');
  };


  /*  useEffect(() => {
       if (clearRef.current) {
         if (type=='number') {
             const res = clearRef.current?.offsetWidth + 8 + 'px';
             setRightPlace(res);
         }else{
             setRightPlace('5px');
         }
     }
   }, [clearRef.current]); */

  const _onChange = (e) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }
  useEffect(() => {
    setValue(() => value)

    console.log('input----value:', value)
  }, [value])

  return (
    <div style={{position: 'relative', boxSizing: 'border-box', animation: 'all 0.5s '}}>
      {prefix && (
        <span
          ref={prefixRef}
          style={{
            position: 'absolute',
            left: '5px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {prefix}
        </span>
      )}
      <input
        style={{paddingLeft, paddingRight, boxSizing: 'border-box', animation: 'all 0.5s '}}
        type={type}
        disabled={disabled}
        onBlur={onBlur}
        maxLength={maxLength}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        value={valueInner}
        onChange={_onChange}
        placeholder={placeholder}
        className={styleClassName}
      />
      {/*{clerabled && valueInner && (*/}
      {/*  <span*/}
      {/*    ref={clearRef}*/}
      {/*    style={{*/}
      {/*      position: 'absolute',*/}
      {/*      right: rightPlace,*/}
      {/*      top: '50%',*/}
      {/*      transform: 'translateY(-50%)',*/}
      {/*    }}*/}
      {/*    onClick={handleClear}*/}
      {/*  >*/}
      {/*    <Wrongs/>*/}
      {/*  </span>*/}
      {/*)}*/}
      {suffix && <span ref={suffixRef} style={{
        position: 'absolute',
        right: '5px',
        top: '50%',
        transform: 'translateY(-50%)',
      }}>{suffix}</span>}
    </div>
  );
}

Input.displayName = 'Input';

export default Input;

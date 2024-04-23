import React, {useState, useRef, useEffect, useImperativeHandle, useMemo} from 'react';
import {Wrongs} from '../icon/icon';
import styles from './index.module.less';
import {InputProps} from './index.d'
import {EyesOpen, EyesClosed} from '../icon/icon.ts';

const Input = (props: InputProps) => {
  const {
    value = '',
    disabled,
    type = 'text',
    className = '',
    style = {},
    defaultValue = '',
    addonBefore = null,
    addonAfter = null,
    placeholder = '请输入值',
    prefix = null,
    suffix = null,
    clerabled = false,
    size = 'normal',
    maxLength = null,
    visibilityToggle = {
      visible: false,
      iconRender: null,
      onVisibleChange: () => {
      }
    },
    onFocus = () => {
    },
    onBlur = () => {
    },
    onKeyUp = () => {
    },
    onChange = (e) => {
    },
    onChangeBefore = (e) => {
    },

  } = props;

  const [valueInner, setValue] = useState(value || defaultValue);
  const [chanies, setChanies] = useState('')

  const styleClassName = `${styles.ayongInput} ${className} ${styles[size]}
    ${styles[type]} ${disabled && styles.notAllowed} ${(addonBefore || addonAfter) && styles.addonBeforeAfter}`;


  const [rightPlace, setRightPlace] = useState('5px');

  const [reset, setReset] = useState(false);
  const [showEyesOpen, setShowEyesOpen] = useState(false);
  const frist = useRef(true)

  const _type = useMemo(() => {

    visibilityToggle.onVisibleChange && visibilityToggle.onVisibleChange(showEyesOpen)
    if (type == 'Password' && showEyesOpen) {
      return 'text'
    }

    if (type === 'Password') {
      return 'password'
    }
    return type
  }, [showEyesOpen])
  /**
   * 点击眼睛 密码模式切换
   */
  const handleEyesOpen = () => {
    setShowEyesOpen(!showEyesOpen)
  }

  useEffect(() => {

    setShowEyesOpen(visibilityToggle?.visible)
  }, [visibilityToggle?.visible])

  const handleClear = () => {
    setValue('');
  };


  const _onChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) return;

    const res = onChangeBefore(e.target.value);
    if (res) return;
    setValue(e.target.value)
    onChange(e.target.value)
  }
  const _onBlur = (e) => {
    onBlur(e.target.value)
  }
  const [isComposing, setIsComposing] = useState(false);

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
    // 延迟一段时间后再触发 onChange 方法

  };

  useEffect(() => {

    if (!isComposing) {
      // _onChange({target: {value: chanies}})
    }

  }, [isComposing])


  useEffect(() => {
    setValue(() => value)
  }, [value])

  return (

    <div className={styles.warp}
         style={{...style, padding: (prefix || suffix || type === 'Password' || clerabled) && '0 5px'}}>

      {['string', 'number'].includes(typeof addonBefore) && <span className={styles.lable}> {addonBefore} </span>}
      {typeof addonBefore === 'function' &&
        <span className={styles.lableFunction}> {addonBefore()}  </span>}

      {prefix && <span>{prefix}</span>}
      <input
        type={_type}
        disabled={disabled}
        onBlur={_onBlur}
        maxLength={maxLength}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        value={valueInner}
        onChange={_onChange}
        placeholder={placeholder}
        className={styleClassName}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />

      {suffix && <span className={styles.iconBox}>{suffix}</span>}
      {clerabled && valueInner && <span onClick={handleClear} className={styles.iconBox}><Wrongs/></span>}
      {type === 'Password' && <span className={styles.iconBox} onClick={handleEyesOpen}>
        {typeof visibilityToggle.iconRender === 'function' ? visibilityToggle.iconRender(showEyesOpen) : showEyesOpen ?
          <EyesOpen/> : <EyesClosed/>}
      </span>}
      {['string', 'number'].includes(typeof addonAfter) && <span className={styles.lable}> {addonAfter} </span>}

      {typeof addonAfter === 'function' && <span className={styles.lableFunction}> {addonAfter()}  </span>}

    </div>
  );
}

const TextArea = ({
                    style,
                    value = '',
                    defaultValue = '',
                    onChange = () => {
                    }
                  }) => {
  const [valueInner, setValue] = useState(value || defaultValue);
  const _onChange = (e) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }
  return <textarea className={styles.warp} value={valueInner} style={style} onChange={_onChange}></textarea>

}
Input.TextArea = TextArea;
Input.displayName = 'Input';

export default Input;

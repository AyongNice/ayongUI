import React, {useState, useEffect, useRef} from 'react';
import './TimePicker.less'; // Import your CSS file for styling
import Button from '../button/index.tsx'

const generateNumberList = (start, end) => {
  return Array.from({length: end - start + 1}, (_, index) => {
    const value = String(index + start).padStart(2, '0');
    return {label: value};
  });
};
const hourList = generateNumberList(0, 23);
const minuteList = generateNumberList(0, 59);
const secondList = generateNumberList(0, 59);
const TimePicker = ({
                      timeDate,
                      className,
                      onChange = () => {
                      },
                      onCancel = () => {
                      },
                    }) => {


  const [selectedHour, setSelectedHour] = useState(timeDate.selectedHour || hourList[0].label);
  const [selectedMinute, setSelectedMinute] = useState(timeDate.selectedMinute || minuteList[0].label);
  const [selectedSecond, setSelectedSecond] = useState(timeDate.selectedSecond || secondList[0].label);

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute) => {
    setSelectedMinute(minute);
  };

  const handleSecondChange = (second) => {
    setSelectedSecond(second);
  };
  useEffect(() => {
    setSelectedHour(timeDate.selectedHour || '00');
    setSelectedMinute(timeDate.selectedMinute || '00')
    setSelectedSecond(timeDate.selectedSecond || '00')
  }, [timeDate])
  const onSure = () => {
    onChange(selectedHour + ":" + selectedMinute + ":" + selectedSecond);
  }
  useEffect(() => {
    if (hourRef.current) {
      const optionHeight = (hourRef.current.scrollHeight - 200) / hourList.length;
      hourRef.current.scrollTop = hourList.findIndex((hour) => hour.label === selectedHour) * optionHeight;
    }

    if (minuteRef.current) {
      const optionHeight = (minuteRef.current.scrollHeight - 200) / minuteList.length;

      minuteRef.current.scrollTop = minuteList.findIndex((minute) => minute.label === selectedMinute) * optionHeight;
    }

    if (secondRef.current) {
      const optionHeight = (minuteRef.current.scrollHeight - 200) / minuteList.length;
      secondRef.current.scrollTop = secondList.findIndex((second) => second.label === selectedSecond) * optionHeight;
    }

  }, [selectedHour, selectedMinute, selectedSecond]);
  const _className = 'time-picker-container' + " " + className;
  return (
    <div className={_className} onClick={(e) => e.stopPropagation()}>
      <div className='box'>
        <div className="scroll-container" ref={hourRef}>
          {hourList.map((hour) => (
            <div
              key={hour.label}
              className={`option ${selectedHour === hour.label ? 'selected' : ''}`}
              onClick={() => handleHourChange(hour.label)}
            >
              {hour.label}
            </div>
          ))}
        </div>

        <div className="scroll-container" ref={minuteRef}>
          {minuteList.map((minute) => (
            <div
              key={minute.label}
              className={`option ${selectedMinute === minute.label ? 'selected' : ''}`}
              onClick={() => handleMinuteChange(minute.label)}
            >
              {minute.label}
            </div>
          ))}
        </div>

        <div className="scroll-container" ref={secondRef}>
          {secondList.map((second) => (
            <div
              key={second.label}
              className={`option ${selectedSecond === second.label ? 'selected' : ''}`}
              onClick={() => handleSecondChange(second.label)}
            >
              {second.label}
            </div>
          ))}
        </div>
      </div>


      <div style={{display: 'flex', justifyContent: "flex-end"}}>
        <Button size='mini' style={{marginRight: '10px'}} onClick={onCancel}>取消</Button>
        <Button size='mini' type='primary' onClick={onSure}>确定</Button>
      </div>
    </div>
  );
};

export default TimePicker;

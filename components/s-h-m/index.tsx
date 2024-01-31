import React, {useState, useEffect, useRef} from 'react';
import './TimePicker.less'; // Import your CSS file for styling

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
                      selectedHourProp,
                      selectedMinuteProp,
                      selectedSecondProp,
                      className,
                      onChange = () => {
                      }
                    }) => {


  const [selectedHour, setSelectedHour] = useState(selectedHourProp || hourList[0].label);
  const [selectedMinute, setSelectedMinute] = useState(selectedMinuteProp || minuteList[0].label);
  const [selectedSecond, setSelectedSecond] = useState(selectedSecondProp || secondList[0].label);

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
    setSelectedHour(selectedHourProp || '00');
    setSelectedMinute(selectedMinuteProp || '00')
    setSelectedSecond(selectedSecondProp || '00')
  }, [selectedHourProp, selectedMinuteProp, selectedSecondProp])

  useEffect(() => {
    if (hourRef.current) {
      console.log('hourRef.current')
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

    if (selectedHour && selectedMinute && selectedSecond) {
      onChange({selectedHour, selectedMinute, selectedSecond})
    }
  }, [selectedHour, selectedMinute, selectedSecond]);
  const _className = 'time-picker-container' + " " + className;
  return (
    <div className={_className} onClick={(e) => e.stopPropagation()}>
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
  );
};

export default TimePicker;

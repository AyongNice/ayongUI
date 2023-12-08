import React, {useState} from 'react';
import style from './index.module.less';
import {RateProps} from "./index.d"


const Rate: React.FC<RateProps> = ({
                                       count = 5,
                                       color = 'gold',
                                       value,
                                       disabled = false,
                                       className,
                                       onChange = () => {
                                       },
                                       icon = ''

                                   }) => {
    const [rating, setRating] = useState(value);
//触摸事件 状态
    const [ratingMove, setRatingMove] = useState<number | null>(null);

    const handleStarClick = (selectedRating: number) => {
        if (disabled) return;
        setRating(selectedRating);
        if (onChange) {
            onChange(selectedRating);
        }
    };

    const handleStarMove = (selectedRating: number) => {
        if (disabled) return;
        setRatingMove(selectedRating);
    }
    const handleStarMoveOut = () => {
        if (disabled) return;
        setRatingMove(null);
    }

    const getClassName = (index: number, base: string): string => {
        const styleClass: string = index < (ratingMove || rating) ? `${base} ${style.beam} ${style.active}` : `${base} ${style.beam} `
        return `${styleClass} ${className}`;
    }
    const getIconClassName = (index: number) => {
        return index < (ratingMove || rating) ? style.divIconActive : style.divIcon;
    }
    return (
        <div className={style.warp}>
            {[...Array(count)].map((_, index) => (
                icon ? <div
                        key={index}
                        onMouseOut={handleStarMoveOut}
                        onMouseMove={() => handleStarMove(index + 1)}
                        onClick={() => handleStarClick(index + 1)}
                    >
                        {React.createElement(icon, {
                            className: getIconClassName(index),
                        })}</div> :
                    <div key={index}
                         onMouseOut={handleStarMoveOut}
                         onMouseMove={() => handleStarMove(index + 1)}
                         className={style.rotor}
                         onClick={() => handleStarClick(index + 1)}>
                        <div style={{'--color': color}} className={getClassName(index, style.north)}/>
                        <div style={{'--color': color}} className={getClassName(index, style.northwest)}/>
                        <div style={{'--color': color}} className={getClassName(index, style.northeast)}/>
                        <div style={{'--color': color}} className={getClassName(index, style.west)}/>
                        <div style={{'--color': color}} className={getClassName(index, style.east)}/>
                    </div>
            ))}
        </div>
    );
};


export default Rate;

import React, {useState} from 'react';
import style from './index.module.less';
import {RateProps} from "./index.d"


const Rate: React.FC<RateProps> = ({
                                       count = 5,
                                       color = 'gold',
                                       value,
                                       disabled = false,
                                       className,
                                       onRatingChange
                                   }) => {
    const [rating, setRating] = useState(value);
//触摸事件 状态
    const [ratingMove, setRatingMove] = useState<number | null>(null);

    const handleStarClick = (selectedRating: number) => {
        if (disabled) return;
        setRating(selectedRating);
        if (onRatingChange) {
            onRatingChange(selectedRating);
        }
    };
    const handStar = () => {

    }
    const handleStarMove = (selectedRating: number) => {
        if (disabled) return;
        setRatingMove(selectedRating);
    }
    const handleStarMoveOut = () => {
        if (disabled) return;
        setRatingMove(null);
    }
    const styleRet = {
        "::after": {
            background: "red",
            // 其他样式...
        },
    }
    const getClassName = (index: number, base: string): string => {
        const styleClass: string = index < (ratingMove || rating) ? `${base} ${style.beam} ${style.active}` : `${base} ${style.beam} `
        return `${styleClass} ${className}`;
    }

    return (
        <div className={style.warp}>
            {[...Array(count)].map((_, index) => (
                <div key={index}
                     onMouseOut={handleStarMoveOut}
                     onMouseMove={() => handleStarMove(index + 1)}
                     className={style.rotor}
                     onClick={() => handleStarClick(index + 1)}>
                    <div style={{'--color': color}} className={getClassName(index, style.north)}></div>
                    <div style={{'--color': color}} className={getClassName(index, style.northwest)}></div>
                    <div style={{'--color': color}} className={getClassName(index, style.northeast)}></div>
                    <div style={{'--color': color}} className={getClassName(index, style.west)}></div>
                    <div style={{'--color': color}} className={getClassName(index, style.east)}></div>
                </div>
            ))}
        </div>
    );
};


export default Rate;

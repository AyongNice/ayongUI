import React, {useState} from 'react';
import style from './index.module.less';
import {RateProps} from "./index.d"


const Rate: React.FC<RateProps> = ({count = 5, className, initialRating, onRatingChange}) => {
    const [rating, setRating] = useState(initialRating);
//触摸事件 状态
    const [ratingMove, setRatingMove] = useState<number | null>(null);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
        if (onRatingChange) {
            onRatingChange(selectedRating);
        }
    };
    const handStar = () => {

    }
    const handleStarMove = (selectedRating: number) => {
        setRatingMove(selectedRating);
    }
    const handleStarMoveOut = () => {
        setRatingMove(null);
    }

    const getClassName = (index: number): string => {
        const styleClass: string = index < (ratingMove || rating) ? `${style.star} ${style.active}` : `${style.star} `
        return `${styleClass} ${className}`;
    }

    return (
        <div>
            {[...Array(count)].map((_, index) => (
                <span
                    key={index}
                    onMouseOut={handleStarMoveOut}
                    onMouseMove={() => handleStarMove(index + 1)}
                    onClick={() => handleStarClick(index + 1)}
                    className={getClassName(index)}
                >
          {/*&#9733;*/}
        </span>
            ))}
        </div>
    );
};


export default Rate;

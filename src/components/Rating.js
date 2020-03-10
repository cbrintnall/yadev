import React, { useState } from 'react';
import { IoIosStar, IoMdStarOutline } from 'react-icons/io';

const MAX_RATING = 5;

const Rating = (props) => {
  const [hovered, setHovered] = useState(-1);
  const [value, setValue] = useState(-1);
  const ratingAmt = props.rating || 1;

  const editing = !((hovered === -1 && value === -1) || !props.editable);
  const filledStars = editing ? hovered === -1 ? value : hovered + 1 : ratingAmt;
  const emptyStars = MAX_RATING - filledStars;
  const baseStyle = { fontSize: "20px", color: "gold", ...props.style };

  const getRatings = () => {
        const ratings = [];

        for (let i = 0; i < filledStars; i++) {
            ratings.push(
                <IoIosStar
                    key={i + 500}
                    style={baseStyle}
                    onMouseEnter={_ => setHovered(i)}
                    onMouseLeave={_ => setHovered(-1)}
                />
            )
        }

        for (let i = 0; i < emptyStars; i++) {
            ratings.push(
                <IoMdStarOutline
                    key={i + 51}
                    style={baseStyle}
                    onMouseEnter={_ => setHovered(i + filledStars)}
                    onMouseLeave={_ => setHovered(-1)}
                />
            )
        }

        return ratings;
    }

    return (
      <div 
        style={{ cursor: editing ? "pointer" : "inherit" }}
        onClick={_ => !setValue(hovered+1) && props.onClick && props.onClick(hovered+1)}
      >
            { getRatings() }
      </div>
    )
}

export default Rating;

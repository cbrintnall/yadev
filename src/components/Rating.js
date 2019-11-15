import React from 'react';
import { IoIosStar, IoMdStarOutline } from 'react-icons/io';

const MAX_RATING = 5;

class Rating extends React.Component {
    constructor() {
        super();
    }

    getRatings() {
        const ratings = [];

        for (let i = 0; i < this.props.ratings; i++) {
            ratings.push(
                <IoIosStar 
                    key={i} 
                    style={{
                        fontSize: "20px", 
                        color: "gold"
                    }}
                />
            )
        }

        for (let i = 0; i < MAX_RATING - this.props.ratings; i++) {
            ratings.push(
                <IoMdStarOutline 
                    key={i} 
                    style={{
                        fontSize: "20px", 
                        color: "gold"
                    }}
                />
            )
        }

        return ratings;
    }

    render() {
        return (
            <div>
                {this.getRatings()}
            </div>
        )
    }
}

export default Rating;
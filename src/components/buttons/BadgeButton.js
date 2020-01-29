import "./BadgeButton.css";
import * as colors from '../../colors';
import React from 'react';
import Badge from 'react-bootstrap/Badge';

class BadgeButton extends React.Component {
  constructor() {
    super();

    this.r = React.createRef();
  }

  render() {
    const baseStyle = {
      margin: ".3rem",
      boxShadow: `4px -4px ${colors.yaDevGrey}`
    }

    return (
      <div
        style={{
          display: "inline-block",
          margin: "1px",
        }}

        onMouseEnter={e => {
          if (!!this.r.current) {
            this.r.current.className += ' badgeBtn'
          }
        }}

        onMouseLeave={_ => {
          if (!!this.r.current) {
            this.r.current.className = this.r.current.className.replace(" badgeBtn", "");
          }
        }}
      >
        <Badge
          {...this.props}
          ref={this.r}
          style={{...baseStyle, ...{ backgroundColor: this.props.badgecolor }, ...this.props.style}}
        >
          {this.props.children}
        </Badge>
      </div>
    )
  }
}

export default BadgeButton
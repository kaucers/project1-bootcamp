
import React from "react";

class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * this.props.percentage / 100;

    return (
      <svg //Creating the overall .svg graphic
          width={this.props.sqSize}
          height={this.props.sqSize}
          viewBox={viewBox}>
          <defs> 
            <clipPath id='circleView'>
            <circle
            className="circle-background"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius-this.props.strokeWidth/2}
            strokeWidth={`${this.props.strokeWidth}px`} />
            </clipPath>
          </defs>
          <image 
      width={this.props.sqSize}
      height={this.props.sqSize}
      href="https://evergoodfoods.com/wp-content/uploads/2020/04/2L1A8146-min-scaled.jpg" 
      clip-path="url(#circleView)"
    />
    
          <circle
            className="circle-outline"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`}
            />

          <circle
            className="circle-progress"
            cx={this.props.sqSize / 2}
            cy={this.props.sqSize / 2}
            r={radius}
            strokeWidth={`${this.props.strokeWidth}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset
            }} />
          {/* <text
            className="circle-text"
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle">
            {`${this.props.percentage}%`}
          </text> */}
      </svg>
    );
  }
}

//Defining the display object before exporting
CircularProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10
};

export default CircularProgressBar
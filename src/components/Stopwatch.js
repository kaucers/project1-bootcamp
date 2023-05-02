import React from "react";
//import CircularProgress from '@mui/joy/CircularProgress';
import CircularProgressBar from "./CircularProgressBar";

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      timeInit: this.props.setTime,
      time: this.props.setTime, // initial time in seconds (5 minutes)

      isActive: false,
    };
    this.intervalId = null;
  }

  componentDidMount() {
    //start counting down
    this.intervalId = setInterval(() => {
      if (this.state.isActive && this.state.time > 0) {
        this.setState((prevState) => ({
          time: prevState.time - 1,
        }));
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  //Timer specific functions
  startTimer = () => {
    //start
    this.setState({ isActive: true });
  };

  stopTimer = () => {
    //stop or pause
    this.setState({ isActive: false });
  };

  resetTimer = () => {
    //reset timer

    this.setState({ timeInit: this.props.setTime, time: this.props.setTime, isActive: false });

  };

  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };


  //Calculating the percentage remaining
  calPercent = () => {
    let timeRemain = (this.state.time/this.state.timeInit);
    timeRemain = 1-timeRemain;
    console.log(this.state.time);
    console.log(this.state.timeInit);
    console.log(timeRemain)
    return (timeRemain*100) //as a percentage for progress bar
  }

  //Inserting the timer graphic
  timerGraphic = ()=>{
    return (
      <CircularProgressBar
            strokeWidth="12.5"
            sqSize="200"
            percentage={this.calPercent()}/>
    )
  }
  
  render() {
    return (
      <div className="timerWidget rounded">
        <div className="timerClose">
          <button className="btn">
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>

        <h3 className="text">Cooking Pasta</h3>
        <div className="buttonArray">{this.timerGraphic()}</div>

        <div className="buttonArray">{this.formatTime(this.state.time)}</div>


        <div className="buttonArray">
        <button className="btn btn-info" onClick={this.startTimer}>
          Start
        </button>
        <button className="btn btn-info" onClick={this.stopTimer}>
          Stop
        </button>
        <button className="btn btn-info" onClick={this.resetTimer}>
          Reset
        </button>

        </div>
      </div>
    );
  }
}

export default Stopwatch;

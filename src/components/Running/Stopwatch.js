import React from "react";
//import CircularProgress from '@mui/joy/CircularProgress';
import CircularProgressBar from "./CircularProgressBar";
import ding from "../../assets/ding.mp3";
import tick from "../../assets/tick.mp3";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./Stopwatch.module.css";

//Defining props to be passed into the object
class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      timeInit: this.props.setTime,
      time: this.props.setTime, // initial time in seconds (5 minutes)
      isActive: false, //state whether it's running or not
      removeTask: this.props.removeTask,
    };
    this.intervalId = null;
  }

  //When the state has been updated
  componentDidUpdate(prevProps, prevState) {
    if (prevState.time === this.state.time) {
      return false;
    }
    // 1. Audio to play ding-ing
    if (this.state.time === 0) {
      this.playAudio(ding);
    }
    // 2. Audio to track time changes to allow ticking
    if (this.state.time === prevState.time - 1 && this.state.time > 0) {
      this.playAudio(tick);
    }
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
    this.setState({
      timeInit: this.props.setTime,
      time: this.props.setTime,
      isActive: false,
    });
  };

  //Extracting the seconds/minutes from seconds
  formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  //Calculating the percentage remaining
  calPercent = () => {
    let timeRemain = this.state.time / this.state.timeInit;
    timeRemain = 1 - timeRemain;
    //console.log(this.state.time);
    //console.log(this.state.timeInit);
    //console.log(timeRemain)
    return timeRemain * 100; //as a percentage for progress bar
  };

  //Extracting audio
  playAudio = (sound) => {
    new Audio(sound).play();
  };

  //Inserting the timer graphic
  timerGraphic = () => {
    return <CircularProgressBar strokeWidth="12.5" sqSize="200" percentage={this.calPercent()} taskName = {this.props.name} />;
  };

  render() {
    const isStarted = (this.state.time !== 0 && !this.state.isActive) || this.state.time === this.state.timeInit;

    return (
      <Card className={`${this.state.time === 0 ? `${styles.timerWidgetWiggle} rounded` : `${styles.timerWidget} rounded`} text-center`} bg={this.props.started ? "warning" : "light"} style={{ width: "18rem", marginLeft: 20, marginBottom: 20 }}>
        <div className={styles.closeTask}>
          <button className="btn" onClick={this.props.onDelete}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        </div>
        <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
          
          {/* <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text> */}
          <Card.Text style={{ textAlign: "center" }}>{this.timerGraphic()}</Card.Text>
          <div className='buttonArray'>{this.formatTime(this.state.time)}</div>
          <Button variant="primary" size="sm" disabled={this.state.time === 0} onClick={isStarted ? this.startTimer : this.stopTimer}>
            {isStarted ? "Start" : "Stop"}
          </Button>
          <Button variant="danger" className="m-3" size="sm" onClick={this.resetTimer}>
            Reset
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Stopwatch;

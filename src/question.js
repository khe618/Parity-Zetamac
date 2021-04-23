'use strict';

function round(num){
  return +(num.toFixed(2))
}


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      call: 0,
      put: 0, 
      rc: 0, 
      stock: 0, 
      strike: 0,
      combo: 0,
      straddle: 0,
      bw: 0,
      ps: 0, 
      unknownValue: 0, 
      questionType: 0,
      score: 0,
      time: this.props.duration
    };
  }


  componentDidMount() {
    this.newQuestion();
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.state.time > 0){
      this.setState({
        time: this.state.time - 1
      });
    }
    else{
      clearInterval(this.timerID);
    }
    
  }

  newQuestion(){
    var questionList = [this.missingCallQuestion, this.missingPutQuestion, this.missingStockQuestion, this.straddleToCall, this.straddleToPut,
    this.bwToCall, this.bwToPut, this.psToCall, this.psToPut]
    var possibleQuestions = this.props.questions
    var questionType = possibleQuestions[Math.floor(Math.random() * possibleQuestions.length)]
    this.setState({
      questionType: questionType
    })
    questionList[questionType]()
  }

  missingCallQuestion = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var stockValue = round(Math.random() * 20) - 10 + strikeValue
    var rcValue = round(Math.random() * 0.3)
    var putValue = round(Math.max(0, strikeValue - stockValue - rcValue) + Math.random() * 2)
    var callValue = round(stockValue - strikeValue + putValue + rcValue)
    this.setState({
      unknownValue: callValue,
      call: "?",
      stock: stockValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      put: putValue.toFixed(2)
    })
  }

  missingPutQuestion = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var stockValue = round(Math.random() * 20) - 10 + strikeValue
    var rcValue = round(Math.random() * 0.3)
    var callValue = round(Math.max(0, stockValue - strikeValue + rcValue) + Math.random() * 2)
    var putValue = round(strikeValue - stockValue + callValue - rcValue)
    this.setState({
      unknownValue: putValue,
      call: callValue.toFixed(2),
      stock: stockValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      put: "?"
    })
  }

  missingStockQuestion = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var comboValue = round(Math.random() * 20) - 10
    var rcValue = round(Math.random() * 0.3)
    var stockValue = round(comboValue + strikeValue - rcValue)
    this.setState({
      unknownValue: stockValue,
      combo: comboValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      stock: "?"
    })
  }

  straddleToCall = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var stockValue = round(Math.random() * 20) - 10 + strikeValue
    var rcValue = round(Math.random() * 0.3)
    var putValue = round(Math.max(0, strikeValue - stockValue - rcValue) + Math.random() * 2)
    var callValue = round(stockValue - strikeValue + putValue + rcValue)
    var straddleValue = callValue + putValue
    this.setState({
      unknownValue: callValue,
      call: "?",
      stock: stockValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      straddle: straddleValue.toFixed(2)
    })
  }

  straddleToPut = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var stockValue = round(Math.random() * 20) - 10 + strikeValue
    var rcValue = round(Math.random() * 0.3)
    var callValue = round(Math.max(0, stockValue - strikeValue + rcValue) + Math.random() * 2)
    var putValue = round(strikeValue - stockValue + callValue - rcValue)
    var straddleValue = callValue + putValue
    this.setState({
      unknownValue: putValue,
      straddle: straddleValue.toFixed(2),
      stock: stockValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      put: "?"
    })
  }

  bwToCall = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var stockValue = round(Math.random() * 20) - 10 + strikeValue
    var rcValue = round(Math.random() * 0.3)
    var callValue = round(Math.max(0, stockValue - strikeValue + rcValue) + Math.random() * 2)
    var bwValue = callValue - (stockValue - strikeValue) 
    this.setState({
      unknownValue: callValue,
      stock: stockValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      bw: bwValue.toFixed(2),
      call: "?"
    })
  }

  bwToPut = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var stockValue = round(Math.random() * 20) - 10 + strikeValue
    var rcValue = round(Math.random() * 0.3)
    var putValue = round(Math.max(0, strikeValue - stockValue - rcValue) + Math.random() * 2)
    var bwValue = putValue  + rcValue 
    this.setState({
      unknownValue: putValue,
      stock: stockValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      bw: bwValue.toFixed(2),
      put: "?"
    })
  }

  psToCall = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var stockValue = round(Math.random() * 20) - 10 + strikeValue
    var rcValue = round(Math.random() * 0.3)
    var callValue = round(Math.max(0, stockValue - strikeValue + rcValue) + Math.random() * 2)
    var psValue = callValue - rcValue
    this.setState({
      unknownValue: callValue,
      stock: stockValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      ps: psValue.toFixed(2),
      call: "?"
    })
  }

  psToPut = () => {
    var strikeValue = Math.floor(Math.random() * 16) * 5 + 10
    var stockValue = round(Math.random() * 20) - 10 + strikeValue
    var rcValue = round(Math.random() * 0.3)
    var putValue = round(Math.max(0, strikeValue - stockValue - rcValue) + Math.random() * 2)
    var psValue = putValue - (strikeValue - stockValue)
    this.setState({
      unknownValue: putValue,
      stock: stockValue.toFixed(2),
      strike: strikeValue,
      rc: rcValue.toFixed(2),
      ps: psValue.toFixed(2),
      put: "?"
    })
  }

  validate = (event) => {
      if (parseFloat(event.target.value) === this.state.unknownValue){
        this.setState({
          score: this.state.score + 1
        })
        event.target.value = ""
        this.newQuestion()
      }
  }

  restart = () => {
    this.setState({
      time: this.props.duration,
      score: 0
    })
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.newQuestion()
  }

  changeSettings = () => {
    this.props.changeSettings()
  }

  render() {
    if (this.state.time === 0){
      return (
        <div  style={{textAlign: "center"}}>
        <div style={{marginTop: 200, fontSize: 40}}>
          Score: {this.state.score}
        </div>
        <button onClick={this.restart}>Restart</button>
        <button onClick={this.changeSettings}>Change settings</button>
        </div>
      )
    }

    return (
    <div>
    <div className="row">
      <div className="col-md-11"><h4>Seconds left: {this.state.time}</h4></div>
      <div className="col-md-1"><h4>Score: {this.state.score}</h4></div>
    </div>
    <div style={{marginTop: 200, fontSize: 24}}>
      { 
        ([0, 1, 3, 5, 7].includes(this.state.questionType)) &&
        <div>
          <div className ="row">
            <div className="col-md-12 text-center" >C = {this.state.call}</div>
          </div>
        </div>
      }
      { 
        ([0, 1, 4, 6, 8].includes(this.state.questionType)) &&
        <div>
          <div className ="row">
            <div className ="col-md-12 text-center" >P = {this.state.put}</div>
          </div>
        </div>
      }
      {
        this.state.questionType === 2 &&
        <div className ="row">
          <div className="col-md-12 text-center" >Combo = {this.state.combo}</div>
        </div>
      }
      {
        (this.state.questionType === 3 || this.state.questionType === 4) &&
        <div className ="row">
          <div className="col-md-12 text-center" >Straddle = {this.state.straddle}</div>
        </div>
      }
      {
        (this.state.questionType === 5 || this.state.questionType === 6) &&
        <div className ="row">
          <div className="col-md-12 text-center" >B/W = {this.state.bw}</div>
        </div>
      }
      {
        (this.state.questionType === 7 || this.state.questionType === 8) &&
        <div className ="row">
          <div className="col-md-12 text-center" >P+S = {this.state.ps}</div>
        </div>
      }
      
      <div className ="row">
        <div className ="col-md-12 text-center" >r/c = {this.state.rc}</div>
      </div>
      <div className ="row">
        <div className="col-md-12 text-center" >S = {this.state.stock}</div>
      </div>
      <div className ="row">
        <div className ="col-md-12 text-center" >K = {this.state.strike}</div>
      </div>
      <div className ="row">
        <div className ="col-md-12 text-center"><input id="input" type="text" autoComplete="off" onKeyUp={this.validate}></input></div>
      </div>
    </div>
    </div>
    );
  }
}


/*
let domContainer = document.querySelector('#question_container');
ReactDOM.render(<Question />, domContainer);
*/
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function round(num) {
  return +num.toFixed(2);
}

var Question = function (_React$Component) {
  _inherits(Question, _React$Component);

  function Question(props) {
    _classCallCheck(this, Question);

    var _this = _possibleConstructorReturn(this, (Question.__proto__ || Object.getPrototypeOf(Question)).call(this, props));

    _this.missingCallQuestion = function () {
      var strikeValue = Math.floor(Math.random() * 16) * 5 + 10;
      var stockValue = round(Math.random() * 20) - 10 + strikeValue;
      var rcValue = round(Math.random() * 0.3);
      var putValue = round(Math.max(0, strikeValue - stockValue - rcValue) + Math.random() * 2);
      var callValue = round(stockValue - strikeValue + putValue + rcValue);
      _this.setState({
        unknownValue: callValue,
        call: "?",
        stock: stockValue.toFixed(2),
        strike: strikeValue,
        rc: rcValue.toFixed(2),
        put: putValue.toFixed(2)
      });
    };

    _this.missingPutQuestion = function () {
      var strikeValue = Math.floor(Math.random() * 16) * 5 + 10;
      var stockValue = round(Math.random() * 20) - 10 + strikeValue;
      var rcValue = round(Math.random() * 0.3);
      var callValue = round(Math.max(0, stockValue - strikeValue + rcValue) + Math.random() * 2);
      var putValue = round(strikeValue - stockValue + callValue - rcValue);
      _this.setState({
        unknownValue: putValue,
        call: callValue.toFixed(2),
        stock: stockValue.toFixed(2),
        strike: strikeValue,
        rc: rcValue.toFixed(2),
        put: "?"
      });
    };

    _this.missingStockQuestion = function () {
      var strikeValue = Math.floor(Math.random() * 16) * 5 + 10;
      var comboValue = round(Math.random() * 20) - 10;
      var rcValue = round(Math.random() * 0.3);
      var stockValue = round(comboValue + strikeValue - rcValue);
      _this.setState({
        unknownValue: stockValue,
        combo: comboValue.toFixed(2),
        strike: strikeValue,
        rc: rcValue.toFixed(2),
        stock: "?"
      });
    };

    _this.straddleToCall = function () {
      var strikeValue = Math.floor(Math.random() * 16) * 5 + 10;
      var stockValue = round(Math.random() * 20) - 10 + strikeValue;
      var rcValue = round(Math.random() * 0.3);
      var putValue = round(Math.max(0, strikeValue - stockValue - rcValue) + Math.random() * 2);
      var callValue = round(stockValue - strikeValue + putValue + rcValue);
      var straddleValue = callValue + putValue;
      _this.setState({
        unknownValue: callValue,
        call: "?",
        stock: stockValue.toFixed(2),
        strike: strikeValue,
        rc: rcValue.toFixed(2),
        straddle: straddleValue.toFixed(2)
      });
    };

    _this.straddleToPut = function () {
      var strikeValue = Math.floor(Math.random() * 16) * 5 + 10;
      var stockValue = round(Math.random() * 20) - 10 + strikeValue;
      var rcValue = round(Math.random() * 0.3);
      var callValue = round(Math.max(0, stockValue - strikeValue + rcValue) + Math.random() * 2);
      var putValue = round(strikeValue - stockValue + callValue - rcValue);
      var straddleValue = callValue + putValue;
      _this.setState({
        unknownValue: putValue,
        straddle: straddleValue.toFixed(2),
        stock: stockValue.toFixed(2),
        strike: strikeValue,
        rc: rcValue.toFixed(2),
        put: "?"
      });
    };

    _this.validate = function (event) {
      if (parseFloat(event.target.value) === _this.state.unknownValue) {
        _this.setState({
          score: _this.state.score + 1
        });
        event.target.value = "";
        _this.newQuestion();
      }
    };

    _this.restart = function () {
      _this.setState({
        time: 120,
        score: 0
      });
      _this.timerID = setInterval(function () {
        return _this.tick();
      }, 1000);
      _this.newQuestion();
    };

    _this.state = {
      call: 0,
      put: 0,
      rc: 0,
      stock: 0,
      strike: 0,
      combo: 0,
      straddle: 0,
      unknownValue: 0,
      questionType: 0,
      score: 0,
      time: 120
    };
    return _this;
  }

  _createClass(Question, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.newQuestion();
      this.timerID = setInterval(function () {
        return _this2.tick();
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.state.time > 0) {
        this.setState({
          time: this.state.time - 1
        });
      } else {
        clearInterval(this.timerID);
      }
    }
  }, {
    key: "newQuestion",
    value: function newQuestion() {
      var questionList = [this.missingCallQuestion, this.missingPutQuestion, this.missingStockQuestion, this.straddleToCall, this.straddleToPut];
      console.log(questionList);
      var questionType = Math.floor(Math.random() * questionList.length);
      this.setState({
        questionType: questionType
      });
      questionList[questionType]();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.time === 0) {
        return React.createElement(
          "div",
          { style: { textAlign: "center" } },
          React.createElement(
            "div",
            { style: { marginTop: 200, fontSize: 40 } },
            "Score: ",
            this.state.score
          ),
          React.createElement(
            "button",
            { onClick: this.restart },
            "Restart"
          )
        );
      }

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-11" },
            React.createElement(
              "h4",
              null,
              "Seconds left: ",
              this.state.time
            )
          ),
          React.createElement(
            "div",
            { className: "col-md-1" },
            React.createElement(
              "h4",
              null,
              "Score: ",
              this.state.score
            )
          )
        ),
        React.createElement(
          "div",
          { style: { marginTop: 200, fontSize: 24 } },
          (this.state.questionType <= 1 || this.state.questionType === 3) && React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-md-12 text-center" },
                "C = ",
                this.state.call
              )
            )
          ),
          (this.state.questionType <= 1 || this.state.questionType === 4) && React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "row" },
              React.createElement(
                "div",
                { className: "col-md-12 text-center" },
                "P = ",
                this.state.put
              )
            )
          ),
          this.state.questionType === 2 && React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-12 text-center" },
              "Combo = ",
              this.state.combo
            )
          ),
          (this.state.questionType === 3 || this.state.questionType === 4) && React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-12 text-center" },
              "Straddle = ",
              this.state.straddle
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-12 text-center" },
              "r/c = ",
              this.state.rc
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-12 text-center" },
              "S = ",
              this.state.stock
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-12 text-center" },
              "K = ",
              this.state.strike
            )
          ),
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "col-md-12 text-center" },
              React.createElement("input", { id: "input", type: "text", autoComplete: "off", onKeyUp: this.validate })
            )
          )
        )
      );
    }
  }]);

  return Question;
}(React.Component);

var domContainer = document.querySelector('#question_container');
ReactDOM.render(React.createElement(Question, null), domContainer);
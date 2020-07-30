var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Welcome = function (_React$Component) {
	_inherits(Welcome, _React$Component);

	function Welcome(props) {
		_classCallCheck(this, Welcome);

		var _this = _possibleConstructorReturn(this, (Welcome.__proto__ || Object.getPrototypeOf(Welcome)).call(this, props));

		_this.changeSettings = function () {
			_this.setState({
				"startGame": false
			});
		};

		_this.state = {
			putCall: true,
			straddle: true,
			combo: true,
			duration: 120,
			startGame: false,
			questions: []
		};

		_this.handleInputChange = _this.handleInputChange.bind(_this);
		_this.handleSubmit = _this.handleSubmit.bind(_this);
		return _this;
	}

	_createClass(Welcome, [{
		key: "handleInputChange",
		value: function handleInputChange(event) {
			var target = event.target;
			var value = target.name === 'duration' ? target.value : target.checked;
			var name = target.name;
			this.setState(_defineProperty({}, name, value));
		}
	}, {
		key: "handleSubmit",
		value: function handleSubmit(event) {
			var questions = [];
			if (this.state.putCall) {
				questions.push(0);
				questions.push(1);
			}
			if (this.state.combo) {
				questions.push(2);
			}
			if (this.state.straddle) {
				questions.push(3);
				questions.push(4);
			}
			if (questions.length > 0) {
				this.setState({
					"startGame": true,
					"questions": questions
				});
			}
			console.log(this.state);
			event.preventDefault();
		}
	}, {
		key: "render",
		value: function render() {
			if (this.state.startGame) {
				return React.createElement(Question, { duration: this.state.duration, questions: this.state.questions, changeSettings: this.changeSettings });
			} else {
				return React.createElement(
					"div",
					{ id: "welcome" },
					React.createElement(
						"h1",
						null,
						"Parity Game"
					),
					React.createElement(
						"form",
						{ onSubmit: this.handleSubmit, className: "game-options" },
						React.createElement(
							"dl",
							null,
							React.createElement(
								"dt",
								null,
								React.createElement(
									"label",
									null,
									"Put-Call"
								),
								React.createElement("input", { checked: this.state.putCall, name: "putCall", type: "checkbox", onChange: this.handleInputChange })
							),
							React.createElement(
								"dd",
								null,
								"Converting call to put and vice versa"
							),
							React.createElement(
								"dt",
								null,
								React.createElement(
									"label",
									null,
									"Combo"
								),
								React.createElement("input", { checked: this.state.combo, name: "combo", type: "checkbox", onChange: this.handleInputChange })
							),
							React.createElement(
								"dd",
								null,
								"Converting combo value to stock value"
							),
							React.createElement(
								"dt",
								null,
								React.createElement(
									"label",
									null,
									"Straddle"
								),
								React.createElement("input", { checked: this.state.straddle, name: "straddle", type: "checkbox", onChange: this.handleInputChange })
							),
							React.createElement(
								"dd",
								null,
								"Converting straddle to call or put value"
							)
						),
						React.createElement(
							"p",
							null,
							"Duration:",
							React.createElement(
								"select",
								{ name: "duration", onChange: this.handleInputChange, value: this.state.duration },
								React.createElement(
									"option",
									{ value: "30" },
									"30 seconds"
								),
								React.createElement(
									"option",
									{ value: "60" },
									"60 seconds"
								),
								React.createElement(
									"option",
									{ value: "120" },
									"120 seconds"
								),
								React.createElement(
									"option",
									{ value: "300" },
									"300 seconds"
								),
								React.createElement(
									"option",
									{ value: "600" },
									"600 seconds"
								)
							)
						),
						React.createElement("input", { type: "submit", value: "Start" })
					)
				);
			}
		}
	}]);

	return Welcome;
}(React.Component);

var domContainer = document.querySelector('#welcome_container');
ReactDOM.render(React.createElement(Welcome, null), domContainer);
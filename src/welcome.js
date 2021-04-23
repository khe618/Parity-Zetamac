class Welcome extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      putCall: true,
	      straddle: true,
	      combo: true,
	      bwps: true,
	      duration: 120,
	      startGame: false,
	      questions: []
	    };

	    this.handleInputChange = this.handleInputChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.name === 'duration' ? target.value : target.checked;
	    const name = target.name;
	    this.setState({
	      [name]: value
	    });
	  }

	handleSubmit(event){
		var questions = []
		if (this.state.putCall){
			questions.push(0)
			questions.push(1)
		}
		if (this.state.combo){
			questions.push(2)
		}
		if (this.state.straddle){
			questions.push(3)
			questions.push(4)
		}
		if (this.state.bwps){
			questions.push(5)
			questions.push(6)
			questions.push(7)
			questions.push(8)
		}
		if (questions.length > 0){
			this.setState({
				"startGame": true,
				"questions": questions
			})
		}
		console.log(this.state)
		event.preventDefault()
	}

	changeSettings = () => {
		this.setState({
			"startGame": false
		})
	}

	render() {
		if (this.state.startGame){
			return <Question duration={this.state.duration} questions={this.state.questions} changeSettings={this.changeSettings}/>
		}
		else{
			return (
			<div id='welcome'>
		      <h1>Parity Game</h1>
		      <form onSubmit={this.handleSubmit} className='game-options'>
		        <dl>
		          <dt>
		            <label>
		            	Put-Call
		            </label>
		              <input checked={this.state.putCall} name='putCall' type='checkbox' onChange={this.handleInputChange}>
		              
		              </input>
		            
		          </dt>
		          <dd>Converting call to put and vice versa</dd>
		          <dt>
		            <label>
		            	Combo
		            </label>
		              <input checked={this.state.combo} name='combo' type='checkbox' onChange={this.handleInputChange}>
		              
		              </input>
		            
		          </dt>
		          <dd>Converting combo value to stock value</dd>
		          <dt>
		            <label>
		            	Straddle
		            </label>
		              <input checked={this.state.straddle} name='straddle' type='checkbox' onChange={this.handleInputChange}>
		              
		              </input>
		            
		          </dt>
		          <dd>Converting straddle to call or put value</dd>
		          <dt>
		            <label>
		            	B/W and P+S
		            </label>
		              <input checked={this.state.bwps} name='bwps' type='checkbox' onChange={this.handleInputChange}>
		              
		              </input>
		            
		          </dt>
		          <dd>Converting B/W or P+S to call or put value</dd>
		        </dl>

		        <p>
		          Duration:
		          <select name='duration' onChange={this.handleInputChange} value={this.state.duration}>
		            <option value='30'>30 seconds</option>
		            <option value='60'>60 seconds</option>
		            <option value='120'>120 seconds</option>
		            <option value='300'>300 seconds</option>
		            <option value='600'>600 seconds</option>
		          </select>
		        </p>
		        <input type='submit' value='Start'>
		        </input>
		      </form>
		    </div>
		    )
		}
		
	}
}

let domContainer = document.querySelector('#welcome_container');
ReactDOM.render(<Welcome />, domContainer);
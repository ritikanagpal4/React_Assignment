import React from 'react';
import ReactDOM from 'react-dom';
var _ = require('lodash');
import update from 'immutability-helper';

export var data = [
	{
		'name': 'What can be done for the betterment of the country',
		'optone': 'there should be dictatorship',
		'opttwo': 'modiji should be given all the powers',
		'optthree': 'nothing can be done'
	}, {
		'name': 'What can be done for the betterment of the city',
		'optone': 'keep the city clean',
		'opttwo': 'be less violent',
		'optthree': 'nothing can be done'
	}
]
export class Header extends React.Component {
	render() {
		return (
			<div>
				<center>
					<h1>Existing Polls</h1>
					<br/></center>
			</div>
		);
	}
}
export class TableRow extends React.Component {
	constructor() {
		super();
		this.state = {
			value: '',
			opnion: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.select = this.select.bind(this);
	}
	handleSubmit(evt) {
		alert("Your opinion :     '" + this.state.value + "'      has been submitted..!!!")
		console.log(data)
	}
	select(evt) {
		this.setState({value: evt.target.value, opinion: 1})
	}
	render() {
		var pollOpinion = '';
		var stylepoll = {
			color: 'red',
			fontsize: 5
		}
		if (this.state.opinion) {
			pollOpinion = this.state.value;
			stylepoll = {
				color: 'blue',
				fontsize: 5
			}
		} else {
			pollOpinion = 'Not yet selected'
		}
		return (
			<div className="jumbotron">
				<div>
					Poll=&gt; &nbsp;
					<b>{this.props.data.name}</b>!
				</div>
				<div>Option 1 :&nbsp;&nbsp;<input type="radio" name="poll" onChange={(event) => {
				this.select(event)
			}} value={this.props.data.optone}/>&nbsp;{this.props.data.optone}
				</div>
				<div>Option 2 :&nbsp;&nbsp;<input type="radio" name="poll" onChange={(event) => {
				this.select(event)
			}} value={this.props.data.opttwo}/>&nbsp;{this.props.data.opttwo}
				</div>
				<div>Option 3 :&nbsp;&nbsp;<input type="radio" name="poll" onChange={(event) => {
				this.select(event)
			}} value={this.props.data.optthree}/>&nbsp;{this.props.data.optthree}</div>
				<div>Your Opinion:
					<span style={stylepoll}>
						{pollOpinion}</span>
				</div>
				<div>
					<button className="btn-primary btn pull-right" onClick={this.handleSubmit}>
						Submit</button>
				</div>
			</div>
		);
	}
}
export class AddPoll extends React.Component {
	constructor() {
		super();
		this.state = {
			data: '',
			name: '',
			optone: '',
			opttwo: '',
			optthree: ''
		}
		this.handleName = this.handleName.bind(this);
		this.handleOne = this.handleOne.bind(this);
		this.handleTwo = this.handleTwo.bind(this);
		this.handleThree = this.handleThree.bind(this);
		this.submit = this.submit.bind(this);
	}
	submit() {
		var AddPollData = [
			{
				name: this.state.name,
				optone: this.state.optone,
				opttwo: this.state.opttwo,
				optthree: this.state.optthree
			}
		]
		// console.log(data);
		const initialArray = data;
		const newArray = update(initialArray, {$push: AddPollData});
		data = newArray;
		this.setState({data: data});
		this.props.aim(data);
		/*alert('ques: ' + this.state.name + '  option1:  ' + this.state.optone + '  option2:  ' + this.state.opttwo + '  option3:  ' + this.state.optthree)
		this.setState({name: '', optone: '', opttwo: '', optthree: ''})
*/
	}
	handleName(event) {
		this.setState({name: event.target.value});
	}
	handleOne(event) {
		this.setState({optone: event.target.value});
	}
	handleTwo(event) {
		this.setState({opttwo: event.target.value});
	}
	handleThree(event) {
		this.setState({optthree: event.target.value});
	}
	render() {
		return (
			<div>
				<h1>
					Add a new Poll
				</h1><br/>
				<div className='jumbotron'>
					<div className="form-group">
						<label htmlFor="newpoll">New Poll:</label>
						<input type="text" className="form-control" id="newpoll" placeholder="Enter new poll" onChange={(event) => {
							this.handleName(event)
						}} value={this.state.name}/></div>
					<div className="form-group">
						<label htmlFor="optone">Option 1:</label>
						<input type="text" className="form-control" id="optone" placeholder="Enter option" onChange={(event) => {
							this.handleOne(event)
						}} value={this.state.optone}/></div>
					<div className="form-group">
						<label htmlFor="opttwo">Option 2:</label>
						<input type="text" className="form-control" id="opttwo" placeholder="Enter option" onChange={(event) => {
							this.handleTwo(event)
						}} value={this.state.opttwo}/></div>
					<div className="form-group">
						<label htmlFor="optthree">Option 3:</label>
						<input type="text" className="form-control" id="optthree" placeholder="Enter option" onChange={(event) => {
							this.handleThree(event)
						}} value={this.state.optthree}/></div>
					<button className="btn btn-default btn-primary" onClick={this.submit}>Submit</button>
				</div>
			</div>
		);
	}
}

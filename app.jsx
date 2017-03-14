import React from 'react';
import ReactDOM from 'react-dom';
var _ = require('lodash');
import update from 'immutability-helper';
var Modal = require('boron/DropModal');
export var data = [
	{
		'name': 'What can be done for the betterment of the country',
		'optone': 'there should be dictatorship',
		'opttwo': 'modiji should be given all the powers',
		'optthree': 'nothing can be done',
		'expiry':'03/14/2017'
	}, {
		'name': 'What can be done for the betterment of the city',
		'optone': 'keep the city clean',
		'opttwo': 'be less violent',
		'optthree': 'nothing can be done',
		'expiry':'10/14/2017'
	}
]

export class Header extends React.Component {
	render() {
		return (
			<div>
				<center>
					<h1>Existing Polls</h1>
					<br/>
				</center>
			</div>
		);
	}
}
export class TableRow extends React.Component {
	constructor() {
		super();
		this.state = {value: '',opinion: ''}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.select = this.select.bind(this);
		this.hideModal=this.hideModal.bind(this);
	}
	handleSubmit(evt) {
		if(this.state.opinion){
			this.showModal();
			//alert("Your opinion : '" + this.state.value + "'  has been submitted..!!!")
		}
		else{
			alert('Please Select an Option')
		}
		console.log(data)
	}
	select(evt) {
		this.setState({value: evt.target.value,opinion:1})
	}
	showModal(){
		this.refs.modal.show()
	}
	hideModal(){
		this.refs.modal.hide()
	}
	render() {
		var pollOpinion = '';
		var stylepoll = {color: 'red',fontsize: 5}
		if (this.state.opinion) {
			pollOpinion = this.state.value;
			stylepoll = {color: 'blue',fontsize: 5}
		}
		else {
			pollOpinion = 'Not yet selected'
		}
		var pollModal={
			color:'red',
			display:'inline-block'
		}
		return (
			<div className="jumbotron">
					<div>
						Poll=&gt;
						<b>{this.props.data.name}</b>!
						<span className="label label-danger pull-right">Submit poll before : {this.props.data.expiry}</span>
				  	</div>
					<div>
						<label> Option 1 : </label>
						<input type="radio" name="poll" onChange={(event) => {this.select(event)}} value={this.props.data.optone}/>{this.props.data.optone}
					</div>
					<div>
						<label>Option 2 : </label>
						<input type="radio" name="poll" onChange={(event) => {this.select(event)}} value={this.props.data.opttwo}/>{this.props.data.opttwo}
					</div>
					<div>
						<label>Option 3 : </label>
						<input type="radio" name="poll" onChange={(event) => {this.select(event)}} value={this.props.data.optthree}/>{this.props.data.optthree}
					</div>
					<div>
						<label>Your Opinion : </label>
						<span style={stylepoll}> {pollOpinion} </span>
					</div>
		        	<Modal ref="modal">
		         		<span>
						<h2 style={pollModal}> !!Your poll has been submitted.!!</h2> <button onClick={this.hideModal} className="btn-primary">close</button>
				 	</span>
		       	 	</Modal>
					<div>
						<button className="btn-primary btn pull-right" onClick={this.handleSubmit}>Submit</button>
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
			expiry:'',
			optone: '',
			opttwo: '',
			optthree: ''
		}
		this.handleName = this.handleName.bind(this);
		this.handleOne = this.handleOne.bind(this);
		this.handleTwo = this.handleTwo.bind(this);
		this.handleThree = this.handleThree.bind(this);
		this.handleExpiry=this.handleExpiry.bind(this);
		this.submit = this.submit.bind(this);
		this.hideModal=this.hideModal.bind(this);
	}
	submit() {
		if(this.state.name&&this.state.optone&&this.state.opttwo&&this.state.optthree&&this.state.expiry ){
			var AddPollData = [
				{
					name: this.state.name,
					optone: this.state.optone,
					opttwo: this.state.opttwo,
					optthree: this.state.optthree,
					expiry: this.state.expiry
				}
			]
			const initialArray = data;
			const newArray = update(initialArray, {$push: AddPollData});
			data = newArray;
			this.setState({data: data});
			this.props.aim(data);
			this.setState({
				name: '',
				optone: '',
				opttwo: '',
				optthree: '',
				expiry:''
			})
			this.showModal();
			//alert('Congratulations...!!   Poll has been added successfully.')
		}
		else {alert("fields are empty. Enter the values and try again")}
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
	handleExpiry(date){
		this.setState({expiry:date});
	}
	componentDidMount(){
		$('.datepicker').datepicker()
	}
	showModal(){
		this.refs.modal.show()
	}
	hideModal(){
		this.refs.modal.hide()
	}
	render() {
		let expiry_var = this.handleExpiry;
		$(document).on('change', '#datepicker', function (e) {
			var date=$(this).val();
			console.log(date);
			expiry_var(date);
			})
		console.log(this.state)
		var pollModal={
			color:'red',
			display:'inline-block'
		}
		return (
			<div>
					<h1>Add a new Poll</h1><br/>
					<div className='jumbotron'>
						<div className="form-group">
							<label htmlFor="newpoll">New Poll:</label>
							<input type="text" className="form-control" id="newpoll" placeholder="Enter new poll" onChange={(event) => {this.handleName(event)}} value={this.state.name}/>
						</div>
						<div className="form-group">
							<label htmlFor="optone">Option 1:</label>
							<input type="text" className="form-control" id="optone" placeholder="Enter option" onChange={(event) => {this.handleOne(event)}} value={this.state.optone}/>
						</div>
						<div className="form-group">
							<label htmlFor="opttwo">Option 2:</label>
							<input type="text" className="form-control" id="opttwo" placeholder="Enter option" onChange={(event) => {this.handleTwo(event)}} value={this.state.opttwo}/>
						</div>
						<div className="form-group">
							<label htmlFor="optthree">Option 3:</label>
							<input type="text" className="form-control" id="optthree" placeholder="Enter option" onChange={(event) => {this.handleThree(event)}} value={this.state.optthree}/>
						</div>
						<div className="form-group">
							<label htmlFor="datepicker">Expiry Date:</label>
							<input type="text" className="datepicker form-control" id="datepicker" placeholder="Choose an expiry date" value={this.state.expiry} />
						</div>
						<Modal ref="modal">
							<span>
						 		<center><h2 style={pollModal}>Congratulations...!!   Poll has been added successfully.!</h2> <button onClick={this.hideModal} className="btn-primary">close</button></center>
							</span>
						</Modal>
						<button className="btn btn-default btn-primary" onClick={this.submit}>Submit</button>
					</div>
			</div>
		);
	}
}

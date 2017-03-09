import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './app.jsx';
import {TableRow} from './app.jsx';
import {AddPoll} from './app.jsx';
import {data} from './app.jsx';
import update from 'immutability-helper';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			data: data,
			id: true
		};
		this.aim = this.aim.bind(this);
	}
	// componentWillReceiveProps(nextProps) {
	// 	console.log(nextProps);
	// 	this.setState({data: nextProps})
	// }
	aim(data) {
		console.log(data);
		data = data
		this.setState({newData: data, id: false})
	}

	render() {

		console.log(this.state);
		return (
			<div className='container'>
				<div className='col-md-8'>
					<Header/> {data.map((person, i) => <TableRow key={i} data={person}/>)}
				</div>
				<div className='col-md-4'>
					<AddPoll aim={this.aim}/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>, document.getElementById('app'));

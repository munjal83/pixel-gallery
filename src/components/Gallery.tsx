import React from 'react';
import axios from 'axios';

export default class Gallery extends React.Component {
	state = {
		result: {
			photos: [
				{
					image_url: '',
					name: '',
					description: '',
					times_viewed: 0,
					user: {
						fullname: ''
					}
				}
			]
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	async fetchData() {
		const API_KEY = process.env.REACT_APP_CONSUMER_KEY;
		const API_URL = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=';
		const response = await axios.get(`${API_URL}${API_KEY}`)
			
		this.setState({result: response.data});
	}

	render() {

		return (
			<ul>
				<div>
           			{this.state.result.photos.map((photo, index) => <div key={index}> <img src={photo.image_url} alt=""></img></div>)} 
       			</div>
	
			</ul>
		)
	}
}
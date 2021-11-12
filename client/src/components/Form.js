import React, { Component } from 'react';
import Axios from 'axios';

export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subject: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        Axios
            .post('http://localhost:8000/data', this.state)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { subject } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="subject" value={subject} onChange={this.handleChange} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}
import React, { Component } from 'react';
import axios from 'axios';

export default class FormSubmit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    handleInput(e) {
        this.setState({
            value: e.target.value
        });
    }

    PostServer(e) {

    }

    render() {
        return (
            <form>
                <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)} placeholder="Subject" />
                <input type="submit" onSubmit={this.PostServer.bind(this)} value="submit" />
            </form>
        )
    }
}
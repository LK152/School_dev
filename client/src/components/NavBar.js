import React, { Component } from 'react';
import Login from './Login';
import '../css/NavBar.css';

export default class NavBar extends Component {
    render() {
        return (
            <div className="NavBar">
                <Login />
            </div>
        );
    }
}
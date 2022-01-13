import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../App.css'


class IconButton extends Component {
    render() {
        return (
            <button onClick={() => this.props.func(this.props.id)}>
                <i><FontAwesomeIcon icon={this.props.icon} /></i>
            </button>
        )
    }
  }
  
  export default IconButton;
import React, { Component, PropTypes } from 'react';

export default class PageTwo extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      current: 0,
    };
  }

  render(){
    return (
      <h1>怕个2</h1>
    )
  }

}
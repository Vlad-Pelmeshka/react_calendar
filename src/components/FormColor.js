import React, { Component } from 'react';
import InputColor from 'react-input-color';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {}
    }
    this.setColor = this.setColor.bind(this)
  }

  setColor(color) {
    this.setState({ color })
    this.props.onSetColor(color)
  }

  render() {
    const { color } = this.state;

    return (
      <div>
        <InputColor
          initialValue={this.props.color}
          onChange={this.setColor}
          placement="right"
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

class AutoTypingTextAnimation extends Component {
  state = {
    strings: [],
    currentStringIndex: 0,
    currentString: '',
    currentCharIndex: 0,
    typingInterval: null,
  };

  componentDidMount() {
    const { strings } = this.props;
    this.setState({ strings });
    this.startTyping(strings[0]);
  }

  componentWillUnmount() {
    this.clearTypingInterval();
  }

  startTyping = (string) => {
    this.clearTypingInterval();
    const typingInterval = setInterval(this.typeCharacter, 100); // Adjust the delay here
    this.setState({
      currentString: string,
      currentCharIndex: 0,
      typingInterval,
    });
  };

  clearTypingInterval = () => {
    clearInterval(this.state.typingInterval);
  };

  typeCharacter = () => {
    const { currentString, currentCharIndex, strings, currentStringIndex } = this.state;

    if (currentCharIndex < currentString.length) {
      this.setState({ currentCharIndex: currentCharIndex + 1 });
    } else {
      const nextStringIndex = (currentStringIndex + 1) % strings.length;
      this.setState({ currentStringIndex: nextStringIndex });
      this.startTyping(strings[nextStringIndex]);
    }
  };

  render() {
    const { currentString, currentCharIndex } = this.state;
    const charactersToShow = currentString.substring(0, currentCharIndex);

    return (
      <div className="auto-typing-text-animation" style={{ fontSize: '40px', marginLeft: "20px" }}>
        {charactersToShow}
      </div>
    );
  }
}

export default AutoTypingTextAnimation;

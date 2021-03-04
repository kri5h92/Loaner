import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error });
    console.log({ errorInfo });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <h1 className='text-3xl font-bold text-center'>
          Something is fishy :(
        </h1>
      );
    }
    // eslint-disable-next-line
    return this.props.children;
  }
}

export default ErrorBoundary;

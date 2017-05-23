import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../src/index';
var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  testFunc() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const images = [
      {
        "url": "https://t.alipayobjects.com/images/T1Ch8kXfpdXXXXXXXX.png"
      },
      {

        "url": "https://os.alipayobjects.com/rmsportal/GhjqstwSgxBXrZS.png"
      },
      {

        "url": "https://t.alipayobjects.com/images/T1r5RkXotXXXXXXXXX.png"
      }
    ]
    return (
      <Seed images ={images} />
    )
  }
}
ReactDOM.render(<App />, appElement);
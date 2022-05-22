import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      //    <div className='d-flex justify-content-center align-items-center'>
      <div>
        <div className="spinner-wrapper">
          <div className="donut"></div>
        </div>
      </div>
    )
  }
}

export default Spinner

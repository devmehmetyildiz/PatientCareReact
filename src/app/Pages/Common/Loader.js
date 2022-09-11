import React, { Component } from 'react'

export class Loader extends Component {
    render() {
        return (
            <div className='d-flex justify-content-center align-items-center'>
                <div>
                    <div className="spinner-wrapper">
                        <div className='d-flex flex-column'>
                            <h4>Giriş Yapılıyor ...</h4>
                            <div className="pixel-loader"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loader

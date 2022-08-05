import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { CloseModal } from '../Redux/actions/DatatableActions';
export class Columnmanagement extends Component {

    handleonRolehange = (e) => {
    };
    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Görünüm Ayarlama
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.Datatables.selecteditem.map((subitem) =>
                        <div className='col-3'>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                        onChange={(e) => {
                                            this.handleonRolehange(!subitem.hidden)
                                        }}
                                        type="checkbox" id={subitem} key={subitem.dataField} className="form-check-input" name={subitem.dataField} value={subitem.hidden} />
                                    <i className="input-helper"></i>
                                    {subitem.text}
                                </label>
                            </div>
                        </div>

                    )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.CloseModal() }}>Vazgeç</Button>
                    <Button onClick={() => { this.DeleteHandle() }}>Sil</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    Datatables: state.Datatables
})

const mapDispatchToProps = { CloseModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Columnmanagement))







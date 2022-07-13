import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {  GetAllStations, CloseDeleteModal, DeleteStation } from '../../Redux/actions/StationAction'

export class Delete extends Component {

    DeleteHandle = async () => {
        await this.props.DeleteStation(this.props.Stations.selected_station)
        await this.props.ClearSelectedStation()
        await this.props.GetAllStations()
        await this.props.CloseDeleteModal()
    }

   
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
                        İsyasyon Silme
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {this.props.Stations.selected_station.name} istasyonunu silmek istediğinize Eminmisiniz?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.props.CloseDeleteModal() }}>Vazgeç</Button>
                    <Button onClick={() => { this.DeleteHandle() }}>Sil</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    Stations: state.Stations,
})

const mapDispatchToProps = { GetAllStations, CloseDeleteModal, DeleteStation }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))







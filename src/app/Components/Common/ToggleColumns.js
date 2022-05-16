import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';


export class ToggleColumns extends Component {
    constructor(props) {
        super(props);
      

    }
    
    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="parametername">
                                        <Form.Label>Case Name</Form.Label>
                                        <Form.Control type="text" name="parametername" required
                                            placeholder="parametername" />
                                    </Form.Group>


                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer >
                        <Button variant="primary" type="submit">  Add Case </Button>

                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}
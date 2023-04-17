import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Label, Alert } from "reactstrap"
import instance from "../../../helpers/api/axiosHelper"



const AddChenniluModal = (props) => {
    //  id
    let { id } = useParams();

    // state
    const [chenniluCount, setChenniluCount] = useState(0)
    const [status, setStatus] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")


    const {
        className
    } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const addChennilu = (e) => {
        e = isNaN(parseInt(e)) === true ? 0 : parseInt(e)
        setChenniluCount(e)
    }
    const submitForm = () => {
        let data  = {
            chennilu: chenniluCount,
            reportedbeedi_id: id
        }
        instance.post(`${process.env.REACT_APP_API_URL}/admin/beedis/chennilu`, data)
        .then((res)=> {
            toggle()
            setStatus(1)
            props.getChennilu()
        })
        .catch((error)=> {
            setStatus(2)
            setErrorMessage(error.response.data.message)
        })
    }

    return (
        <div>
            {/* <button onClick={() => toggle()} className="btn btn-primary">Add chennilu</button> */}
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <div>
                    <ModalHeader toggle={toggle}>Add Chennilu</ModalHeader>
                    <ModalBody>
                        {status === 1 &&
                            <Alert color="success">
                                Chennilu added successfully
                            </Alert>
                        } {status == 2 &&
                            <Alert color="danger">
                                {errorMessage}
                            </Alert>
                        }
                        <Row>
                            <Col lg="12">
                                <Label>Chennilu</Label>
                                <input
                                    name="Chennilu"
                                    label="Chennilu"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter chennilu quantity"
                                    defaultValue={0}
                                    onChange={(e) => addChennilu(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={submitForm} type="submit" color="primary">Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </div>
            </Modal>
        </div>
    )
}
export default AddChenniluModal;
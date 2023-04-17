import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Label, Alert } from "reactstrap"
import instance from "../../../helpers/api/axiosHelper"
// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
// validation schema
const schema = yup.object().shape({
    branch_id: yup.string().required("Please select a supplier"),
});
const AssignBranchmodal = (props) => {
    //  id
    let { id } = useParams();
    // state
    const [branches, setBranches] = useState([]);
    const [status, setStatus] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    // form validation
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const {
        className
    } = props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const onSubmit = (data) => {
        data.manager_id = id
        instance.post(`${process.env.REACT_APP_API_URL}/admin/assignmanager`, data)
            .then((res) => {
                setStatus(1)
                toggle()
                props.getManagerBranches()
            })
            .catch((error) => {
                setStatus(2)
                setErrorMessage(error.response.data.message)
            })
    }
    useEffect(() => {
        console.log(errors)
    }, [errors])
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/list/branch/`)
            .then((res) => {
                setBranches(res.data)
            })
    }, [])
    return (
        <div>
            <button onClick={() => toggle()} className="btn btn-success">Assign Branch</button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ModalHeader toggle={toggle}>Add Branch</ModalHeader>
                    <ModalBody>
                        {status === 1 &&
                            <Alert color="success">
                                Branch added successfully
                            </Alert>
                        } {status == 2 &&
                            <Alert color="danger">
                                {errorMessage}
                            </Alert>
                        }
                        <Row>
                            <Col lg="12">
                                <Label>Branches</Label>
                                <select
                                    name="branch_id"
                                    label="Branches"
                                    className="form-select"
                                    {...register("branch_id")}
                                >
                                    <option value="">Select Branch</option>
                                    {branches.map((row) =>
                                        <option value={row.uuid}>{row.name}</option>
                                    )}
                                </select>
                                <p className="text-danger">{errors.branch_id?.message}</p>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
export default AssignBranchmodal;
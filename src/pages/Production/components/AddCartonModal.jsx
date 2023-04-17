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
    cartons: yup.number().min(1),
    product_id: yup.string().required("Please select a product"),
});

const AddCartonModal = (props) => {
    //  id
    let { id } = useParams();

    // state
    const [products, setProducts] = useState([])
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

    const toggle = () => {
        setModal(!modal);
        setStatus(0);
        setErrorMessage("");
    };


    const onSubmit = (data) => {
        instance.post(`${process.env.REACT_APP_API_URL}/admin/cartons/`, data)
            .then((res) => {
                setStatus(1)
                setTimeout(() => {
                    toggle()
                    location.reload()
                }, 300)
            })
            .catch((error) => {
                setStatus(2)
                setErrorMessage(error.response.data.message)
            })
    }

    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/products/`)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <button onClick={() => toggle()} className="btn btn-primary">Add Carton</button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ModalHeader toggle={toggle}>Add Carton</ModalHeader>
                    <ModalBody>
                        {status === 1 &&
                            <Alert color="success">
                                Carton added successfully
                            </Alert>
                        } {status == 2 &&
                            <Alert color="danger">
                                {errorMessage}
                            </Alert>
                        }
                        <Row>
                            <Col lg="12">
                                <Label>Cartons</Label>
                                <input
                                    name="cartons"
                                    label="Cartons"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter number of cartons"
                                    defaultValue={0}
                                    {...register("cartons")}
                                />
                                <p className="text-danger">{errors.cartons?.message}</p>
                            </Col>
                            <Col lg="12">
                                <Label>Product</Label>
                                <select
                                    name="product"
                                    label="Product"
                                    className="form-select"
                                    {...register("product_id")}
                                >
                                    <option value="">Select a product</option>
                                    {products.map((row, key) =>
                                        <option value={row.uuid}>{row.name}</option>
                                    )}
                                </select>
                                <p className="text-danger">{errors.product_id?.message}</p>
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
export default AddCartonModal;
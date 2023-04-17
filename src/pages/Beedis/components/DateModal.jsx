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
    from: yup.string().required("from date is required"),
    to: yup.string().required("to date is required"),
});

const DateModal = (props) => {
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

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    const onSubmit = (data) => {
        let fromDate = formatDate(data.from)
        console.log(fromDate)
        let toDate = formatDate(data.to)
        props.applyFilter({from:fromDate, to:toDate})
        toggle()
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
            <button onClick={() => toggle()} className="btn btn-primary">Filters</button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ModalHeader toggle={toggle}>Filters</ModalHeader>
                    <ModalBody>
                        {status === 1 &&
                            <Alert color="success">
                                Stock distributed to employee successfully
                            </Alert>
                        } {status == 2 &&
                            <Alert color="danger">
                                {errorMessage}
                            </Alert>
                        }
                        <Row>
                            <Col lg="12">
                                <Label>From</Label>
                                <input
                                    name="from"
                                    label="From"
                                    type="date"
                                    className="form-control"
                                    defaultValue={0}
                                    {...register("from")}
                                />
                                <p className="text-danger">{errors.from?.message}</p>
                            </Col>
                            <Col lg="12">
                                <Label>To</Label>
                                <input
                                    name="to"
                                    label="To"
                                    type="date"
                                    className="form-control"
                                    defaultValue={0}
                                    {...register("to")}
                                />
                                <p className="text-danger">{errors.to?.message}</p>
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
export default DateModal;
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
    password: yup.string().min(8).max(40).required(),
    re_password: yup.string().oneOf([yup.ref('password'), null], "Passwords must match"),
});

const Index = (props) => {
    //  id
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

    useEffect(()=> {
        console.log(errors)
    }, [errors])

    useEffect(() => {
        setModal(props.modal)
    }, [props.modal, props.userId])


    const onSubmit = (data, e) => {
        data.user_id = props.userId
        instance.post(`${process.env.REACT_APP_API_URL}/admin/users/change-password`, data)
            .then((res) => {
                setStatus(1)
                e.target.reset()
                setTimeout(() => {
                    toggle()
                }, 300)
            })
            .catch((error) => {
                console.log(error)
                setStatus(2)
            })
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ModalHeader toggle={toggle}>Reset Password</ModalHeader>
                    <ModalBody>
                        {status === 1 &&
                            <Alert color="success">
                                Password changes succcessfully
                            </Alert>
                        } {status == 2 &&
                            <Alert color="danger">
                                {errorMessage}
                            </Alert>
                        }
                        <Row>
                            <Col lg="12">
                                <Label>Password</Label>
                                <input
                                    name="password"
                                    label="password"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter password"
                                    {...register("password")}
                                />
                                <p className="text-danger">{errors.password?.message}</p>
                            </Col>
                            <Col lg="12">
                                <Label>Password</Label>
                                <input
                                    name="password"
                                    label="password"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter password"
                                    {...register("re_password")}
                                />
                                <p className="text-danger">{errors.re_password?.message}</p>
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
export default Index;
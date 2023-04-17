import React, { useState, useEffect, useRef } from "react";
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Link } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    Label,
    Input,
    Alert
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb"

// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"

// validation schema
const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    product_code: yup.string().required("Product code is required"),
    beedis: yup.string().required("Beedi quantity is required"),
    beedi_packet: yup.string().required("Beedi per packet is required"),
    packet_wrapper: yup.string().required("Packets per wrapper is required"),
    rubber_packet: yup.string().required("Rubbers per packet is required"),
    wrapper_carton: yup.string().required("Wrappers per cartons is required"),
});
const AddProduct = (props) => {


    // refs
    const FormElement = useRef(null)

    // state
    const [inventory, setInventory] = useState([])
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")
    const [formStatus, setFormStatus] = useState(0)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    // useEffect
    const onSubmit = (data, e) => {
        // let data = formData;
        instance.post(`${process.env.REACT_APP_API_URL}/admin/products/`, data)
            .then((res) => {
                setIsSuccess(true)
                e.target.reset()
                setFormStatus(1)
            })
            .catch((err) => {
                console.log(err)
                if (err.response) {
                    setErrorResponse(err.response.data)
                    setFormStatus(2)
                }
            })
    }

    useEffect(() => {
        instance
            .get(`${process.env.REACT_APP_API_URL}/admin/inventory/wrapper-zilli`)
            .then((res) => {
                setInventory(res.data)
            })
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Add Product | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Add Product" breadcrumbItem="Add Product" />
                    <Card>
                        <CardBody>
                            {isSuccess &&
                                <Alert color="success">
                                    Employee created successfully
                                </Alert>
                            }
                            {/* sweet alert */}
                            {formStatus === 1 || formStatus === 2 ? (
                                <SweetAlert
                                    success={formStatus === 1 ? true : false}
                                    error={formStatus === 2 ? true : false}
                                    title={formStatus === 1 ? `Sucess` : `Failed`}
                                    onConfirm={() => {
                                        setFormStatus(0)
                                    }}
                                >
                                    {formStatus === 1 ?
                                        `Product created successfully` :
                                        `Something went wrong`
                                    }
                                </SweetAlert>
                            ) : null}

                            <Form
                                ref={FormElement}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Row className="mt-3">

                                    <Col md="4">
                                        <Label>Name</Label>
                                        <Input
                                            name="name"
                                            label="Name"
                                            className="form-control"
                                            placeholder="Enter product name"
                                            {...register("name")}
                                            invalid={errors.name}
                                        />
                                        <p className="text-danger">{errors.name?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Product Code</Label>
                                        <Input
                                            name="name"
                                            label="Product Code"
                                            className="form-control"
                                            placeholder="Enter product code"
                                            {...register("product_code")}
                                            invalid={errors.product_code}
                                        />
                                        <p className="text-danger">{errors.product_code?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Total Beedis</Label>
                                        <Input
                                            name="name"
                                            label="Total Beedis"
                                            className="form-control"
                                            placeholder="Enter total beedis per carton"
                                            {...register("beedis")}
                                            invalid={errors.beedis}
                                        />
                                        <p className="text-danger">{errors.beedis?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Beedis per Packet</Label>
                                        <Input
                                            name="name"
                                            label="Beedis per Packet"
                                            className="form-control"
                                            placeholder="Enter beedis per packet"
                                            {...register("beedi_packet")}
                                            invalid={errors.beedi_packet}
                                        />
                                        <p className="text-danger">{errors.beedi_packet?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Packets per wrapper</Label>
                                        <Input
                                            name="name"
                                            label="Packets per wrapper"
                                            className="form-control"
                                            placeholder="Enter packets per wrapper"
                                            {...register("packet_wrapper")}
                                            invalid={errors.packet_wrapper}
                                        />
                                        <p className="text-danger">{errors.packet_wrapper?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Rubbers per packet</Label>
                                        <Input
                                            name="name"
                                            label="Rubbers per packet"
                                            className="form-control"
                                            placeholder="Enter rubbers per packet"
                                            {...register("rubber_packet")}
                                            invalid={errors.rubber_packet}
                                        />
                                        <p className="text-danger">{errors.rubber_packet?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Wrappers per carton</Label>
                                        <Input
                                            name="name"
                                            label="Wrappers per carton"
                                            className="form-control"
                                            placeholder="Enter wrappers per carton"
                                            {...register("wrapper_carton")}
                                            invalid={errors.wrapper_carton}
                                        />
                                        <p className="text-danger">{errors.wrapper_carton?.message}</p>
                                    </Col>
                                </Row>
                                <div className="mt-2">
                                    {[0, 1, 2].includes(formStatus) ?
                                        <button
                                            type="buttton" className="btn btn-primary"
                                        >Submit</button>
                                        :
                                        <button class="btn btn-primary" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    }
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}


export default AddProduct;
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
    Alert,
    FormGroup,
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
    description: yup.string().required("Description is required"),
    type: yup.string().required("Type is required"),
    quantity: yup.number().required("Quantity is required").default(0),
    measurement: yup.string().required("Measurement is required"),
    is_decimal: yup.boolean().required("is decimal is required")
});
const AddInventory = (props) => {
    // refs
    const FormElement = useRef(null)

    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")
    const [formStatus, setFormStatus] = useState(0)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(()=> {
        console.log(errors)
    }, [errors])

    const onSubmit = (data, e) => {
        // let data = formData;
        instance.post(`${process.env.REACT_APP_API_URL}/admin/inventory`, data)
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

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Add Inventory Item | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Add Product" breadcrumbItem="Add Product" />
                    <Card>
                        <CardBody>
                            {isSuccess &&
                                <Alert color="success">
                                    Item created successfully
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
                                        `Item created successfully` :
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
                                        <Label>Description</Label>
                                        <Input
                                            name="description"
                                            label="Description"
                                            className="form-control"
                                            placeholder="Enter description for the item"
                                            {...register("description")}
                                            invalid={errors.description}
                                        />
                                        <p className="text-danger">{errors.description?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Type</Label>
                                        <select type="select" name="type" className={`
                                           form-select mb-2
                                        `}
                                            {...register("type")}
                                            invalid={errors.type}>
                                            <option value="">Select type of item</option>
                                            <option value="other">Other</option>
                                            <option value="wrapper">Wrapper</option>
                                            <option value="zilli">Zilli</option>
                                            <option value="tobacco">Tobacco</option>
                                        </select>
                                        <p className="text-danger">{errors.type?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Measurement</Label>
                                        <select type="select" name="measurement" className={`
                                           form-select mb-2
                                        `}
                                            {...register("measurement")}
                                            invalid={errors.measurement}>
                                            <option value="">Select Measurement</option>
                                            <option value="kgs">Kgs</option>
                                            <option value="meters">Meters</option>
                                            <option value="units">Units</option>
                                            <option value="liters">Liters</option>
                                            <option value="bags">Bags</option>
                                        </select>
                                        <p className="text-danger">{errors.measurement?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Is Decimal</Label>
                                        <select type="select" name="is_decimal" className={`
                                           form-select mb-2
                                        `}
                                            {...register("is_decimal")}
                                            invalid={errors.is_decimal}>
                                            <option value="">Select Measurement</option>
                                            <option value={true}>Decimals</option>
                                            <option value={false}>Units</option>
                                        </select>
                                        <p className="text-danger">{errors.is_decimal?.message}</p>
                                    </Col>
                                </Row>
                                <div className="mt-2">
                                    {[0, 1, 2].includes(formStatus) ?
                                        <button
                                            type="submit" className="btn btn-primary"
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


export default AddInventory;
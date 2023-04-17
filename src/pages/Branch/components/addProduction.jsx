import React, { useState, useRef } from "react"
import { Switch, Route, Redirect, Link, useParams } from 'react-router-dom';
import MetaTags from "react-meta-tags"
import {
    Row,
    Col,
    Alert,
    Form,
    Button,
    Label,
    Input,
    Container,
    Select,


} from "reactstrap"

// images
import BranchImage from "../../../assets/images/pages/branch.svg"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import instance from "../../../helpers/api/axiosHelper"

// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useEffect } from "react";

// validation schema
const schema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    mobile_number: yup.string().required("Mobile Number is required"),
    h_no: yup.string().required("House number is required"),
    address_1: yup.string().required("Address 1 is required"),
    address_2: yup.string().required("Address 2 is required"),
    city: yup.string().required(),
    district: yup.string().required(),
    pincode: yup.number().min(100000, "Pincode is not valid").max(999999, "Pincode is not valid").required(),
    account_no: yup.string().required("Account Number  is required"),
    ifsc_code: yup.string().required("IFSC Code is required"),
    bank: yup.string().required("Bank Name is required"),
    pf_no: yup.string().required("PF Number is required"),
    aadhar_no: yup.string().required("Aadhar Number is required"),
    gender: yup.string().required("Gender is required"),
    spouse_name: yup.string().required("Spouse Name is required")
});

const addProduction = (props) => {
    let { id } = useParams();
    // refs
    const FormElement = useRef(null)

    // state
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        console.log((new URLSearchParams(window.location.search)).get("id"))
    }, [])
    const onSubmit = (data, e) => {
        // let data = formData;
        let employeeid = (new URLSearchParams(window.location.search)).get("id")
        data.branch_id = id
        let api_url = employeeid != null && employeeid != '' ? `/admin/employee/${employeeid}` : `/admin/employee`
        let method = employeeid != null && employeeid != '' ? `patch` : `post`
        instance({ method, url: `${process.env.REACT_APP_API_URL}${api_url}`, data })
            .then((res) => {
                setIsSuccess(true)
                e.target.reset()
            })
            .catch((err) => {
                console.log(err)
                if (err.response) {
                    setErrorResponse(err.response.data)
                }
            })
    }

    return (
        <div>
            {isSuccess &&
                <Alert color="success">
                    Employee added successfully
                </Alert>
            }
            <Form
                ref={FormElement}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Row className="mt-3">
                    <Col md="4">
                        <Label>Date</Label>
                        <Input
                            name="date"
                            label="Date"
                            type="date"
                            className="form-control"
                            placeholder="Enter Date"
                            {...register("date")}
                            invalid={errors.mobile_number}
                        />
                        <p className="text-danger">{errors.mobile_number?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Select Name</Label>
                        <Input
                            name="name"
                            label="Name"
                            className="form-control"
                            placeholder="Enter  Name"
                            {...register("name")}
                            invalid={errors.name}
                        />
                        <p className="text-danger">{errors.name?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Beedi</Label>
                        <Input
                            name="beedi"
                            label="Beedi"
                            className="form-control"
                            placeholder="Enter Beedi"
                            {...register("beedi")}
                            invalid={errors.beedi}
                        />
                        <p className="text-danger">{errors.beedi?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Aavak Chat Beedi</Label>
                        <Input
                            name="aavak_chat"
                            label="Aavak Chat Beedi"
                            className="form-control"
                            placeholder="Enter Aavak Chat Beedi"
                            {...register("aavak_chat")}
                            invalid={errors.aavak_chat}
                        />
                        <p className="text-danger">{errors.aavak_chat?.message}</p>
                    </Col>


                </Row>
                <Button color="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    )
}


export default addProduction;
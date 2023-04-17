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
const Employee = (props) => {
    let { id, employeeid } = useParams();
    // refs
    const FormElement = useRef(null)
    // state
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")
    const [employee, setEmployee] = useState({})
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: employee
    });
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/employee/${employeeid}`)
            .then((res) => {
                setEmployee(res.data)
                reset(res.data)
            })
    }, [])
    const setValidation = (e) => {
        if (e) {
            return "is-invalid"
        } else {
            return "is-valid"
        }
    }
    const onSubmit = (data, e) => {
        data.branch_id = id
        instance.patch(`${process.env.REACT_APP_API_URL}/admin/employee/${employeeid}`, data)
            .then((res) => {
                setIsSuccess(true)
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
                    Employee edited successfully
                </Alert>
            }
            <Form
                ref={FormElement}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Row className="mt-3">
                    <Col md="4">
                        <Label>First Name</Label>
                        <input
                            name="name"
                            label="First Name"
                            className={`
                                form-control 
                                ${setValidation(errors.first_name)}
                            `}
                            placeholder="Enter First Name"
                            defaultValue={employee.first_name}
                            {...register("first_name")}
                        />
                        <p className="text-danger">{errors.first_name?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Last Name</Label>
                        <input
                            name="last_name"
                            label="Last Name"
                            className={`
                                form-control 
                                ${setValidation(errors.last_name)}
                            `}
                            placeholder="Enter Last Name"
                            defaultValue={employee.last_name}
                            {...register("last_name")}
                        />
                        <p className="text-danger">{errors.last_name?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Spouse Name</Label>
                        <input
                            name="spouse_name"
                            label="Spouse Name"
                            className={`
                                form-control 
                                ${setValidation(errors.spouse_name)}
                            `}
                            placeholder="Enter Spouse Name"
                            defaultValue={employee.spouse_name}
                            {...register("spouse_name")}
                        />
                        <p className="text-danger">{errors.spouse_name?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Mobile Number</Label>
                        <input
                            name="Mobile Number"
                            label="Mobile Number"
                            className={`
                            form-control 
                            ${setValidation(errors.mobile_number)}
                        `}
                            placeholder="Enter Mobile Number"
                            defaultValue={employee.mobile_number}
                            {...register("mobile_number")}
                        />
                        <p className="text-danger">{errors.mobile_number?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Select Gender</Label>
                        <select type="select" name="gender" className={`
                               form-select mb-2
                                ${setValidation(errors.gender)}
                            `}
                            defaultValue={employee.gender}
                            {...register("gender")}
                            invalid={errors.gender}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <p className="text-danger">{errors.gender?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>H.No</Label>
                        <input
                            name="h_no"
                            label="H.No"
                            className={`
                                form-control 
                                ${setValidation(errors.h_no)}
                            `}
                            placeholder="Enter H.No"
                            defaultValue={employee.h_no}
                            {...register("h_no")}
                        />
                        <p className="text-danger">{errors.h_no?.message}</p>
                    </Col>
                    <Col md="6">
                        <Label>Address 1</Label>
                        <input
                            name="address_1"
                            label="Address 1"
                            type="textarea"
                            className={`
                                form-control 
                                ${setValidation(errors.address_1)}
                            `}
                            placeholder="Enter Address 1"
                            defaultValue={employee.address_1}
                            {...register("address_1")}
                        />
                        <p className="text-danger">{errors.address_1?.message}</p>
                    </Col>
                    <Col md="6">
                        <Label>Address 2</Label>
                        <input
                            name="address_2"
                            label="Address 2"
                            type="textarea"
                            className={`
                                form-control 
                                ${setValidation(errors.address_2)}
                            `}
                            placeholder="Enter Address 2"
                            defaultValue={employee.address_2}
                            {...register("address_2")}
                        />
                        <p className="text-danger">{errors.address_2?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>City</Label>
                        <input
                            name="city"
                            label="City"
                            className={`
                                form-control 
                                ${setValidation(errors.city)}
                            `}
                            placeholder="Enter City"
                            defaultValue={employee.city}
                            {...register("city")}
                        />
                        <p className="text-danger">{errors.city?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>District</Label>
                        <input
                            name="district"
                            label="District"
                            className={`
                                form-control 
                                ${setValidation(errors.district)}
                            `}
                            placeholder="Enter District"
                            defaultValue={employee.district}
                            {...register("district")}
                        />
                        <p className="text-danger">{errors.district?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Pin Code</Label>
                        <input
                            name="pincode"
                            type="number"
                            label="Pin Code"
                            className={`
                                form-control 
                                ${setValidation(errors.pincode)}
                            `}
                            placeholder="Enter Pin Code"
                            defaultValue={employee.pincode}
                            {...register("pincode")}
                        />
                        <p className="text-danger">{errors.pincode?.message}</p>
                    </Col>
                    <Col md="12">
                        <h3>Account Details</h3>
                    </Col>
                    <Col md="4">
                        <Label>Account Number</Label>
                        <input
                            name="account_no"
                            label="Account Number"
                            className={`
                                form-control 
                                ${setValidation(errors.account_no)}
                            `}
                            placeholder="Enter Account Number"
                            defaultValue={employee.account_no}
                            {...register("account_no")}
                        />
                        <p className="text-danger">{errors.account_no?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>IFSC Code</Label>
                        <input
                            name="ifsc_code"
                            label="IFSC Code"
                            className={`
                                form-control 
                                ${setValidation(errors.ifsc_code)}
                            `}
                            placeholder="Enter IFSC Code"
                            defaultValue={employee.ifsc_code}
                            {...register("ifsc_code")}
                        />
                        <p className="text-danger">{errors.ifsc_code?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Bank Name</Label>
                        <input
                            name="bank"
                            label="Bank Name"
                            className={`
                                form-control 
                                ${setValidation(errors.bank)}
                            `}
                            placeholder="Enter Bank Name"
                            defaultValue={employee.bank}
                            {...register("bank")}
                        />
                        <p className="text-danger">{errors.bank?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>PF Number</Label>
                        <input
                            name="pf_no"
                            label="PF Number"
                            className={`
                                form-control 
                                ${setValidation(errors.pf_no)}
                            `}
                            placeholder="Enter BPF Number"
                            defaultValue={employee.pf_no}
                            {...register("pf_no")}
                        />
                        <p className="text-danger">{errors.pf_no?.message}</p>
                    </Col>
                    <Col md="4">
                        <Label>Aadhar Number</Label>
                        <input
                            name="aadhar_no"
                            label="Aadhar Number"
                            className={`
                                form-control 
                                ${setValidation(errors.aadhar_no)}
                            `}
                            placeholder="Enter Aadhar Number"
                            defaultValue={employee.aadhar_no}
                            {...register("aadhar_no")}
                        />
                        <p className="text-danger">{errors.aadhar_no?.message}</p>
                    </Col>
                </Row>
                <Button color="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    )
}
export default Employee;
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
    Card,
    CardBody,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap"
// images
// import BranchImage from "../../assets/images/pages/branch.svg"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import instance from "../../helpers/api/axiosHelper"
// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useEffect } from "react";
import AssignBranchmodal from "./components/assignBranchmodal"
import ResetPassword from "./components/resetPassword";
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
    spouse_name: yup.string().required("Spouse Name is required"),
    type: yup.string().required("Designation is required"),
    email: yup.string().required("Email is required"),
});
const updateManager = (props) => {
    let { id } = useParams();
    // refs
    const FormElement = useRef(null)
    // state
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")
    const [manager, setManager] = useState({})
    const [managerBranches, setManagerBranches] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: manager
    });

    const getManagerBranches = () => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/assignmanager/${id}`)
            .then((res) => {
                setManagerBranches(res.data)
            })
    }

    const deleteManagerFromBranch = (branchId) => {

        instance
            .delete(`${process.env.REACT_APP_API_URL}/admin/assignmanager/${id}/${branchId}`)
            .then((res) => {
                getManagerBranches()
            })
    }

    useEffect(() => {
        instance
            .get(`${process.env.REACT_APP_API_URL}/admin/manager/${id}`)
            .then((res) => {
                setManager(res.data)
                reset(res.data)
            })

        getManagerBranches()
    }, [])
    const setValidation = (e) => {
        // if (e) {
        //     return "is-invalid"
        // } else {
        //     return "is-valid"
        // }
    }
    const onSubmit = (data, e) => {
        // data.id = id
        instance.patch(`${process.env.REACT_APP_API_URL}/admin/manager/${id}`, data)
            .then((res) => {
                setIsSuccess(true)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
                if (err.response) {
                    setErrorResponse(err.response.data)
                }
            })
    }
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Beedifactory | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Branch Manager Details" />
                    <Card>
                        <div className="row m-0 p-3">
                            <div className="col-lg-6">
                                <div className="d-flex justify-content-between">
                                    <h5 className="mb-2">Branches</h5>
                                    <AssignBranchmodal getManagerBranches={getManagerBranches} />
                                </div>
                                {managerBranches.map((row, key) =>
                                    <button
                                        className="bg-white shadow border rounded-3 p-2 mt-2 me-2"
                                    >
                                        <Link to={`/admin/branch/${row.uuid}`}>{row.name}</Link>
                                        <i onClick={() => deleteManagerFromBranch(row.uuid)} class='bx bx-trash text-danger ms-2'></i>
                                    </button>
                                )}
                            </div>
                            <div className="col-lg-6">
                                {/* <ResetPassword /> */}
                            </div>
                        </div>
                        <CardBody>
                            <h4>Manager Details</h4>
                            <div>
                                {isSuccess &&
                                    <Alert color="success">
                                        Branch Manager edited successfully
                                    </Alert>
                                }
                                <Form
                                    ref={FormElement}
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Row className="mt-3">
                                        <Col md="4">
                                            <Label>Select Designation</Label>
                                            <select type="select" name="type" className={`
                               form-select mb-2
                                ${setValidation(errors.type)}
                            `}
                                                defaultValue={manager.first_name}
                                                {...register("type")}
                                                invalid={errors.type}>
                                                <option value="">Select Designation</option>
                                                <option value="own">Employee</option>
                                                <option value="commission">Thekedhar</option>
                                            </select>
                                            <p className="text-danger">{errors.type?.message}</p>
                                        </Col>
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
                                                defaultValue={manager.first_name}
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
                                                defaultValue={manager.last_name}
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
                                                defaultValue={manager.spouse_name}
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
                                                defaultValue={manager.mobile_number}
                                                {...register("mobile_number")}
                                            />
                                            <p className="text-danger">{errors.mobile_number?.message}</p>
                                        </Col>
                                        <Col md="4">
                                            <Label>Email</Label>
                                            <input
                                                name="email"
                                                label="Email"
                                                className={`
                                form-control 
                                ${setValidation(errors.email)}
                            `}
                                                defaultValue={manager.email}
                                                placeholder="Enter Email"
                                                {...register("email")}
                                            />
                                            <p className="text-danger">{errors.email?.message}</p>
                                        </Col>
                                        <Col md="4">
                                            <Label>Select Gender</Label>
                                            <select type="select" name="gender" className={`
                               form-select mb-2
                                ${setValidation(errors.gender)}
                            `}
                                                defaultValue={manager.gender}
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
                                                defaultValue={manager.h_no}
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
                                                defaultValue={manager.address_1}
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
                                                defaultValue={manager.address_2}
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
                                                defaultValue={manager.city}
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
                                                defaultValue={manager.district}
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
                                                defaultValue={manager.pincode}
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
                                                defaultValue={manager.account_no}
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
                                                defaultValue={manager.ifsc_code}
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
                                                defaultValue={manager.bank}
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
                                                defaultValue={manager.pf_no}
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
                                                defaultValue={manager.aadhar_no}
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
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default updateManager;
import React, { useState, useRef } from "react"
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
    CardBody
} from "reactstrap"
// images
// import BranchImage from "../../assets/images/pages/branch.svg"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import instance from "../../helpers/api/axiosHelper"
// form validation
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useEffect } from "react";
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
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
});
const addManager = (props) => {
    // let { id } = useParams();
    // refs
    const FormElement = useRef(null)
    // state
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")
    const [formStatus, setFormStatus] = useState(0)
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),

    });
    const { dirtyFields } = useFormState({
        control
    });

    const setValidation = (e) => {
        // if (e) {
        //     return "is-invalid"
        // } else {
        //     return "is-valid"
        // }
    }

    useEffect(() => {
        console.log(dirtyFields)
    }, [errors])

    const onSubmit = (data, e) => {
        // data.branch_id = id
        setFormStatus(3)
        instance.post(`${process.env.REACT_APP_API_URL}/admin/manager`, data)
            .then((res) => {
                setIsSuccess(true)
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
                    <title>Beedifactory | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Branch Managers" />

                    <Card>
                        <CardBody>
                            <div>
                                {isSuccess &&
                                    <Alert color="success">
                                        Manager  Added successfully
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
                                            `Branch Manager created successfully` :
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
                                            <Label>Select Type</Label>
                                            <select type="select" name="type" className={`
                                                form-select mb-2
                                                ${setValidation(errors.type)}
                                            `}
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
                                                {...register("aadhar_no")}
                                            />
                                            <p className="text-danger">{errors.aadhar_no?.message}</p>
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
                            </div >
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default addManager;
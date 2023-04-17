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
} from "reactstrap"

// images
import SupplierImage from "../../assets/images/pages/supplier.svg"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import instance from "../../helpers/api/axiosHelper"

// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
// validation schema
const schema = yup.object().shape({
    name: yup.string().required("Company name is required"),
    owner_name: yup.string().required("Owner name is required"),
    h_no: yup.string().required("House number is required"),
    address_1: yup.string().required("Address 1 is required"),
    address_2: yup.string().required("Address 2 is required"),
    city: yup.string().required(),
    district: yup.string().required(),
    state: yup.string().required(),
    pincode: yup.number().min(100000, "Pincode is not valid").max(999999, "Pincode is not valid").required(),
    mobile_number: yup.number().required("Mobile number is required"),
    mobile_number2: yup.number(),
    email: yup.string().required("Email is required"),
    gst: yup.string().required("GST Number  is required"),
    pancard_no: yup.string().required("Pancard Number  is required"),
    type: yup.string().required("Type  is required"),
});


const addBranch = () => {
    // refs
    const FormElement = useRef(null)

    // state
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")
    const [formStatus, setFormStatus] = useState(0)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (formData, e) => {
        let data = formData;
        setFormStatus(3)
        instance.post(`${process.env.REACT_APP_API_URL}/admin/supplier`, data)
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
                    <title>
                        Add Supplier | Admin
                    </title>
                </MetaTags>
                <Container fluid={true}>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Add Supplier" />
                    <div className="bg-white rounded-2 p-3">
                        {isSuccess &&
                            <Alert color="success">
                                Supplier added successfully
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
                                    `Supplier added successfully` :
                                    `Something went wrong`
                                }
                            </SweetAlert>
                        ) : null}
                        <Form
                            ref={FormElement}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Row>
                                <Col md="4">
                                    <Label>Supplier Name</Label>
                                    <Input
                                        name="name"
                                        label="Supplier Name"
                                        className="form-control"
                                        placeholder="Enter Supplier Name"
                                        {...register("name")}
                                        invalid={errors.name}
                                    />
                                    <p className="text-danger">{errors.name?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>Owner Name</Label>
                                    <Input
                                        name="owner_name"
                                        label="Owner Name"
                                        className="form-control"
                                        placeholder="Enter owner name"
                                        {...register("owner_name")}
                                        invalid={errors.owner_name}
                                    />
                                    <p className="text-danger">{errors.owner_name?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>Type</Label>
                                    <select
                                        name="type"
                                        label="type"
                                        className="form-select"
                                        {...register("type")}
                                        invalid={errors.type}
                                    >
                                        <option value="leaf">Leaf</option>
                                        <option value="tobacco">Tobacco</option>
                                        <option value="yarn">Yarn</option>
                                        <option value="wrapper">Wrapper</option>
                                    </select>
                                    <p className="text-danger">{errors.type?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>Mobile Number</Label>
                                    <Input
                                        name="mobile_number"
                                        type="text"
                                        label="Mobile Number"
                                        className="form-control"
                                        placeholder="Enter Mobile Number"
                                        {...register("mobile_number")}
                                        invalid={errors.mobile_number}
                                    />
                                    <p className="text-danger">{errors.mobile_number?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>Mobile Number 2</Label>
                                    <Input
                                        name="mobile_number2"
                                        type="text"
                                        label="Mobile Number"
                                        className="form-control"
                                        placeholder="Enter Mobile Number"
                                        {...register("mobile_number2")}
                                        invalid={errors.mobile_number2}
                                    />
                                    <p className="text-danger">{errors.mobile_number2?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>Email</Label>
                                    <Input
                                        name="email"
                                        type="text"
                                        label="Email"
                                        className="form-control"
                                        placeholder="Enter Email"
                                        {...register("email")}
                                        invalid={errors.email}
                                    />
                                    <p className="text-danger">{errors.email?.message}</p>
                                </Col>
                                <Col md="6">
                                    <Label>H.No</Label>
                                    <Input
                                        name="h_no"
                                        label="H.No"
                                        className="form-control"
                                        placeholder="Enter H.No"
                                        {...register("h_no")}
                                        invalid={errors.h_no}
                                    />
                                    <p className="text-danger">{errors.h_no?.message}</p>
                                </Col>


                                <Col md="6">
                                    <Label>Address </Label>
                                    <Input
                                        name="address_1"
                                        label="Address "
                                        type="textarea"
                                        className="form-control"
                                        placeholder="Enter Address "
                                        {...register("address_1")}
                                        invalid={errors.address_1}
                                    />
                                    <p className="text-danger">{errors.address_1?.message}</p>
                                </Col>
                                <Col md="6">
                                    <Label>Land Mark</Label>
                                    <Input
                                        name="address_2"
                                        label="Land Mark"
                                        type="textarea"
                                        className="form-control"
                                        placeholder="Enter Land Mark"
                                        {...register("address_2")}
                                        invalid={errors.address_2}
                                    />
                                    <p className="text-danger">{errors.address_2?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>City</Label>
                                    <Input
                                        name="city"
                                        label="City"
                                        className="form-control"
                                        placeholder="Enter City"
                                        {...register("city")}
                                        invalid={errors.city}
                                    />
                                    <p className="text-danger">{errors.city?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>District</Label>
                                    <Input
                                        name="district"
                                        label="District"
                                        className="form-control"
                                        placeholder="Enter District"
                                        {...register("district")}
                                        invalid={errors.district}
                                    />
                                    <p className="text-danger">{errors.district?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>State</Label>
                                    <Input
                                        name="state"
                                        label="State"
                                        className="form-control"
                                        placeholder="Enter State"
                                        {...register("state")}
                                        invalid={errors.state}
                                    />
                                    <p className="text-danger">{errors.state?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>Pin Code</Label>
                                    <Input
                                        name="pincode"
                                        type="number"
                                        label="Pin Code"
                                        className="form-control"
                                        placeholder="Enter Pin Code"
                                        {...register("pincode")}
                                        invalid={errors.pincode}
                                    />
                                    <p className="text-danger">{errors.pincode?.message}</p>
                                </Col>
                                <div></div>
                                <Col md="4">
                                    <Label>GST</Label>
                                    <Input
                                        name="gst"
                                        type="text"
                                        label="GST"
                                        className="form-control"
                                        placeholder="Enter GST"
                                        {...register("gst")}
                                        invalid={errors.gst}
                                    />
                                    <p className="text-danger">{errors.gst?.message}</p>

                                </Col>
                                <Col md="4">
                                    <Label>Pancard Number</Label>
                                    <Input
                                        name="pancard_no"
                                        type="text"
                                        label="GST"
                                        className="form-control"
                                        placeholder="Enter pancard number"
                                        {...register("pancard_no")}
                                        invalid={errors.pancard_no}
                                    />
                                    <p className="text-danger">{errors.pancard_no?.message}</p>

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

                    </div>

                </Container>
            </div>
        </React.Fragment >
    )
}
export default addBranch;
import React, { useState, useRef, useEffect } from "react"
import MetaTags from "react-meta-tags"
import {
    Row,
    Col,
    Alert,
    Form,
    Button,
    Label,
    input,
    Container,
} from "reactstrap"
import { useParams } from 'react-router-dom';
// images
// import SupplierImage from "../../assets/images/pages/supplier.svg"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import instance from "../../helpers/api/axiosHelper"

// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

// validation schema
const schema = yup.object().shape({
    agency_name: yup.string().required("Agency name is required"),
    owner_name: yup.string().required("Owner name is required"),
    h_no: yup.string().required("House number is required"),
    address_1: yup.string().required("Address 1 is required"),
    address_2: yup.string().required("Address 2 is required"),
    city: yup.string().required(),
    district: yup.string().required(),
    state: yup.string().required(),
    pincode: yup.number().min(100000, "Pincode is not valid").max(999999, "Pincode is not valid").required(),
    mobile_number: yup.number().required("Mobile number is required"),
    mobile_number_2: yup.number(),
    aadhar_no: yup.number().required("Aadhar Number is required"),
    pancard_no: yup.string().required("Pancard Number  is required"),
    gst_no: yup.string().required("GST Number  is required"),
    zone: yup.string().required("Zone  is required"),
});

const details = () => {
    let { id } = useParams();
    // refs
    const FormElement = useRef(null)

    // state
    const [distributor, setDistributor] = useState({})
    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: distributor
    });
    // useEffect
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/distributor/${id}`)
            .then((res) => {
                setDistributor(res.data)
                reset(res.data)
                console.log(res.data)
            })
    }, [])
    const setValidation = (e) => {
        if (e) {
            return "is-invalid"
        } else {
            return "is-valid"
        }
    }
    const onSubmit = (formData, e) => {
        let data = formData;
        instance.patch(`${process.env.REACT_APP_API_URL}/admin/distributor/${id}`, data)
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
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>
                        Add Distributor | Admin
                    </title>
                </MetaTags>
                <Container fluid={true}>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Edit Distributor" />
                    <div className="bg-white rounded-2 p-3">
                        {isSuccess &&
                            <Alert color="success">
                                Distributor edited successfully
                            </Alert>
                        }
                        <Form
                            ref={FormElement}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Row>
                                <Col lg="9">
                                    <Col className="row">
                                        <Col md="4">
                                            <Label>Agency Name</Label>
                                            <input
                                                name="agency_name"
                                                label="Agency Name"
                                                className={`
                                        form-control 
                                        ${setValidation(errors.agency_name)}
                                    `}
                                                placeholder="Enter Agency Name"
                                                defaultValue={distributor.agency_name}
                                                {...register("agency_name")}

                                            />
                                            <p className="text-danger">{errors.agency_name?.message}</p>
                                        </Col>
                                        <Col md="4">
                                            <Label>Owner Name</Label>
                                            <input
                                                name="owner_name"
                                                label="Owner Name"
                                                className={`
                                        form-control 
                                        ${setValidation(errors.owner_name)}
                                    `}
                                                placeholder="Enter owner name"
                                                defaultValue={distributor.owner_name}
                                                {...register("owner_name")}

                                            />
                                            <p className="text-danger">{errors.owner_name?.message}</p>
                                        </Col>

                                        <Col md="4">
                                            <Label>Mobile Number</Label>
                                            <input
                                                name="mobile_number"
                                                type="text"
                                                label="Mobile Number"
                                                className={`
                                        form-control 
                                        ${setValidation(errors.mobile_number)}
                                    `}
                                                placeholder="Enter Mobile Number"
                                                defaultValue={distributor.mobile_number}
                                                {...register("mobile_number")}

                                            />
                                            <p className="text-danger">{errors.mobile_number?.message}</p>
                                        </Col>
                                        <Col md="4">
                                            <Label>Mobile Number 2</Label>
                                            <input
                                                name="mobile_number_2"
                                                type="text"
                                                label="Mobile Number 2"
                                                className={`
                                        form-control 
                                        ${setValidation(errors.mobile_number_2)}
                                    `}
                                                placeholder="Enter Mobile Number"
                                                defaultValue={distributor.mobile_number_2}
                                                {...register("mobile_number_2")}

                                            />
                                            <p className="text-danger">{errors.mobile_number_2?.message}</p>
                                        </Col>
                                        <Col md="4">
                                            <Label>Aadhar Number</Label>
                                            <input
                                                name="aadhar_no"
                                                type="number"
                                                label="Aadhar Number"
                                                className={`
                                        form-control 
                                        ${setValidation(errors.aadhar_no)}
                                    `}
                                                placeholder="Enter Aadhar Number"
                                                defaultValue={distributor.aadhar_no}
                                                {...register("aadhar_no")}

                                            />
                                            <p className="text-danger">{errors.aadhar_no?.message}</p>
                                        </Col>

                                        <Col md="4">
                                            <Label>Pancard Number</Label>
                                            <input
                                                name="pancard_no"
                                                type="text"
                                                label="Pancard Number"
                                                className={`
                                        form-control 
                                        ${setValidation(errors.pancard_no)}
                                    `}
                                                placeholder="Enter Pancard Number"
                                                defaultValue={distributor.pancard_no}
                                                {...register("pancard_no")}


                                            />
                                            <p className="text-danger">{errors.pancard_no?.message}</p>

                                        </Col>

                                        <Col md="4">
                                            <Label>GST</Label>
                                            <input
                                                name="gst_no"
                                                type="text"
                                                label="GST"
                                                className={`
                                        form-control 
                                        ${setValidation(errors.gst_no)}
                                    `}
                                                placeholder="Enter GST"
                                                defaultValue={distributor.gst_no}
                                                {...register("gst_no")}


                                            />
                                            <p className="text-danger">{errors.gst_no?.message}</p>
                                        </Col>
                                    </Col>
                                </Col>
                                <Col lg="3">
                                    <div>
                                        <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className="img-fluid" style={{ height: "200px", width: "100%", objectFit: "cover" }} />
                                    </div>
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
                                        defaultValue={distributor.h_no}
                                        {...register("h_no")}

                                    />
                                    <p className="text-danger">{errors.h_no?.message}</p>
                                </Col>


                                <Col md="6">
                                    <Label>Address </Label>
                                    <input
                                        name="address_1"
                                        label="Address "
                                        type="textarea"
                                        className={`
                                        form-control 
                                        ${setValidation(errors.address_1)}
                                    `}
                                        placeholder="Enter Address "
                                        defaultValue={distributor.address_1}
                                        {...register("address_1")}

                                    />
                                    <p className="text-danger">{errors.address_1?.message}</p>
                                </Col>
                                <Col md="6">
                                    <Label>Land Mark</Label>
                                    <input
                                        name="address_2"
                                        label="Land Mark"
                                        type="textarea"
                                        className={`
                                        form-control 
                                        ${setValidation(errors.address_2)}
                                    `}
                                        placeholder="Enter Land Mark"
                                        defaultValue={distributor.address_2}
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
                                        defaultValue={distributor.city}
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
                                        defaultValue={distributor.district}
                                        {...register("district")}

                                    />
                                    <p className="text-danger">{errors.district?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>State</Label>
                                    <input
                                        name="state"
                                        label="State"
                                        className={`
                                        form-control 
                                        ${setValidation(errors.state)}
                                    `}
                                        placeholder="Enter State"
                                        defaultValue={distributor.state}
                                        {...register("state")}

                                    />
                                    <p className="text-danger">{errors.state?.message}</p>
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
                                        defaultValue={distributor.pincode}
                                        {...register("pincode")}

                                    />
                                    <p className="text-danger">{errors.pincode?.message}</p>
                                </Col>
                                <Col md="4">
                                    <Label>Zone</Label>
                                    <input
                                        name="zone"
                                        label="Zone"
                                        className={`
                                        form-control 
                                        ${setValidation(errors.zone)}
                                    `}
                                        placeholder="Enter Zone"
                                        defaultValue={distributor.zone}
                                        {...register("zone")}

                                    />
                                    <p className="text-danger">{errors.zone?.message}</p>
                                </Col>


                            </Row>
                            <Button color="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </div>

                </Container>
            </div>
        </React.Fragment >
    )
}
export default details;
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
import { useParams } from "react-router-dom"
// images
import SupplierImage from "../../assets/images/pages/supplier.svg"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import instance from "../../helpers/api/axiosHelper"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// validation schema
const schema = yup.object().shape({
  name: yup.string().required("Company name is required"),
  owner_name: yup.string().required("Owner name is required"),
  h_no: yup.string().required("House number is required"),
  address_1: yup.string().required("Address 1 is required"),
  address_2: yup.string().required("Address 2 is required"),
  city: yup.string().required(),
  district: yup.string().required(),
  pincode: yup
    .number()
    .min(100000, "Pincode is not valid")
    .max(999999, "Pincode is not valid")
    .required(),
  mobile_number: yup.number().required(),
  email: yup.string().required("Email is required"),
  gst: yup.string().required("GST Number  is required"),
})

const details = () => {
  let { id } = useParams()
  // refs
  const FormElement = useRef(null)

  // state
  const [suppliers, setSuppliers] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: suppliers,
  })
  // useEffect
  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/supplier/${id}`)
      .then(res => {
        setSuppliers(res.data)
        reset(res.data)
        console.log(res.data)
      })
  }, [])
  const setValidation = e => {
    if (e) {
      return "is-invalid"
    } else {
      return "is-valid"
    }
  }
  const onSubmit = (formData, e) => {
    let data = formData
    instance
      .patch(`${process.env.REACT_APP_API_URL}/admin/supplier/${id}`, data)
      .then(res => {
        setIsSuccess(true)
        e.target.reset()
      })
      .catch(err => {
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
          <title>Add Supplier | Admin</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Edit Supplier" />
          <div className="bg-white rounded-2 p-3">
            {isSuccess && (
              <Alert color="success">Supplier added successfully</Alert>
            )}
            <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg="9">
                  <Col className="row">
                    <Col md="4">
                      <Label>Supplier Name</Label>
                      <input
                        name="name"
                        label="Supplier Name"
                        className={`
                            form-control 
                            ${setValidation(errors.name)}
                        `}
                        placeholder="Enter Supplier Name"
                        defaultValue={suppliers.name}
                        {...register("name")}
                      />
                      <p className="text-danger">{errors.name?.message}</p>
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
                        defaultValue={suppliers.owner_name}
                        {...register("owner_name")}
                      />
                      <p className="text-danger">
                        {errors.owner_name?.message}
                      </p>
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
                        defaultValue={suppliers.mobile_number}
                        {...register("mobile_number")}
                      />
                      <p className="text-danger">
                        {errors.mobile_number?.message}
                      </p>
                    </Col>
                    <Col md="4">
                      <Label>Mobile Number 2</Label>
                      <input
                        name="mobile_number2"
                        type="text"
                        label="Mobile Number 2"
                        className={`
                            form-control 
                            ${setValidation(errors.mobile_number2)}
                        `}
                        placeholder="Enter Mobile Number"
                        defaultValue={suppliers.mobile_number2}
                        {...register("mobile_number2")}
                      />
                      <p className="text-danger">
                        {errors.mobile_number2?.message}
                      </p>
                    </Col>
                    <Col md="4">
                      <Label>Email</Label>
                      <input
                        name="email"
                        type="text"
                        label="Email"
                        className={`
                            form-control 
                            ${setValidation(errors.email)}
                        `}
                        placeholder="Enter Email"
                        defaultValue={suppliers.email}
                        {...register("email")}
                      />
                      <p className="text-danger">{errors.email?.message}</p>
                    </Col>
                    <Col md="4">
                      <Label>GST</Label>
                      <input
                        name="gst"
                        type="text"
                        label="GST"
                        className={`
                            form-control 
                            ${setValidation(errors.gst)}
                        `}
                        placeholder="Enter GST"
                        defaultValue={suppliers.gst}
                        {...register("gst")}
                      />
                      <p className="text-danger">{errors.gst?.message}</p>
                    </Col>
                  </Col>
                </Col>
                <Col lg="3">
                  <div>
                    {/* <img
                      src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      alt=""
                      className="img-fluid"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    /> */}
                  </div>
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
                    defaultValue={suppliers.pancard_no}
                    {...register("pancard_no")}
                  />
                  <p className="text-danger">{errors.pancard_no?.message}</p>
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
                    defaultValue={suppliers.h_no}
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
                    defaultValue={suppliers.address_1}
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
                    defaultValue={suppliers.address_2}
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
                    defaultValue={suppliers.city}
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
                    defaultValue={suppliers.district}
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
                    defaultValue={suppliers.pincode}
                    {...register("pincode")}
                  />
                  <p className="text-danger">{errors.pincode?.message}</p>
                </Col>
              </Row>
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default details

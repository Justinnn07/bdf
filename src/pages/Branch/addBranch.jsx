import React, { useState, useRef } from "react"
import instance from "../../helpers/api/axiosHelper"
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
import BranchImage from "../../assets/images/pages/branch.svg"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect } from "react"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"

// validation schema
const schema = yup.object().shape({
  name: yup.string().required("Branch name is required"),
  person_name: yup.string().required("Person name is required"),
  commission_charges: yup.number().required("Commission charges is required"),
  contact_number: yup.string().required("Contact number is required"),
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
})

const addBranch = () => {
  // refs
  const FormElement = useRef(null)

  // state
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")
  const [formStatus, setFormStatus] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data, e) => {
    setFormStatus(3)
    instance
      .post(`${process.env.REACT_APP_API_URL}/admin/branch`, data)
      .then(res => {
        setIsSuccess(true)
        e.target.reset()
        setFormStatus(1)
      })
      .catch(err => {
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
          <title>Add Branch | Admin</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Add Branch" />
          <div className="bg-white rounded-2 p-3">
            {isSuccess && (
              <Alert color="success">Branch created successfully</Alert>
            )}
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
                {formStatus === 1
                  ? `Branch created successfully`
                  : `Something went wrong`}
              </SweetAlert>
            ) : null}
            <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md="6">
                  <Label>Branch Name</Label>
                  <Input
                    name="name"
                    label="Branch Name"
                    className="form-control"
                    placeholder="Enter Branch Name"
                    {...register("name")}
                    invalid={errors.name}
                  />
                  <p className="text-danger">{errors.name?.message}</p>
                  <Label>Owner Name</Label>
                  <Input
                    name="name"
                    label="Owner Name"
                    className="form-control"
                    placeholder="Enter Owner Name"
                    {...register("person_name")}
                    invalid={errors.person_name}
                  />
                  <p className="text-danger">{errors.person_name?.message}</p>
                  <Label>Contact Number</Label>
                  <input
                    name="name"
                    label="Contact Number"
                    className="form-control"
                    placeholder="Enter Contact Number"
                    {...register("contact_number")}
                  />
                  <p className="text-danger">
                    {errors.contact_number?.message}
                  </p>
                  <Label>Commission Charges</Label>
                  <input
                    name="name"
                    label="Commission Charges"
                    className="form-control"
                    placeholder="Enter Commission Charges"
                    type="number"
                    {...register("commission_charges")}
                  />
                  <p className="text-danger">
                    {errors.commission_charges?.message}
                  </p>

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
                <Col className="d-md-flex justify-content-end my-2" md="6">
                  <img className="w-75" src={BranchImage} />
                </Col>
                <div className="col-12 mt-3"></div>
                <Col md="6">
                  <Label>Address 1</Label>
                  <Input
                    name="address_1"
                    label="Address 1"
                    type="textarea"
                    className="form-control"
                    placeholder="Enter Address 1"
                    {...register("address_1")}
                    invalid={errors.address_1}
                  />
                  <p className="text-danger">{errors.address_1?.message}</p>
                </Col>
                <Col md="6">
                  <Label>Address 2</Label>
                  <Input
                    name="address_2"
                    label="Address 2"
                    type="textarea"
                    className="form-control"
                    placeholder="Enter Address 2"
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
              </Row>
              <div className="mt-2">
                {[0, 1, 2].includes(formStatus) ? (
                  <button type="buttton" className="btn btn-primary">
                    Submit
                  </button>
                ) : (
                  <button class="btn btn-primary" type="button" disabled>
                    <span
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                )}
              </div>
            </Form>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default addBranch

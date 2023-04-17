import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
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
  Card,
  CardBody,
} from "reactstrap"

// images
import BranchImage from "../../../assets/images/pages/branch.svg"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import instance from "../../../helpers/api/axiosHelper"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// validation schema
const schema = yup.object().shape({
  name: yup.string().required("Branch name is required"),
  person_name: yup.string().required("Person name is required"),
  contact_number: yup.string().required("Contact number is required"),
  commission_charges: yup.number().required("Commission charges is required"),
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

const Details = props => {
  // params
  let { id } = useParams()

  // refs
  const FormElement = useRef(null)

  // state
  const [branch, setBranch] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/branch/${id}`)
      .then(res => {
        let response = res.data
        setBranch(response)
        reset(response)
      })
  }, [])

  const onSubmit = (formData, e) => {
    let data = formData
    instance
      .patch(`${process.env.REACT_APP_API_URL}/admin/branch/${id}`, data)
      .then(res => {
        setIsSuccess(true)
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          setErrorResponse(err.response.data)
        }
      })
  }

  return (
    <div className="mt-3">
      {isSuccess && <Alert color="success">Branch edited successfully</Alert>}
      <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6">
            <br />
            <Label>Branch Name</Label>
            <input
              name="name"
              label="Branch Name"
              className="form-control"
              placeholder="Enter Branch Name"
              defaultValue={branch.name}
              {...register("name")}
            />
            <p className="text-danger">{errors.name?.message}</p>
            <Label>Person Name</Label>
            <input
              name="name"
              label="Person Name"
              className="form-control"
              placeholder="Enter Person Name"
              defaultValue={branch.person_name}
              {...register("person_name")}
            />
            <p className="text-danger">{errors.person_name?.message}</p>
            <Label>Contact Number</Label>
            <input
              name="name"
              label="Contact Number"
              className="form-control"
              placeholder="Enter Contact Number"
              defaultValue={branch.contact_number}
              {...register("contact_number")}
            />
            <p className="text-danger">{errors.contact_number?.message}</p>
            <Label>Commission Charges</Label>
            <input
              name="name"
              label="Commission Charges"
              className="form-control"
              placeholder="Enter Commission Charges"
              type="number"
              defaultValue={branch.commission_charges}
              {...register("commission_charges")}
            />
            <p className="text-danger">{errors.commission_charges?.message}</p>

            <Label>H.No</Label>
            <input
              name="h_no"
              label="H.No"
              className="form-control"
              placeholder="Enter H.No"
              defaultValue={branch.h_no}
              {...register("h_no")}
            />
            <p className="text-danger">{errors.h_no?.message}</p>
          </Col>
          <Col className="d-md-flex justify-content-end my-2" md="6">
            <img className="w-75" src={BranchImage} />
          </Col>
          <div className="col-12 mt-3"></div>
          <Col md="6">
            <Label>Address 1</Label>
            <input
              name="address_1"
              label="Address 1"
              type="textarea"
              className="form-control"
              placeholder="Enter Address 1"
              defaultValue={branch.address_1}
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
              className="form-control"
              placeholder="Enter Address 2"
              defaultValue={branch.address_2}
              {...register("address_2")}
            />
            <p className="text-danger">{errors.address_2?.message}</p>
          </Col>
          <Col md="4">
            <Label>City</Label>
            <input
              name="city"
              label="City"
              className="form-control"
              placeholder="Enter City"
              defaultValue={branch.city}
              {...register("city")}
            />
            <p className="text-danger">{errors.city?.message}</p>
          </Col>
          <Col md="4">
            <Label>District</Label>
            <input
              name="district"
              label="District"
              className="form-control"
              placeholder="Enter District"
              defaultValue={branch.district}
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
              className="form-control"
              placeholder="Enter Pin Code"
              defaultValue={branch.pincode}
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
  )
}

export default Details

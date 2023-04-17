import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Label,
  Alert,
} from "reactstrap"
import instance from "../../../helpers/api/axiosHelper"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// validation schema
const schema = yup.object().shape({
  full_name: yup.string().required("Please enter full name"),
  email: yup.string().email().required("Please enter a valid email address"),
  password: yup.string().min(8).max(40).required(),
  role: yup.string().required("Please select a valid role"),
})

const Index = props => {
  //  id
  const [status, setStatus] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  // form validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { className } = props

  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
    setStatus(0)
    setErrorMessage("")
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  const onSubmit = (data, e) => {
    instance
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, data)
      .then(res => {
        setStatus(1)
        e.target.reset()
        setTimeout(() => {
          toggle()
          props.getUsers()
        }, 300)
      })
      .catch(error => {
        console.log(error)
        setStatus(2)
      })
  }

  return (
    <div>
      <button onClick={() => toggle()} className="btn btn-primary">
        Create User
      </button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>Create User</ModalHeader>
          <ModalBody>
            {status === 1 && (
              <Alert color="success">User added successfully</Alert>
            )}{" "}
            {status == 2 && <Alert color="danger">{errorMessage}</Alert>}
            <Row>
              <Col lg="12">
                <Label>Full Name</Label>
                <input
                  name="full_name"
                  label="Full Name"
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  {...register("full_name")}
                />
                <p className="text-danger">{errors.full_name?.message}</p>
              </Col>
              <Col lg="12">
                <Label>Email</Label>
                <input
                  name="email"
                  label="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  {...register("email")}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </Col>
              <Col lg="12">
                <Label>Password</Label>
                <input
                  name="password"
                  label="password"
                  type="text"
                  className="form-control"
                  placeholder="Enter password"
                  {...register("password")}
                />
                <p className="text-danger">{errors.password?.message}</p>
              </Col>
              <Col lg="12">
                <Label>Role</Label>
                <select className="form-select" {...register("role")}>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
                <p className="text-danger">{errors.role?.message}</p>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}
export default Index

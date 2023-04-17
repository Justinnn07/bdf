import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"
const instance = axios.create()

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// boostrap
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Row,
} from "reactstrap"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import lightlogo from "../../assets/images/logo-light.svg"

// validation schema
const schema = yup.object().shape({
  password: yup.string().required(),
  repassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
})
const Login = props => {
  // state
  const [response, setResponse] = useState("")
  const [errorResponse, setErrorResponse] = useState("")

  // history
  const history = useHistory()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = e => {
    let data = e
    data.remember_token = new URLSearchParams(window.location.search).get(
      "token"
    )
    instance
      .post(
        `${process.env.REACT_APP_API_URL}/auth/users/change-password-email`,
        data
      )
      .then(res => {
        setResponse("Password changed successfully")
        setTimeout(() => {
          history.push("/login")
        }, 1000)
      })
      .catch(err => {
        setErrorResponse("Incorrect email or password")
      })
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-8">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Change your account password below.</p>
                      </div>
                    </Col>
                    <Col className="col-4 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={lightlogo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {response && (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {response}
                      </Alert>
                    )}
                    {errorResponse && (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {errorResponse}
                      </Alert>
                    )}
                    <Form
                      className="form-horizontal"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      {false ? (
                        <Alert color="danger">{`Some error message`}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Input
                          name="password"
                          label="Password"
                          placeholder="Enter Password"
                          type="password"
                          invalid={errors.password}
                          {...register("password")}
                        />
                        <p className="text-danger">
                          {errors.password?.message}
                        </p>
                      </div>

                      <div className="mb-3">
                        <Input
                          name="password"
                          label="Password"
                          placeholder="Confirm new Password"
                          type="password"
                          invalid={errors.password}
                          {...register("repassword")}
                        />
                        <p className="text-danger">
                          {errors.repassword?.message}
                        </p>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Change Password
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/" className="text-muted">
                          <i className="mdi mdi-lock me-1" /> Login
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>© {new Date().getFullYear()} Uttham BEDI Factory</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Login

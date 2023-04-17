import React, { useState, useEffect, useRef } from "react"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Alert,
  Button,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"

// validation schema
const schema = yup.object().shape({
  distrubutor_commission: yup.number().required("This field is required"),
  employee_commission: yup.number().required("This field is required"),
  manager_commission: yup.number().required("This field is required"),
})
const Index = props => {
  // state
  const [settings, setSettings] = useState({})

  // refs
  const FormElement = useRef(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")
  const [formStatus, setFormStatus] = useState(0)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: settings,
  })

  const onSubmit = (data, e) => {
    setFormStatus(3)
    instance
      .patch(`${process.env.REACT_APP_API_URL}/admin/settings`, data)
      .then(res => {
        setIsSuccess(true)
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

  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/settings`)
      .then(res => {
        setSettings(res.data)
        reset(res.data)
      })
      .catch(err => {
        console.log(err.response)
      })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Salary | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Settings" />
          <Card>
            <CardBody>
              <h4>Commision Settings</h4>
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
                    ? `Changes made successfully`
                    : `Something went wrong`}
                </SweetAlert>
              ) : null}
              <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md="6">
                    <Label>Distributor Commission</Label>
                    <input
                      name="distrubutor_commission"
                      type="number"
                      label="Distributor Commission"
                      className={`
                          form-control 
                      `}
                      placeholder="Enter distributor commission"
                      defaultValue={settings.distrubutor_commission}
                      {...register("distrubutor_commission")}
                    />
                    <p className="text-danger">
                      {errors.distrubutor_commission?.message}
                    </p>
                  </Col>
                  <Col md="6">
                    <Label>Employee Commission</Label>
                    <input
                      name="employee_commission"
                      type="number"
                      label="Employee Commission"
                      className={`
                          form-control 
                      `}
                      placeholder="Enter employee commission"
                      defaultValue={settings.employee_commission}
                      {...register("employee_commission")}
                    />
                    <p className="text-danger">
                      {errors.employee_commission?.message}
                    </p>
                  </Col>
                  <Col md="6">
                    <Label>Manager Commission</Label>
                    <input
                      name="manager_commission"
                      type="number"
                      label="Manager Commission"
                      className={`
                          form-control 
                      `}
                      placeholder="Enter manager commission"
                      defaultValue={settings.manager_commission}
                      {...register("manager_commission")}
                    />
                    <p className="text-danger">
                      {errors.manager_commission?.message}
                    </p>
                  </Col>
                </Row>
                <div className="mt-2">
                  {[0, 1, 2].includes(formStatus) ? (
                    <button type="submit" className="btn btn-primary">
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
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index

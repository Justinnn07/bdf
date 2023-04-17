import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, Form, Button, Alert } from "reactstrap"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
import Breadcrumbs from "../../components/Common/Breadcrumb"

// validation schema
const schema = yup.object().shape({})
const Index = props => {
  const [suppliers, setSuppliers] = useState([])

  // refs
  const FormElement = useRef(null)

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
    //   /admin/ledger
    instance
      .post(`${process.env.REACT_APP_API_URL}/admin/ledger`, data)
      .then(res => {
        setIsSuccess(true)
        setFormStatus(1)
        e.target.reset()
      })
      .catch(err => {
        setErrorResponse(err.response.data.message)
        setFormStatus(2)
      })
  }

  const getSuppliers = () => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/supplier`)
      .then(res => {
        setSuppliers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getSuppliers()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Edit Ledger | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Add Ledger" />

          <Card>
            <CardBody>
              {isSuccess && (
                <Alert color="success">Item created successfully</Alert>
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
                    ? `Item created successfully`
                    : `Something went wrong`}
                </SweetAlert>
              ) : null}

              {/* Form */}
              <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  {/* Supplier */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Supplier</label>
                      <select
                        className="form-select"
                        name="supplier_id"
                        {...register("supplier_id")}
                      >
                        <option value="">Select Supplier</option>
                        {suppliers?.map((supplier, index) => {
                          return (
                            <option key={index} value={supplier.uuid}>
                              {supplier.name}
                            </option>
                          )
                        })}
                      </select>
                      <p className="text-danger">
                        {errors?.supplier_id?.message}
                      </p>
                    </div>
                  </div>
                  {/* Amount */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Amount</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="amount"
                        placeholder="Enter the Amount"
                        {...register("amount")}
                      />
                      <p className="text-danger">{errors?.amount?.message}</p>
                    </div>
                  </div>
                  {/* message with textarea */}
                  <div className="col-md-12 mt-2">
                    <div className="form-group">
                      <label>Message (Optional)</label>
                      <textarea
                        className="form-control"
                        name="message"
                        {...register("message")}
                        placeholder="Enter Message"
                      />
                      <p className="text-danger">{errors?.message?.message}</p>
                    </div>
                  </div>
                  {/* 2 colums fro start_date and end_date */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="start_date"
                        {...register("meta.start_date")}
                      />
                      <p className="text-danger">
                        {errors?.start_date?.message}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Due date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="due_date"
                        {...register("meta.due_date")}
                      />
                      <p className="text-danger">{errors?.end_date?.message}</p>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="btn btn-primary btn-block"
                  color="primary"
                  disabled={formStatus === 1 || formStatus === 2 ? true : false}
                >
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index

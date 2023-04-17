import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Button,
  Alert,
  Progress,
  Table,
} from "reactstrap"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
import Breadcrumbs from "../../components/Common/Breadcrumb"

// components
import AddItem from "./components/AddItem"
import moment from "moment"

// validation schema
const schema = yup.object().shape({})
const Index = props => {
  const { id } = useParams()

  const [suppliers, setSuppliers] = useState([])
  const [data, setData] = useState(null)

  // refs
  const FormElement = useRef(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")
  const [formStatus, setFormStatus] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data, e) => {
    //   /admin/ledger
    instance
      .patch(`${process.env.REACT_APP_API_URL}/admin/ledger/${id}`, data)
      .then(res => {
        setIsSuccess(true)
        setFormStatus(1)
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

  const getData = () => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/ledger/${id}`)
      .then(res => {
        setData(res.data)
        reset({
          amount: res.data.amount,
          message: res.data.message,
          meta: {
            start_date: res.data.meta.start_date,
            due_date: res.data.meta.due_date,
          },
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getSuppliers()
    getData()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Edit Ledger | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Edit Ledger" />

          <Card>
            <CardBody>
              {isSuccess && (
                <Alert color="success">Item edited successfully</Alert>
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
                    ? `Item edited successfully`
                    : `Something went wrong`}
                </SweetAlert>
              ) : null}
              <Progress striped value={
                  data ? (data.amount_paid / data.amount) * 100 : 0
              } />
              <p className="text-center mt-2">
                ₹ {data ? data.amount_paid : 0} / ₹ {data ? data.amount : 0}
              </p>
              {/* Form */}
              <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  {/* Supplier */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Supplier </label>
                      <select
                        className="form-select"
                        name="supplier_id"
                        value={data?.supplier?.uuid}
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

          <Card>
              <CardBody>
                  <AddItem 
                    id={id}
                    getData={getData}
                  />
                    <Table
                        tableHead={[
                            "Date",
                            "Amount",
                            "Bank Name",
                            "IFSC Code",
                            "Payment Method",
                            "Transaction ID",
                            "Transaction Type",
                            "Message",
                        ]}
                        tableData={data?.items?.map((transaction, index) => {
                            return [
                                transaction.date_credited,
                                transaction.amount,
                                transaction.bank_name,
                                transaction.ifsc_code,
                                transaction.payment_method,
                                transaction.transaction_id,
                                transaction.transaction_type,
                                transaction.message,
                            ]
                        })}
                    />
                    {/* create table from reactstrap */}
                    <Table
                    >
                        <thead>
                            <tr>
                                <th>S NO</th>
                                <th>Date Credited</th>
                                <th>Amount</th>
                                <th>Bank Name</th>
                                <th>IFSC Code</th>
                                <th>Payment Method</th>
                                <th>Transaction ID</th>
                                <th>Transaction Type</th>
                                <th>Message</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.items?.map((transaction, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{transaction.id}</td>
                                        <td>{transaction.date_credited}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.bank_name}</td>
                                        <td>{transaction.ifsc_code}</td>
                                        <td>{transaction.payment_method}</td>
                                        <td>{transaction.transaction_id}</td>
                                        <td>
                                        <span className={`badge ${transaction.transaction_type === 'credit'? 'bg-success': 'bg-warning'} rounded-pill`}>{transaction.transaction_type}</span>
                                        </td>
                                        <td>{transaction.message}</td>
                                        <td>{moment(transaction.createdAt).format("DD-MM-YYYY h:mm:ss a") }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index

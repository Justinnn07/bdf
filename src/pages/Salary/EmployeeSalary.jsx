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

function range(
  start,
  stop,
  step = 1,
  circularFill = false,
  map = value => value
) {
  if (typeof stop === "undefined") {
    stop = start
    start = 0
  }

  if (step > 0 && start >= stop) {
    step = -step
  }

  if (step < 0 && start <= stop) {
    return []
  }

  let index = start
  const result = []

  if (circularFill) {
    const size = start + stop
    for (index; step > 0 ? index < size : index > size; index += step) {
      result.push(map(index % stop))
    }
    return result
  }

  for (index; step > 0 ? index < stop : index > stop; index += step) {
    result.push(map(index))
  }

  return result
}

const months = [
  { number: 1, month: "January" },
  { number: 2, month: "February" },
  { number: 3, month: "March" },
  { number: 4, month: "April" },
  { number: 5, month: "May" },
  { number: 6, month: "June" },
  { number: 7, month: "July" },
  { number: 8, month: "August" },
  { number: 9, month: "September" },
  { number: 10, month: "October" },
  { number: 11, month: "November" },
  { number: 12, month: "December" },
]

// validation schema
const schema = yup.object().shape({
  employee_id: yup.string().required("Employee ID is required"),
  amount: yup.number().required("Amount is required"),
  half_month: yup.string().required("Half month is required"),
  month: yup.string().required("Month is required"),
  year: yup.string().required("Year is required"),
  pf_amount: yup.number().required("PF Amount is required"),
})
const Index = props => {
  // state
  const [branches, setBranches] = useState([])
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

  const onSubmit = data => {
    instance
      .post(`${process.env.REACT_APP_API_URL}/admin/salary/employee`, data)
      .then(res => {
        setIsSuccess(true)
        setFormStatus(1)
        console.log(res)
      })
      .catch(err => {
        console.log(err?.response?.data?.message)
        setErrorResponse(
          err.response?.data?.message
            ? err.response?.data?.message
            : "Something went wrong"
        )
        setFormStatus(2)
      })
  }

  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/employee`)
      .then(res => {
        setBranches(res.data)
      })
      .catch(err => {})
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Salary | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Salary" />
          <Card>
            <CardBody>
              {isSuccess && (
                <Alert color="success">Salary distributed successfully</Alert>
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
                    ? `Salary distributed successfully`
                    : errorResponse}
                </SweetAlert>
              ) : null}
              <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col lg={6}>
                    <div className="form-group">
                      {/* employee */}
                      <Label for="employee">Employee</Label>
                      <select
                        name="employee"
                        id="employee"
                        className="form-select"
                        {...register("employee_id")}
                      >
                        <option value="">Select Employee</option>
                        {branches.map(branch => (
                          <option value={branch.id}>
                            {branch.first_name} {branch.last_name}
                          </option>
                        ))}
                      </select>
                      <p className="text-danger">
                        {" "}
                        {errors.employee_id?.message}
                      </p>
                    </div>
                  </Col>
                  <Col lg={6}></Col>

                  <Row>
                    <Col md="4">
                      <Label>Half Month</Label>
                      <select
                        className="form-select"
                        onChange={e => setHalfMonth(e.target.value)}
                        {...register("half_month")}
                      >
                        <option value={""}>Select half month</option>
                        <option value={1}>First Half</option>
                        <option value={2}>Second Half</option>
                      </select>
                      <p className="text-danger">
                        {errors.half_month?.message}
                      </p>
                    </Col>
                    <Col md="4">
                      <Label>Month</Label>
                      <select
                        className="form-select"
                        onChange={e => setMonth(e.target.value)}
                        {...register("month")}
                      >
                        <option value={""}>Select a month</option>
                        {months.map((month, key) => (
                          <option value={month.number}>{month.month}</option>
                        ))}
                      </select>
                      <p className="text-danger">{errors.month?.message}</p>
                    </Col>
                    <Col md="4">
                      <Label>Year</Label>
                      <select
                        className="form-select"
                        onChange={e => setYear(e.target.value)}
                        {...register("year")}
                      >
                        {range(2020, 2099, 1).map((year, key) => (
                          <option
                            value={year}
                            selected={
                              new Date().getFullYear() === year ? true : false
                            }
                          >
                            {year}
                          </option>
                        ))}
                      </select>
                      <p className="text-danger">{errors.year?.message}</p>
                    </Col>
                  </Row>

                  <Col lg={6}>
                    <div className="form-group">
                      {/* amount */}
                      <Label for="amount">Amount</Label>
                      <input
                        type="number"
                        min="1"
                        name="amount"
                        id="amount"
                        className="form-control"
                        placeholder="Amount"
                        {...register("amount")}
                      />
                      <p className="text-danger"> {errors.amount?.message}</p>
                    </div>
                  </Col>
                  {/* pf_amount */}
                  <Col lg={6}>
                    <div className="form-group">
                      <Label for="pf_amount">PF Amount</Label>
                      <input
                        type="number"
                        min="1"
                        name="pf_amount"
                        id="pf_amount"
                        className="form-control"
                        placeholder="PF Amount"
                        {...register("pf_amount")}
                      />
                      <p className="text-danger">{errors.pf_amount?.message}</p>
                    </div>
                  </Col>
                  <Col md="4">
                    <Label>Price per 1000 beedis (optional)</Label>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      className="form-control"
                      placeholder="Price"
                      defaultValue={0}
                      {...register("price")}
                    />
                    <p className="text-danger">{errors.price?.message}</p>
                  </Col>
                </Row>
                <br />
                <Button color="primary" type="submit">
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

import React, { Component, Suspense, useEffect, useState, useRef } from "react"
import instance from "../../helpers/api/axiosHelper"
import {
  Row,
  Col,
  Card,
  CardBody,
  Media,
  CardTitle,
  Label,
  Form,
  Container,
  Button,
} from "reactstrap"
import MetaTags from "react-meta-tags"
import { register } from "serviceWorker"
import moment from "moment"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  branch_id: yup.string().required("Branch is required"),
  from: yup.string().required("From date is required"),
  to: yup.string().required("To date is required"),
})

const Dashboard = () => {
  const FormElement = useRef(null)

  const [branches, setBranches] = useState([])
  const [data, setData] = useState([])

  // state
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const getBranches = () => {
    instance.get(`${process.env.REACT_APP_API_URL}/admin/branch`).then(res => {
      setBranches(res.data)
    })
  }

  const printInvoice = () => {
    window.print()
  }

  const onSubmit = (formData, e) => {
    debugger
    let data = formData
    instance
      .get(
        `${process.env.REACT_APP_API_URL}/reports/branch/${data.branch_id}?from=${data.from}&to=${data.to}`,
        data
      )
      .then(res => {
        setData(res.data)
        setIsSuccess(true)
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          setErrorResponse(err?.response?.data?.message)
        }
      })
  }

  useEffect(() => {
    getBranches()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Reports | Admin</title>
        </MetaTags>
        <Container fluid>
          <Card>
            <CardBody>
              <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
                <h4>Reports</h4>
                <Row className="mt-4 mb-0">
                  <Col md="4">
                    <Label>Select Branch</Label>
                    <select className="form-select" {...register("branch_id")}>
                      <option value="">Select Branch</option>
                      {branches.map((branch, index) => (
                        <option key={index} value={branch.uuid}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-danger">{errors.branch_id?.message}</p>
                  </Col>
                  <Col md="4">
                    <Label>From</Label>
                    <input
                      type="date"
                      className="form-control"
                      defaultValue={moment()
                        .subtract(15, "days")
                        .format("YYYY-MM-DD")}
                      {...register("from")}
                    />
                    <p className="text-danger">{errors.from?.message}</p>
                  </Col>
                  <Col md="4">
                    <Label>To</Label>
                    <input
                      type="date"
                      className="form-control"
                      {...register("to")}
                    />
                    <p className="text-danger mb-0">{errors.to?.message}</p>
                  </Col>
                </Row>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                
              <h3>Reports</h3>
              <Button color="primary" onClick={printInvoice}>
                Print
              </Button>
              </div>
              {data?.reports?.map((row, key) => (
                <div className=" shadow border border-2 rounded-3 p-3 mt-3">
                  <h5 className="text-capitalize text-center fw-normal">
                    {row.name.replace("_", " ")}
                  </h5>
                  <Row className="mt-3">
                    {["opening", "closing", "incoming", "outgoing"].map(
                      (type, index) => (
                        <Col md={3} key={index}>
                          <p className="text-capitalize mb-0">{type}</p>
                          <h5 className="mb-0">
                            {row[type] && Math.round(row[type] * 100) / 100}
                            {row.name === "leaf" || row.name === "tobacco"
                              ? " Kg"
                              : " potte"}
                          </h5>
                        </Col>
                      )
                    )}
                  </Row>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3>Bags</h3>
              <Row className="mt-3">
                {data?.bags
                  ?.filter(row => row?.inventory?.type === "tobacco")
                  ?.map((row, key) => (
                    <Col className="p-2" lg={2} md={6} sm={6} xs={6} key={key}>
                      <div className="shadow-sm border rounded p-3">
                        <p className="text-center mb-0">{row?.inventory?.type}</p>
                        <h5 className="text-center mb-0">{row.bag_id}</h5>
                        <p className="text-center text-secondary mb-0">
                          {row.quantity} kgs
                        </p>
                      </div>
                    </Col>
                  ))}
              </Row>
              <br />
              <Row className="mt-3">
                {data?.bags
                  ?.filter(row => row.inventory.type === "leaf")
                  ?.map((row, key) => (
                    <Col className="p-2" lg={2} md={6} sm={6} xs={6} key={key}>
                      <div className="shadow-sm border rounded p-3">
                        <p className="text-center mb-0">
                          {row?.inventory?.type}
                        </p>
                        <h5 className="text-center mb-0">{row.bag_id}</h5>
                        <p className="text-center text-secondary mb-0">
                          {row.quantity} kgs
                        </p>
                      </div>
                    </Col>
                  ))}
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard

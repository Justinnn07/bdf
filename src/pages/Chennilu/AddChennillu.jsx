import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, Button, Form, Alert } from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"

import DateModal from "./components/DateModal"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import moment from "moment"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// validation schema
const schema = yup.object().shape({})
const Index = props => {
  const [data, setData] = useState([])
  const [records, setRecords] = useState([])
  const [beediType, setBeediType] = useState("beedi")
  const [totalChennillu, setTotalChennillu] = useState(1)

  // refresh
  const [refresh, setRefresh] = useState(false)

  // refs
  const FormElement = useRef(null)

  // state
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")
  const [formStatus, setFormStatus] = useState(0)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleChange = (e, key, type) => {
    let newData = records
    newData[key][type] = e
    setRecords(newData)
    checkMatch()
  }

  const checkMatch = () => {
    let match = false
    let data = records
    let total = 0
    data?.forEach(item => {
      total = total + parseInt(item.quantity)
    })
    if (total == totalChennillu * 5000) {
      match = true
    }
    if (data?.length === 0 || totalChennillu === 0 || !totalChennillu) {
      match = false
    }
    setRefresh(match)
  }

  const onSubmit = (data, e) => {
    instance
      .post(`${process.env.REACT_APP_API_URL}/admin/chennilu?type=${beediType}`, records)
      .then(res => {
        setIsSuccess(true)
        setFormStatus(1)
        setErrorResponse("")
      })
      .catch(err => {
        setIsSuccess(false)
        setFormStatus(2)
        setErrorResponse(err?.response?.data?.message)
      })
  }

  const getData = () => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/chennilu/reported-beedi`)
      .then(res => {
        setData(res.data)
        let newData = res.data.map(item => {
          return {
            id: item.uuid,
            quantity: 0,
          }
        })
        setRecords(newData)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Add Chennilu | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Add Chennilu" />
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
                ? `Chennilu added successfully`
                : errorResponse}
            </SweetAlert>
          ) : null}
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-4 me-2">
                    <div className="form-group">
                      <label>Beedi Type</label>
                      <select
                        className="form-select"
                        name="beediType"
                        onChange={e => setBeediType(e.target.value)}
                      >
                        <option value="beedi">Beedi</option>
                        <option value="Chat_beedi">Chat Beedi</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-md-4">
                    <div className="form-group">
                      <label>Number of Chennillu</label>
                      <input
                        type="number"
                        className="form-control"
                        name="totalChennillu"
                        min={0}
                        defaultValue={0}
                        onChange={e => {
                          setTotalChennillu(e.target.value)
                          checkMatch()
                        }}
                      />
                    </div>
                  </div> */}
                </div>
                <div className="d-flex mt-5">
                  <div className="col-3">
                    <b>Branch</b>
                  </div>
                  <div className="col-3">
                    <b>Remaining Beedi</b>
                  </div>
                  <div className="col-3">
                    <b>Remaining Chat Beedi</b>
                  </div>
                </div>
                {data?.map((row, key) => {
                  return (
                    <div className="d-flex mt-3">
                      <div className="col-3">
                        <Link to={`/branch/${row.branch.uuid}`}>
                          {row.branch.name}
                        </Link>
                      </div>
                      <div className="col-3">
                        <span>{row.remaining_beedi}</span>
                      </div>
                      <div className="col-3">
                        <span>{row.remaining_chat_beedi}</span>
                      </div>
                      <input
                        type="hidden"
                        name="uuid"
                        value={row.uuid}
                        onChange={e => handleChange(e.target.value, key, "id")}
                      />
                      <div className="col-3">
                        <input
                          type="number"
                          className="form-control"
                          name={`${key}.quantity`}
                          min={0}
                          defaultValue={0}
                          onChange={e =>
                            handleChange(e.target.value, key, "quantity")
                          }
                        />
                      </div>
                    </div>
                  )
                })}
                <p
                  className={`
                        ${refresh ? "text-success" : "text-danger"}
                    `}
                >
                  {refresh
                    ? "Total chennilu matches with beedi"
                    : "Total chennilu does not match with beedi"}
                </p>
                <button
                  className="btn btn-primary mt-3"
                  disabled={formStatus === 1}
                >
                  Submit
                </button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index

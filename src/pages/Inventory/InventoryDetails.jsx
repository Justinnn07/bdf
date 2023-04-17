import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Form,
  Col,
  Card,
  CardBody,
  Label,
  Input,
} from "reactstrap"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import Breadcrumbs from "../../components/Common/Breadcrumb"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
import BagsTable from "./components/Bags"

// validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  type: yup.string().required("Type is required"),
  measurement: yup.string().required("Measurement is required"),
  is_decimal: yup.boolean().required("is decimal is required"),
})

const IndeventoryLogDetails = props => {
  let { id } = useParams()

  // refs
  const FormElement = useRef(null)

  // state
  const [inventory, setInventory] = useState([])
  const [items, setItems] = useState([])
  const [bags, setBags] = useState([])
  const [tabType, setTabType] = useState("logs")
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
    defaultValues: inventory
  })

  const onSubmit = (data, e) => {
    // let data = formData;
    instance
      .patch(`${process.env.REACT_APP_API_URL}/admin/inventory/${id}`, data)
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

  // useEffect
  useEffect(() => {
    // get inventory item details
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/inventory/${id}`)
      .then(res => {
        setInventory(res.data)
        reset(res.data)
      })
    //   get inventory logs by id
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/inventory/log/${id}`)
      .then(res => {
        setItems(res.data)
      })
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/inventory/${id}/bags`)
      .then(res => {
        setBags(res.data)
      })
  }, [])

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    }, {
        dataField: 'supplier.name',
        text: 'Supplier',
        formatter: (cell, row) => {
            return (
                row. supplier ?
                <Link to={`/suppliers/${row.supplier.uuid}`}>
                    {cell}
                </Link> :
                <span>--</span>
            )
        },
    }, {
        dataField: 'quantity',
        text: 'Quantity',
        sort: true,
        formatter: (cell, row) =>
            <p
                className={row.type === "incoming" ? "text-success" : "text-warning"}
            > {row.type === "incoming" ? '+' : '-'}{row.quantity} {row.item.measurement}</p>
    }, {
        dataField: 'amount',
        text: 'Amount',
        sort: true,
        formatter: (cell, row) => <p>₹ {cell}</p>
    }, {
        dataField: 'createdAt',
        text: 'Created At',
        sort: true,
        formatter: (cell, row) => <p>{cell}</p>
    }, 
    {
        dataField: "updatedAt",
        text: "Updated At",
        sort: true,
      },
    {
      dataField: "uuid",
      text: "Options",
      formatter: (cell, row) => (
        <Link to={`/employees/${row.uuid}`}>
          {" "}
          <button className="btn btn-primary">View Details</button>{" "}
        </Link>
      ),
    },
  ]

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: items.length, // replace later with size(customers),
    custom: true,
  }

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const { SearchBar } = Search

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Inventory details | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Inventory Details" />

          <Card>
            <CardBody>
              <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
                <Row className="mt-3">
                  <Col md="4">
                    <Label>Name</Label>
                    <input
                      name="name"
                      label="Name"
                      className="form-control"
                      placeholder="Enter product name"
                      defaultValue={inventory.name}
                      {...register("name")}
                    />
                    <p className="text-danger">{errors.name?.message}</p>
                  </Col>
                  <Col md="4">
                    <Label>Description</Label>
                    <input
                      name="description"
                      label="Description"
                      className="form-control"
                      placeholder="Enter description for the item"
                      defaultValue={inventory.description}
                      {...register("description")}
                    />
                    <p className="text-danger">{errors.description?.message}</p>
                  </Col>
                  <Col md="4">
                    <Label>Type</Label>
                    <select
                      type="select"
                      name="type"
                      className={`
                         form-select mb-2
                      `}
                      defaultValue={inventory.type}
                      {...register("type")}
                      invalid={errors.type}
                    >
                      <option value="">Select type of item</option>
                      <option value="other">Other</option>
                      <option value="wrapper">Wrapper</option>
                      <option value="zilli">Zilli</option>
                      <option value="tobacco">Tobacco</option>
                    </select>
                    <p className="text-danger">{errors.type?.message}</p>
                  </Col>
                  <Col md="4">
                    <Label>Measurement</Label>
                    <select
                      type="select"
                      name="measurement"
                      className={`
                         form-select mb-2
                      `}
                      defaultValue={inventory.measurement}
                      {...register("measurement")}
                      invalid={errors.measurement}
                    >
                      <option value="">Select Measurement</option>
                      <option value="kgs">Kgs</option>
                      <option value="meters">Meters</option>
                      <option value="units">Units</option>
                      <option value="liters">Liters</option>
                      <option value="bags">Bags</option>
                    </select>
                    <p className="text-danger">{errors.measurement?.message}</p>
                  </Col>
                  <Col md="4">
                    <Label>Is Decimal</Label>
                    <select
                      type="select"
                      name="is_decimal"
                      className={`
                         form-select mb-2
                      `}
                      defaultValue={inventory.is_decimal}
                      {...register("is_decimal")}
                      invalid={errors.is_decimal}
                    >
                      <option value="">Select Measurement</option>
                      <option value={true}>Decimals</option>
                      <option value={false}>Units</option>
                    </select>
                    <p className="text-danger">{errors.is_decimal?.message}</p>
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

              <br />
              <button onClick={()=>{setTabType("logs")}} className={`btn ${tabType == "logs" ? 'btn-primary': 'btn-white'} me-3 px-4`}>Logs</button>
              <button onClick={()=>{setTabType("bags")}} className={`btn ${tabType == "bags" ? 'btn-primary': 'btn-white'} px-4`}>Bags</button>
              <br /> <br />
              {tabType === "logs" &&<PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="id"
                columns={columns}
                data={items}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="id"
                    columns={columns}
                    data={items}
                    search
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Row className="mb-2">
                          <Col md="4">
                            <div className="search-box me-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar {...toolkitProps.searchProps} />
                                <i className="bx bx-search-alt search-icon" />
                              </div>
                            </div>
                          </Col>
                          <Col md="8">
                          </Col>
                        </Row>

                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                keyField={"id"}
                                responsive
                                bordered={false}
                                striped={false}
                                defaultSorted={defaultSorted}
                                selectRow={selectRow}
                                classes={"table align-middle table-nowrap"}
                                headerWrapperClasses={"thead-light"}
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="align-items-md-center mt-30">
                          <Col className="inner-custom-pagination d-flex">
                            <div className="d-inline">
                              <SizePerPageDropdownStandalone
                                {...paginationProps}
                              />
                            </div>
                            <div className="text-md-right ms-auto">
                              <PaginationListStandalone {...paginationProps} />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider> }
              {tabType === "bags" && 
                <BagsTable bags={bags} />
              }
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default IndeventoryLogDetails

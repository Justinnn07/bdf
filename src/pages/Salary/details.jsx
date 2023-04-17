import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import "./datatables.scss"
const SalaryLogs = props => {
  const { id } = useParams()
  // state
  const [details, setDetails] = useState({})
  const [salaryLogs, setSalaryLogs] = useState([])

  const GetSalaryLogs = () => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/salary/${id}`)
      .then(res => {
        setDetails(res.data.salaryLog)
        setSalaryLogs(res.data.employees_salary)
      })
  }

  // useEffect
  useEffect(() => {
    GetSalaryLogs()
  }, [])

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "employee.first_name",
      text: "Employee Name",
      sort: true,
      formatter: (cell, row) => {
        return (
          <Link to={`/employees/${row?.employee?.uuid}`}>
            {row?.employee?.first_name}{" "}
            {row?.employee?.last_name}
          </Link>
        )
      },
    },
    {
      dataField: "total_beedis",
      text: "Total Beedis",
      sort: true,
    },
    {
      dataField: "beedi_price",
      text: "Price per beedi(1000)",
      sort: true,
    },
    {
      dataField: "amount",
      text: "Amount Released",
      sort: true,
    },
    {
      dataField: "updatedAt",
      text: "Updated At",
      sort: true,
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
    totalSize: salaryLogs.length, // replace later with size(customers),
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
          <title>Salary Details | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Salary Details" />

          <Card>
            <CardBody>
              <Row>
                <Col md="3">
                  <h5 className="mb-0">Branch Name</h5>
                  <p>{details?.branch?.name}</p>
                </Col>
                {/* person name */}
                <Col md="3">
                  <h5 className="mb-0">Person Name</h5>
                  <p>{details?.branch?.person_name}</p>
                </Col>
              </Row>

              <Row>
                <Col md="3">
                  <h5 className="mb-0">Total Beedis</h5>
                  <p>{details?.total_beedis}</p>
                </Col>
                <Col md="3">
                  <h5 className="mb-0">Total Employee Beedis</h5>
                  <p>{details?.total_employee_beedis}</p>
                </Col>
                <Col md="3">
                  <h5 className="mb-0">Price per beedi(1000)</h5>
                  <p>{details?.beedi_price}</p>
                </Col>

                <Col md="3">
                  <h5 className="mb-0">Total Amount</h5>
                  <p>{details?.total_amount}</p>
                </Col>
              </Row>
              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="id"
                columns={columns}
                data={salaryLogs}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="id"
                    columns={columns}
                    data={salaryLogs}
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
                            <div className="d-flex justify-content-end">
                              {/* <AddCartonModal /> */}
                            </div>
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
              </PaginationProvider>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SalaryLogs

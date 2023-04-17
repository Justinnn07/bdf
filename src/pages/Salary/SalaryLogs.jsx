import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap"
import moment from "moment"

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
  // state
  const [salaryLogs, setSalaryLogs] = useState([])

  const GetSalaryLogs = () => {
    instance.get(`${process.env.REACT_APP_API_URL}/admin/salary`).then(res => {
      setSalaryLogs(res.data)
    })
  }

  const deleteHandler = id => {
    instance
      .delete(`${process.env.REACT_APP_API_URL}/admin/salary/${id}`)
      .then(res => {
        GetSalaryLogs()
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
      dataField: "id",
      text: "Employee / Incharge",
      sort: true,
      formatter: (cell, row) =>
        row.meta.type === "employee" ? (
          <Link to={`/employees/${row.employee.uuid}`}>
            {row.employee.first_name} {row.employee.last_name}
          </Link>
        ) : (
          <Link to={`/managers/${row?.branch?.manager?.uuid}`}>
            {row?.branch?.manager?.first_name} {row?.branch?.manager?.last_name}
          </Link>
        ),
    },
    {
      dataField: "branch",
      text: "Branch",
      formatter: (cell, row) =>
        row.branch ? (
          <Link to={`/branch/${row.branch && row.branch.uuid}`}>
            {row.branch && row.branch.name}{" "}
          </Link>
        ) : (
          <span>--</span>
        ),
    },
    {
      dataField: "total_amount",
      text: "Amount",
      sort: true,
      formatter: (cell, row) => <span>&#8377; {row.total_amount}</span>,
    },
    {
      dataField: "total_beedis",
      text: "Total Beedis",
      sort: true,
      formatter: (cell, row) =>
        row?.meta?.type === "branch" ? <span>{cell}</span> : <span>--</span>,
    },
    {
      dataField: "beedi_price",
      text: "Price per beedi(1000)",
      sort: true,
      formatter: (cell, row) =>
        row?.meta?.type === "branch" ? <span>{cell}</span> : <span>--</span>,
    },
    {
      dataField: "createdAt",
      text: "Date Time",
      sort: true,
      formatter: (cell, row) => (
        <span>{moment(row.createdAt).format("DD-MM-YYYY hh:mm a")}</span>
      ),
    },
    {
      dataField: "uuid",
      text: "Action",
      formatter: (cell, row) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deleteHandler(cell)}
        >
          Delete
        </button>
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
          <title>Salary Logs | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Salary Logs" />

          <Card>
            <CardBody>
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

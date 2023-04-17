import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import moment from "moment"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import ProductionModal from "./productionModal"
// import "./datatables.scss"
const Production = props => {
  let { id } = useParams()
  // state
  const [logs, setLogs] = useState([])
  const [from, setFrom] = useState(
    moment().subtract(15, "days").format("YYYY-MM-DD")
  )
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"))

  const getData = () => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/table/branch/${id}/reported-beedi?from=${from}&to=${to}`)
      .then(res => {
        setLogs(res.data)
      })
  }

  // useEffect
  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      dataField: "id",
      text: "S.No",
      sort: true,
    },
    {
      dataField: "uuid",
      text: "Employee Name",
      formatter: (cell, row) => (
        <Link
          to={`/branch/${id}/employees/${row.employee && row.employee.uuid}`}
        >
          {" "}
          {row.employee && row.employee.first_name}{" "}
        </Link>
      ),
    },
    {
      dataField: "beedi",
      text: "Beedi",
      sort: true,
    },
    {
      dataField: "leaf",
      text: "Leaf",
      sort: true,
    },
    {
      dataField: "tobacco",
      text: "Tobacco",
      sort: true,
    },
    {
      dataField: "red_yarn",
      text: "Red Yarn",
      sort: true,
    },
    {
      dataField: "jamula_yarn",
      text: "Jamula Yarn",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
      formatter: (cell, row) => (
        <p>{moment(cell).format("DD-MM-YYYY h:mm:ss a")}</p>
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
    totalSize: logs.length, // replace later with size(customers),
    custom: true,
  }

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const { SearchBar } = Search

  return (
    <div>
      <React.Fragment>
        <div className="">
          <Container fluid>
            <br />
            <div className="d-flex justify-content-end mb-3" align="right">
              <ProductionModal getData={getData} />
            </div>
            <PaginationProvider
              pagination={paginationFactory(pageOptions)}
              keyField="id"
              columns={columns}
              data={logs}
            >
              {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider
                  keyField="id"
                  columns={columns}
                  data={logs}
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
                          <div className="d-flex justify-content-end mb-3">
                            <div className="d-flex col-lg-8 col-md-12">
                              <input
                                type="date"
                                className="form-control me-2"
                                // set default value -15days without time in format DD-MM-YYYY without time
                                defaultValue={from}
                                onChange={e => setFrom(e.target.value)}
                              />
                              <input
                                type="date"
                                className="form-control me-2"
                                // set default value today without time in format DD-MM-YYYY without time
                                defaultValue={to}
                                onChange={e => setTo(e.target.value)}
                              />
                              <button
                                onClick={() => getData()}
                                className="btn btn-primary"
                              >
                                Apply
                              </button>
                            </div>
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
          </Container>
        </div>
      </React.Fragment>
    </div>
  )
}

export default Production

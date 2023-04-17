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

// import "./datatables.scss"
const Details = props => {
  let { id } = useParams()
  // state
  const [stockLogs, setStockLogs] = useState([])
  const [from, setFrom] = useState(
    moment().subtract(15, "days").format("YYYY-MM-DD")
  )
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"))

  const deleteRecord = id => {
    instance
      .delete(`${process.env.REACT_APP_API_URL}/admin/branch/stock/${id}`)
      .then(res => {
        getData()
      })
  }

  const getData = () => {
    instance
      .get(
        `${process.env.REACT_APP_API_URL}/table/branch/${id}/stock?from=${from}&to=${to}`
      )
      .then(res => {
        setStockLogs(res.data)
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
      dataField: "Created At",
      text: "Date Time",
      sort: true,
      formatter: (cell, row) => (
        <span>{moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss a")}</span>
      ),
    },
    {
      dataField: "uuid",
      text: "Options",
      formatter: (cell, row) => (
        <button
          className="btn btn-danger"
          onClick={() => deleteRecord(row.uuid)}
        >
          Delete
        </button>
      ),
    },
  ]

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: stockLogs.length,
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
            <div className="d-flex justify-content-end">
              <Link className="btn btn-primary" to={`/branch/${id}/stock/add`}>
                Add Stock
              </Link>
            </div>
            <br />
            <PaginationProvider
              pagination={paginationFactory(pageOptions)}
              keyField="id"
              columns={columns}
              data={stockLogs}
            >
              {({ paginationProps, paginationTableProps }) => (
                <ToolkitProvider
                  keyField="id"
                  columns={columns}
                  data={stockLogs}
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

export default Details

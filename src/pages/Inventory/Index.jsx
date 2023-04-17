import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
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
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import "./datatables.scss"
const Index = props => {
  let { id } = useParams()
  // state
  const [items, setItems] = useState([])
  const [from, setFrom] = useState(
    moment().subtract(15, "days").format("YYYY-MM-DD")
  )
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"))

  const getData = () => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/inventory?from=${from}&to=${to}`)
      .then(res => {
        setItems(res.data)
      })
  }
  // useEffect
  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "quantity",
      text: "Quantity",
      sort: true,
      formatter: (cell, row) => (
        <p>
          {row.quantity} {row.measurement}
        </p>
      ),
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
    },
    // incoming, outgoing, opening_balance, closing_balance columns
    {
      dataField: "incoming",
      text: "Incoming",
      sort: true,
      formatter: (cell, row) => (
        <p>
          {row.incoming ? row.incoming : 0} {row.measurement}
        </p>
      ),
    },
    {
      dataField: "outgoing",
      text: "Outgoing",
      sort: true,
      formatter: (cell, row) => (
        <p>
          {row.outgoing ? row.outgoing : 0} {row.measurement}
        </p>
      ),
    },
    {
      dataField: "opening_balance",
      text: "Opening Balance",
      sort: true,
      formatter: (cell, row) => (
        <p>
          {row.opening_balance ? row.opening_balance : 0} {row.measurement}
        </p>
      ),
    },
    {
      dataField: "closing_balance",
      text: "Closing Balance",
      sort: true,
      formatter: (cell, row) => (
        <p>
          {row.closing_balance ? row.closing_balance : 0} {row.measurement}
        </p>
      ),
    },
    {
      dataField: "uuid",
      text: "Options",
      formatter: (cell, row) => (
        <Link to={`/inventory/${row.uuid}`}>
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
          <title>Inventory | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Inventory" />

          <Card>
            <CardBody>
              <PaginationProvider
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
                            <div className="d-flex justify-content-end">
                              <Link
                                to="/inventory/add"
                                className="btn btn-primary me-3"
                              >
                                Add Item
                              </Link>
                              <Link
                                to="/inventory/create-tobacco"
                                className="btn btn-primary"
                              >
                                Create Tobacco
                              </Link>
                            </div>
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-end">
                          <Col className="d-flex" md="8">
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
                          </Col>
                        </div>

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

export default Index

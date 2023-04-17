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
      .get(
        `${process.env.REACT_APP_API_URL}/table/inventory-logs?from=${from}&to=${to}`
      )
      .then(res => {
        setItems(res.data)
      })
  }

  const deleteRecord = id => {
    instance
      .delete(`${process.env.REACT_APP_API_URL}/admin/inventory/log/${id}`)
      .then(res => {
        getData()
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
      dataField: "item.name",
      text: "Item",
      sort: true,
    },
    {
      dataField: "supplier.name",
      text: "Supplier",
      formatter: (cell, row) => {
        return row.supplier ? (
          <Link to={`/suppliers/${row.supplier.uuid}`}>{cell}</Link>
        ) : (
          <span>--</span>
        )
      },
    },
    {
      dataField: "quantity",
      text: "Quantity",
      sort: true,
      formatter: (cell, row) => (
        <p
          className={row.type === "incoming" ? "text-success" : "text-warning"}
        >
          {" "}
          {row.type === "incoming" ? "+" : "-"}
          {row.quantity} {row.item.measurement}
        </p>
      ),
    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: (cell, row) => <p>₹ {cell}</p>,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
      formatter: (cell, row) => (
        <p>{moment(cell).format("DD-MM-YYYY h:mm:ss a")}</p>
      ),
    },
    {
      dataField: "uuid",
      text: "options",
      formatter: (cell, row) => {
        return (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteRecord(cell)}
          >
            Delete
          </button>
        )
      },
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
    totalSize: items.length, // replace later with size(customers),
    custom: true,
  }

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }

  const { SearchBar } = Search

  return (
    <div>
      <div className="d-flex justify-content-end mb-5">
        <Link to="/inventory/logs/add" className="btn btn-primary">
          Add Inventory Log
        </Link>
      </div>
      <PaginationProvider
        pagination={paginationFactory(pageOptions)}
        keyField="id"
        columns={columns}
        data={items}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider keyField="id" columns={columns} data={items} search>
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
                      <SizePerPageDropdownStandalone {...paginationProps} />
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
    </div>
  )
}

export default Index

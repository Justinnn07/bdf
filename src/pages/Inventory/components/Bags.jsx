import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../../helpers/api/axiosHelper"
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

const Bags = props => {
  const [bags, setBags] = useState([])

  useEffect(() => {
    setBags(props.bags)
  })

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "bag_id",
      text: "Bag Id",
      sort: true,
    },
    {
      dataField: "quantity",
      text: "Quantity",
      sort: true,
      formatter: (cell, row) => {
        return <span>{row.quantity} kgs</span>
      },
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    {
      dataField: "entry_type",
      text: "Entry Type",
      sort: true,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
      formatter: (cell, row) => <p>{cell}</p>,
    },
    {
      dataField: "updatedAt",
      text: "Updated At",
      sort: true,
    },
    // change status
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cell, row) => {
        return row.status === "pending" || row.status === "completed" ? (
          <button
            className="btn btn-danger"
            onClick={e => handleCancelBag(row.uuid, "cancelled")}
          >
            Cancel Bag
          </button>
        ) : row.status === "cancelled" ? (
          <button
            className="btn btn-success"
            onClick={e => handleCancelBag(row.uuid, "pending")}
          >
            Re-open Bag
          </button>
        ) : (
          <span></span>
        )
      },
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
    totalSize: bags.length, // replace later with size(customers),
    custom: true,
  }

  // Select All Button operation
  const selectRow = {
    mode: "checkbox",
  }
  const { SearchBar } = Search

  const handleCancelBag = (uuid, status) => {
    instance
      .post(`${process.env.REACT_APP_API_URL}/admin/inventory/${uuid}/bags`)
      .then(res => {
        props.getBags()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <PaginationProvider
        pagination={paginationFactory(pageOptions)}
        keyField="id"
        columns={columns}
        data={bags}
      >
        {({ paginationProps, paginationTableProps }) => (
          <ToolkitProvider keyField="id" columns={columns} data={bags} search>
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
                  <Col md="8"></Col>
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

export default Bags

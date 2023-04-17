import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody } from "reactstrap";

import moment from "moment";
// datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider, PaginationListStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import "./datatables.scss"
const Branch = (props) => {

  // state
  const [branches, setBranches] = useState([])

  // useEffect
  useEffect(() => {
    instance.get(`${process.env.REACT_APP_API_URL}/admin/branch`)
      .then((res) => {
        setBranches(res.data)
      })
  }, [])

  const columns = [{
    dataField: 'id',
    text: 'Id',
    sort: true,
  }, {
    dataField: 'name',
    text: 'Name',
    sort: true
  }, {
    dataField: 'person_name',
    text: 'Person Name',
    sort: true
  }, {
    dataField: 'leaf',
    text: 'Leaf(kgs)',
    sort: true,
    formatter: (cell, row) => (
      <p>{cell.toFixed(2)} kgs</p>
    ),
  }, {
    dataField: 'tobacco',
    text: 'Tobacco(kgs)',
    sort: true,
    formatter: (cell, row) => (
      <p>{cell.toFixed(2)} kgs</p>
    ),
  }, {
    dataField: 'red_yarn',
    text: 'Red Yarn',
    sort: true,
    formatter: (cell, row) => (
      <p>{cell} potte</p>
    ),
  }, {
    dataField: 'jamula_yarn',
    text: 'Jamula Yarn',
    sort: true,
    formatter: (cell, row) => (
      <p>{cell} potte</p>
    ),
  },
  {
    dataField: "createdAt",
    text: "Created At",
    sort: true,
    formatter: (cell, row) => (
      <span>{moment(row.createdAt).format("YYYY-MM-DD HH:mm:ss a")}</span>
    ),
  },
  {
    dataField: "updatedAt",
    text: "Updated At",
    sort: true,
    formatter: (cell, row) => (
      <span>{moment(row.updatedAt).format("YYYY-MM-DD HH:mm:ss a")}</span>
    ),
  },
  {
    dataField: 'uuid',
    text: 'Options',
    formatter: (cell, row) => <Link to={`/branch/${cell}`}> <button className="btn btn-primary">View Details</button> </Link>,
  }
  ];


  const defaultSorted = [{
    dataField: 'id',
    order: 'asc'
  }];

  const pageOptions = {
    sizePerPage: 10,
    totalSize: branches.length, // replace later with size(customers),
    custom: true,
  }

  // Select All Button operation
  const selectRow = {
    mode: 'checkbox'
  }

  const { SearchBar } = Search;
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Branches | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Branches" />

          <Card>
            <CardBody>
              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField='id'
                columns={columns}
                data={branches}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField='id'
                    columns={columns}
                    data={branches}
                    search
                  >
                    {toolkitProps => (
                      <React.Fragment>

                        <Row className="mb-2">
                          <Col md="4">
                            <div className="search-box me-2 mb-2 d-inline-block">
                              <div className="position-relative">
                                <SearchBar
                                  {...toolkitProps.searchProps}
                                />
                                <i className="bx bx-search-alt search-icon" />
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
                                classes={
                                  "table align-middle table-nowrap"
                                }
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
                              <PaginationListStandalone
                                {...paginationProps}
                              />
                            </div>
                          </Col>
                        </Row>
                      </React.Fragment>
                    )
                    }
                  </ToolkitProvider>
                )
                }</PaginationProvider>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}


export default Branch;
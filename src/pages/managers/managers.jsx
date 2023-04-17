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
const BranchManagers = (props) => {

    // state
    const [branches, setBranches] = useState([])

    // useEffect
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/manager`)
            .then((res) => {
                setBranches(res.data)
            })
    }, [])

    const columns = [{
        dataField: 'id',
        text: 'Id',
        sort: true,
    }, {
        dataField: 'first_name',
        text: 'Name',
        sort: true
    },
    {
        dataField: 'mobile_number',
        text: 'Mobile Number',
        sort: true
    },
    {
        dataField: 'city',
        text: 'location',
        sort: true
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
        dataField: 'updatedAt',
        text: 'Updated At',
        sort: true,
        formatter: (cell, row) => (
            <p>{moment(cell).format("DD-MM-YYYY h:mm:ss a")}</p>
        ),
    },
    {
        dataField: 'uuid',
        text: 'Options',
        formatter: (cell, row) => <Link to={`/managers/${row.uuid}`}> <button className="btn btn-primary">View Details</button> </Link>,
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
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Branch Managers" />

                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-end" align="right">
                                <Link to="/managers/add" className="btn btn-success" align="right"> Add Branch Manager</Link>
                            </div>
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


export default BranchManagers;
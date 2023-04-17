import React, { useState, useEffect } from "react";
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Link } from "react-router-dom"
import { Container, Row, Col, Card, CardBody } from "reactstrap";


// datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider, PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Distributor = (props) => {

    // state
    const [distributor, setDistributor] = useState([])

    // useEffect
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/distributor`)
            .then((res) => {
                setDistributor(res.data)
            })
    }, [])

    const columns = [{
        dataField: 'id',
        text: 'Id',
        sort: true,
    }, {
        dataField: 'agency_name',
        text: 'Agency Name',
        sort: true
    }, {
        dataField: 'owner_name',
        text: 'Owner Name',
        sort: true
    }, {
        dataField: 'mobile_number',
        text: 'Mobile Number',
        sort: true
    }, {
        dataField: 'zone',
        text: 'Zone',
        sort: true
    },
    {
        dataField: 'uuid',
        text: 'Options',
        formatter: (cell, row) => <Link to={`/distributor/${cell}`}> <button className="btn btn-primary">View Details</button> </Link>,
    }
    ];

    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: distributor.length, // replace later with size(customers),
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
                    <title>Distributors | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Distributors" />

                    <Card>
                        <CardBody>
                            <PaginationProvider
                                pagination={paginationFactory(pageOptions)}
                                keyField='id'
                                columns={columns}
                                data={distributor}
                            >
                                {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                        keyField='id'
                                        columns={columns}
                                        data={distributor}
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


export default Distributor;
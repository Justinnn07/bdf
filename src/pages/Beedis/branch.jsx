import React, { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody, Table, Button } from "reactstrap";


// datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider, PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumbs from "../../components/Common/Breadcrumb"

import AddChenniluModal from "./components/AddChenniluModal";

const ReportedBeedi = (props) => {
    let { id } = useParams();
    const [reportedBeedi, setReportedBeedi] = useState(null)
    const [reportedBeedis, setReportedBeedis] = useState([])

    const columns = [{
        dataField: 'id',
        text: 'Id',
        sort: true,
    }, {
        dataField: 'registered_beedi',
        text: 'Registered Beedi',
        sort: true
    },
    {
        dataField: 'peechu_beedi',
        text: 'Peechu Beedi',
        sort: true
    },
    {
        dataField: 'net_beedi',
        text: 'Net Beedi',
        sort: true
    },
    {
        dataField: 'gampa_chat',
        text: 'Gampa Chat',
        sort: true
    },
    {
        dataField: 'reported_beedi',
        text: 'Reported Beedi',
        sort: true
    },
    {
        dataField: 'aavak_beedi',
        text: 'Aavak Beedi',
        sort: true
    },
    {
        dataField: 'total_beedi',
        text: 'Total Beedi',
        sort: true
    },
    {
        dataField: 'updatedAt',
        text: 'Updated At',
        sort: true
    },
    {
        dataField: 'uuid',
        text: 'Options',
        formatter: (cell, row) => <Link to={`/beedis/${row.uuid}`}> <button className="btn btn-primary">View Details</button> </Link>,
    },
    ];
    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: reportedBeedis.length, // replace later with size(customers),
        custom: true,
    }

    // Select All Button operation
    const selectRow = {
        mode: 'checkbox'
    }

    const { SearchBar } = Search;
    // useEffect
    useEffect(() => {
        instance
            .get(`${process.env.REACT_APP_API_URL}/admin/beedis/reported-branches/${id}`)
            .then((res) => {
                setReportedBeedi(res.data.branch)
                setReportedBeedis(res.data.reportedBeedis)
            })
    }, [])



    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Beedis | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Beedis" breadcrumbItem="Reported Beedis" />
                    <Card>
                        <CardBody>
                            {reportedBeedi && <div>
                                <Row>
                                    <Col md="4">
                                        <h5>Branch Name</h5>
                                        <h6>
                                            <Link to={`/branch/${reportedBeedi.uuid}`}>
                                                {reportedBeedi.name}
                                            </Link>
                                        </h6>
                                    </Col>
                                    <Col md="4">
                                        <h5>Updated At</h5>
                                        <h6>{reportedBeedi.updatedAt}</h6>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col md="2">
                                        <h5 className="mb-1">Registered Beedi</h5>
                                        <h6>{reportedBeedi.registered_beedi}</h6>
                                    </Col>
                                    <Col md="2">
                                        <h5 className="mb-1">Peechu Beedi</h5>
                                        <h6>{reportedBeedi.peechu_beedi}</h6>
                                    </Col>
                                    <Col md="2">
                                        <h5 className="mb-1">Net Beedi</h5>
                                        <h6>{reportedBeedi.net_beedi}</h6>
                                    </Col>
                                    <Col md="2">
                                        <h5 className="mb-1">Gampa Chat</h5>
                                        <h6>{reportedBeedi.gampa_chat}</h6>
                                    </Col>
                                    <Col md="2">
                                        <h5 className="mb-1">Reported Beedi</h5>
                                        <h6>{reportedBeedi.reported_beedis}</h6>
                                    </Col>
                                    <Col md="2">
                                        <h5 className="mb-1">Aavak Beedi</h5>
                                        <h6>{reportedBeedi.aavak_beedi}</h6>
                                    </Col>
                                    <Col className="mt-3" md="12" />
                                    <Col md="2">
                                        <h5 className="mb-1">Total Beedi</h5>
                                        <h6>{reportedBeedi.total_beedi}</h6>
                                    </Col>
                                    <Col md="2">
                                        <h5 className="mb-1">Adhori</h5>
                                        <h6>{reportedBeedi.remaining_beedi}</h6>
                                    </Col>
                                </Row>
                            </div>}
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <div className="">
                                <PaginationProvider
                                pagination={paginationFactory(pageOptions)}
                                keyField='id'
                                columns={columns}
                                data={reportedBeedis}
                            >
                                {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                        keyField='id'
                                        columns={columns}
                                        data={reportedBeedis}
                                        search
                                    >
                                        {toolkitProps => (
                                            <React.Fragment>

                                                <Row className="justify-content-between mb-2">
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
                                                    <Col md="2">
                                                    <Link to="/beedis/add" className="btn btn-primary">
                                                        Add Reported Beedis
                                                    </Link>
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
                            </div>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}


export default ReportedBeedi;
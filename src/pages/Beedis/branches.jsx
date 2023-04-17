import React, { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody } from "reactstrap";

import DateModal from "./components/DateModal"
// datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider, PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Button } from "bootstrap";
import moment from "moment";
// import "./datatables.scss"
const Beedis = (props) => {
    let { id } = useParams();
    // state
    const [logs, setLogs] = useState([])


    const applyFilter = (e) => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/beedis/reported-branches?from=${e.from}&to=${e.to}`)
            .then((res) => {
                setLogs(res.data)
            })
    }

    // useEffect
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/beedis/reported-branches`)
            .then((res) => {
                setLogs(res.data)
            })
    }, [])

    const columns = [{
        dataField: 'id',
        text: 'Id',
        sort: true,
    },
    {
        dataField: 'uuid',
        text: 'Branch',
        formatter: (cell, row) => <Link to={`/beedis/branches/${row.uuid}`}>{row.name}</Link>,
    },
    {
        dataField: 'registered_beedi',
        text: 'Registered Beedi',
        sort: true,
        formatter: (cell, row) => cell === null ? 0 : cell
    },
    {
        dataField: 'peechu_beedi',
        text: 'Peechu Beedi',
        sort: true,
        formatter: (cell, row) => cell === null ? 0 : cell
    },
    {
        dataField: 'net_beedi',
        text: 'Net Beedi',
        sort: true,
        formatter: (cell, row) => cell === null ? 0 : cell
    },
    {
        dataField: 'gampa_chat',
        text: 'Gampa Chat',
        sort: true,
        formatter: (cell, row) => cell === null ? 0 : cell
    },
    {
        dataField: 'reported_beedis',
        text: 'Reported Beedi',
        sort: true,
        formatter: (cell, row) => cell === null ? 0 : cell
    },
    {
        dataField: 'aavak_beedi',
        text: 'Aavak Beedi',
        sort: true,
        formatter: (cell, row) => cell === null ? 0 : cell
    },
    {
        dataField: 'total_beedi',
        text: 'Total Beedi',
        sort: true,
        formatter: (cell, row) => cell === null ? 0 : cell
    },
    {
        dataField: 'updatedAt',
        text: 'Updated At',
        sort: true,
        formatter: (cell, row) =>  <span>{moment(cell).format("DD-MM-YYYY h:mm:ss a")}</span>
    },
    {
        dataField: 'uuid',
        text: 'Options',
        formatter: (cell, row) => <Link to={`/beedis/branches/${row.uuid}`}> <button className="btn btn-primary">View Details</button> </Link>,
    },
    ];


    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: logs.length, // replace later with size(customers),
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
                    <title>Beedis | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Beedis" />

                    <Card>
                        <CardBody>
                            <div className="d-flex justify-content-end mb-3">
                                <Link to="/beedis/add" className="btn btn-primary">
                                    Add Reported Beedis
                                </Link>
                            </div>
                            <PaginationProvider
                                pagination={paginationFactory(pageOptions)}
                                keyField='id'
                                columns={columns}
                                data={logs}
                            >
                                {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                        keyField='id'
                                        columns={columns}
                                        data={logs}
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

                                                        <DateModal
                                                            applyFilter={applyFilter}
                                                        />
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


export default Beedis;
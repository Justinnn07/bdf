import React, { useState, useEffect } from "react";
import instance from "../../../helpers/api/axiosHelper"
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


const stockLogs = () => {

    // state
    const [logs, setLogs] = useState([])

    // useEffect
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/stocklog?type=supplier`)
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
        dataField: 'supplier.uuid',
        text: 'Supplier',
        formatter: (cell, row) => row.supplier ? <Link className="text-decoration-underline bg-info text-white px-2" to={`/suppliers/${cell}`}>{row.supplier.name}</Link> : '--'
    }, {
        dataField: 'leaf',
        text: 'leaf',
        sort: true
    }, {
        dataField: 'tobacco',
        text: 'Tobacco',
        sort: true
    }, {
        dataField: 'tobacco_1',
        text: 'Nipali',
        sort: true
    }, {
        dataField: 'tobacco_2',
        text: 'Alina',
        sort: true
    }, {
        dataField: 'tobacco_3',
        text: 'Gujarat 2',
        sort: true
    }, {
        dataField: 'red_yarn',
        text: 'Red Yarn',
        sort: true
    }, {
        dataField: 'jamula_yarn',
        text: 'Jamula Yarn',
        sort: true
    },
    {
        dataField: 'status',
        text: 'Status',
        sort: true
    },
    {
        dataField: 'createdAt',
        text: 'Date',
        sort: true
    },
    {
        dataField: 'uuid',
        text: 'Options',
        formatter: (cell, row) => 
            <Link 
                to={`/stock/invoice?id=${cell}`} className="btn btn-primary"
                // hidden={row.supplier ? false: true}
            >
                View Challan
            </Link>,
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
        <div className="">
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

        </div>
    )
}

export default stockLogs;
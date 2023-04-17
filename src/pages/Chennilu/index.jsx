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
import moment from "moment";
const ProductionDetails = (props) => {

    // state
    const [chennilu, setChennilu] = useState([])

    // useEffect
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/beedis/chennilu/index`)
            .then((res) => {
                setChennilu(res.data)
            })
    }, [])

    const columns = [{
        dataField: 'id',
        text: 'S.No',
        sort: true,
    },
    {
        dataField: 'id',
        text: 'Serial No',
        sort: true
    }, {
        dataField: 'beedis',
        text: 'Beedis',
        sort: true
    },{ 
        dataField: 'type',
        text: 'Type',
        sort: true
    },
    {
        dataField: 'uuid',
        text: 'Reported Beedi',
        formatter: (cell, row) => row.reported_beedi ? <Link to={`/beedis/${row.reported_beedi.uuid}`}> {row.reported_beedi.uuid} </Link> : '--',
    },{
        dataField: 'updatedAt',
        text: 'Updated At',
        sort: true,
        formatter: (cell, row) =>  <span>{moment(cell).format("DD-MM-YYYY h:mm:ss a")}</span>
    },
    ];

    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: chennilu.length, // replace later with size(customers),
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
                    <title>Production Details | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Chennilu" breadcrumbItem="Chennilu" />
                    <Card>
                        <CardBody>
                            <PaginationProvider
                                pagination={paginationFactory(pageOptions)}
                                keyField='id'
                                columns={columns}
                                data={chennilu}
                            >
                                {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                        keyField='id'
                                        columns={columns}
                                        data={chennilu}
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
                                                    <Col
                                                        md="8"
                                                    >
                                                        <div className="d-flex justify-content-end">
                                                            <Link to="/chennilu/add" className="btn btn-primary btn-sm mr-1">
                                                                Add Chennilu
                                                            </Link>
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


export default ProductionDetails;
import React, { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import moment from "moment";

import AddCartonModal from "./components/AddCartonModal";

// datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
    PaginationProvider, PaginationListStandalone,
    SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import "./datatables.scss"
const Cartons = (props) => {
    let { id } = useParams();
    // state
    const [cartons, setCartons] = useState([])
    const [beedi, setBeedi] = useState({})

    const getBeedis = () => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/beedis`)
            .then((res) => {
                setBeedi(res.data)
            })
    }

    // useEffect
    useEffect(() => {
        instance
            .get(`${process.env.REACT_APP_API_URL}/admin/cartons`)
            .then((res) => {
                setCartons(res.data)
            })
        getBeedis()
    }, [])

    const columns = [{
        dataField: 'id',
        text: 'Id',
        sort: true,
    }, {
        dataField: 'uuid',
        text: 'Product',
        formatter: (cell, row) => <Link to={`/products/${row.product.uuid}`}>{row.product.name}</Link>
    },
    {
        dataField: 'beedis',
        text: 'Beedis',
        sort: true
    },
    {
        dataField: 'updatedAt',
        text: 'Updated At',
        sort: true,
        formatter: (cell, row) => 
        <p>{moment(cell).format("DD-MM-YYYY h:mm:ss a")}</p>
    },
    {
        dataField: 'uuid',
        text: 'Options',
        formatter: (cell, row) => <Link to={`/products/cartons/${row.uuid}`}> <button className="btn btn-primary">View Details</button> </Link>,
    }
    ];


    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: cartons.length, // replace later with size(customers),
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
                    <title>Cartons | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Cartons" />

                    <Card>
                        <CardBody>
                            <PaginationProvider
                                pagination={paginationFactory(pageOptions)}
                                keyField='id'
                                columns={columns}
                                data={cartons}
                            >
                                {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                        keyField='id'
                                        columns={columns}
                                        data={cartons}
                                        search
                                    >
                                        {toolkitProps => (
                                            <React.Fragment>
                                                <div>
                                                    {beedi &&
                                                        <Row className="mb-3">
                                                            <Col lg="2" md="4">
                                                                <p className="mb-0">Beedis</p>
                                                                <h4>{beedi.beedi}</h4>
                                                            </Col>
                                                            <Col lg="2" md="4">
                                                                <p className="mb-0">Chat Beedi</p>
                                                                <h4>{beedi.chat_beedi}</h4>
                                                            </Col>
                                                        </Row>
                                                    }
                                                </div>
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
                                                    <Col md="8">
                                                        <div className="d-flex justify-content-end">
                                                            <AddCartonModal />
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


export default Cartons;
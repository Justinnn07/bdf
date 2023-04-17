import React, { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";


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
    // state
    const [products, setProducts] = useState([])

    const GetProducts = () => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/products`)
            .then((res) => {
                setProducts(res.data)
            })
    }

    // useEffect
    useEffect(() => {
        GetProducts()
    }, [])

    const columns = [{
        dataField: 'id',
        text: 'Id',
        sort: true,
    }, 
    {
        dataField: 'name',
        text: 'Name',
        sort: true
    },
    {
        dataField: 'product_code',
        text: 'Product code',
        sort: true
    },
    {
        dataField: 'cartons_count',
        text: 'Cartons',
        sort: true
    },
    
    {
        dataField: 'updatedAt',
        text: 'Updated At',
        sort: true
    },
    {
        dataField: 'uuid',
        text: 'Product',
        formatter: (cell, row) => <Link to={`/products/${row.uuid}`}> <button className="btn btn-primary">View Details</button> </Link>
    },
    ];


    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: products.length, // replace later with size(customers),
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
                    <title>Products | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Products" />

                    <Card>
                        <CardBody>
                            <PaginationProvider
                                pagination={paginationFactory(pageOptions)}
                                keyField='id'
                                columns={columns}
                                data={products}
                            >
                                {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                        keyField='id'
                                        columns={columns}
                                        data={products}
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
                                                    <Col md="8">
                                                        <div className="d-flex justify-content-end">
                                                            <Link
                                                                to={`/products/add`}
                                                                className="btn btn-primary"
                                                            >
                                                             Add Product
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


export default Cartons;
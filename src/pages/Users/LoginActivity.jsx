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
const Index = (props) => {
    // state
    const [users, setUsers] = useState([])

    const GetUsers = () => {
        instance
            .get(`${process.env.REACT_APP_API_URL}/admin/users/login-activity`)
            .then((res) => {
            setUsers(res.data)
            })
    }

    // useEffect
    useEffect(() => {
        GetUsers()
    }, [])

    const columns = [{
        dataField: 'id',
        text: 'Id',
        sort: true,
    },
    {
        dataField: 'admin.full_name',
        text: 'Full name',
        sort: true
    },
    {
        dataField: 'login_time',
        text: 'Login Time',
        sort: true
    },
    {
        dataField: 'createdAt',
        text: 'createdAt',
        sort: true
    },
    {
        dataField: 'updatedAt',
        text: 'Updated At',
        sort: true
    },];


    const defaultSorted = [{
        dataField: 'id',
        order: 'asc'
    }];

    const pageOptions = {
        sizePerPage: 10,
        totalSize: users.length, // replace later with size(customers),
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
                    <title>Users | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Users" />

                    <Card>
                        <CardBody>
                            <PaginationProvider
                                pagination={paginationFactory(pageOptions)}
                                keyField='id'
                                columns={columns}
                                data={users}
                            >
                                {({ paginationProps, paginationTableProps }) => (
                                    <ToolkitProvider
                                        keyField='id'
                                        columns={columns}
                                        data={users}
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
                                                            {/* <AddCartonModal /> */}
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


export default Index;
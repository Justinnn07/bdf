import React, { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody } from "reactstrap";


import InventoryTable from "../tables/InventoryLogs"
import Breadcrumbs from "../../components/Common/Breadcrumb"
// import "./datatables.scss"
const Index = (props) => {
 
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Inventory | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Inventory" />

                    <Card>
                        <CardBody>
                           <InventoryTable />
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}


export default Index;
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
    const [chennilu, setChennilu] = useState([])

    const getChennilu = async () => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/beedis/chennilu/${id}`)
            .then((res) => {
                setChennilu(res.data)
            })
            .catch((err) => {

            })
    }

    // useEffect
    useEffect(() => {
        instance
            .get(`${process.env.REACT_APP_API_URL}/admin/beedis/reported/${id}`)
            .then((res) => {
                setReportedBeedi(res.data)
            })
        getChennilu()
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
                                            <Link to={`/branch/${reportedBeedi.branch.uuid}`}>
                                                {reportedBeedi.branch && reportedBeedi.branch.name}
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
                                        <h6>{reportedBeedi.reported_beedi}</h6>
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
                            <div className="d-flex justify-content-between">
                                <h4 className="mt-3">Chennilu</h4>
                                <div>
                                    <AddChenniluModal
                                        getChennilu={getChennilu}
                                    />
                                </div>
                            </div>

                            <Row>
                                {chennilu.map((row) => <Col className="p-2" md="2">
                                    <div className="bg-white shadow-sm rounded border p-2">
                                        <h5 className="text-center mb-0">{row.beedis}</h5>
                                        <p className="text-center">
                                            serial no: {row.id}
                                        </p>
                                    </div>
                                </Col>
                                )}
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}


export default ReportedBeedi;
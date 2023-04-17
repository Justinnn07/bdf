import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody, Button, Label, Alert } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
const AddBeedis = () => {

    const [selectedBranch, setSelectedBranch] = useState("")
    const [branches, setBranches] = useState([])
    const [status, setStatus] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    // sweet alert states[0:initial, 1:success,2:failed,3:loading]
    const [formStatus, setFormStatus] = useState(0)

    // input
    const [reportedBeedi, setReportedBeedi] = useState(0)
    const [aavakBeedi, setAavakBeedi] = useState(0)
    const [gampaChat, setGampaChat] = useState(0)
    const [peechuBeedi, setPeechuBeedi] = useState(0)

    const submitForm = async () => {
        let data = {
            reported_beedi: reportedBeedi,
            aavak_beedi: aavakBeedi,
            gampa_chat: gampaChat,
            peechu_beedi: peechuBeedi,
            branch_id: selectedBranch
        }
        setFormStatus(3)
        instance.post(`${process.env.REACT_APP_API_URL}/admin/beedis/reported`, data)
            .then((res) => {
                setStatus(1)
                setFormStatus(1)
            })
            .catch((error) => {
                setStatus(2)
                setFormStatus(2)
                setErrorMessage(error.response.data.message)
            })
    }

    // get branches
    useEffect(() => [
        instance
            .get(`${process.env.REACT_APP_API_URL}/list/branch`)
            .then((res) => {
                setBranches(res.data)
            })
    ], [])

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Reported Beedi | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Add Reported Beedi" />
                    {status === 1 &&
                        <Alert color="success">
                            Stock added successfully
                        </Alert>
                    } {status == 2 &&
                        <Alert color="danger">
                            {errorMessage}
                        </Alert>
                    }
                    {/* sweet alert */}
                    {formStatus === 1 || formStatus === 2 ? (
                        <SweetAlert
                            success={formStatus === 1 ? true : false}
                            error={formStatus === 2 ? true : false}
                            title={formStatus === 1 ? `Sucess` : `Failed`}
                            onConfirm={() => {
                                setFormStatus(0)
                            }}
                        >
                            {formStatus === 1 ?
                                `Stock added successfully` :
                                `Something went wrong`
                            }
                        </SweetAlert>
                    ) : null}
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md="4">
                                    <select
                                        className="form-select"
                                        name="branch"
                                        id="branch"
                                        onChange={(e) => setSelectedBranch(e.target.value)}
                                    >
                                        <option value="">Select a branch</option>
                                        {branches.map((branch, key) =>
                                            <option value={branch.uuid}>{branch.name} ({branch.person_name})</option>
                                        )}
                                    </select>
                                </Col>
                                <Col md="12" />
                                <Col md="12" className="mt-3" />
                                <Col md="5" className="mt-2" >
                                    <Label>Reported Beedi</Label>
                                    <input
                                        name="reportedbeedi"
                                        label="Reported Beedi"
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter reported beedi"
                                        min={0}
                                        onChange={(e) => { setReportedBeedi(e.target.value) }}
                                    />
                                </Col>
                                <Col md="5" className="mt-2" >
                                    <Label>Aavak Beedi</Label>
                                    <input
                                        name="aavakbeedi"
                                        label="Aavak Beedi"
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter aavak beedi"
                                        min={0}
                                        onChange={(e) => { setAavakBeedi(e.target.value) }}
                                    />
                                </Col>
                                <Col md="5" className="mt-2" >
                                    <Label>Gampa Chat</Label>
                                    <input
                                        name="gamptachat"
                                        label="Gampa Beedi"
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter gampa beedi"
                                        min={0}
                                        onChange={(e) => { setGampaChat(e.target.value) }}
                                    />
                                </Col>
                                <Col md="5" className="mt-2" >
                                    <Label>Peechu Beedi</Label>
                                    <input
                                        name="peechubeedi"
                                        label="Peechu Beedi"
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter peechu beedi"
                                        min={0}
                                        onChange={(e) => { setPeechuBeedi(e.target.value) }}
                                    />
                                </Col>
                            </Row>
                            <Col className="mt-3" md="12" />
                            {[0, 1, 2].includes(formStatus) ?
                                <button
                                    onClick={submitForm} type="buttton" className="btn btn-primary"
                                >Submit</button>
                                :
                                <button class="btn btn-primary" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                            }
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default AddBeedis;
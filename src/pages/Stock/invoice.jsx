import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Link, useLocation } from "react-router-dom";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import instance from "../../helpers/api/axiosHelper"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Image
import logo from "../../assets/images/logo-dark.png"

//redux


const Invoice = (props) => {
    const [data, setData] = useState(null)
    const search = useLocation().search;
    const id = new URLSearchParams(search).get('id');

    const getSupplierLog = () => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/stock/supplier/${id}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => {
                alert("Something went wrong")
            })
    }
    useEffect(() => {
        getSupplierLog()
    }, [])
    //Print the Invoice
    const printInvoice = () => {
        window.print()
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>
                        Invoice Detail | Skote - React Admin & Dashboard Template
                    </title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Stock" breadcrumbItem="Stock Detail" />
                    {data && <div>
                        <Row>
                            <Col md="4">
                                <h5 className="mb-0">Supplier</h5>
                                <p> { data.supplier ?
                                    <Link to={`/suppliers/${data.supplier.uuid}`}>{data.supplier.name}</Link>
                                    : '--' }
                                </p>
                            </Col>
                            <Col md="4">
                                <h5 className="mb-0">Sale date</h5>
                                <p>{data.sale_date || data.createdAt}</p>
                            </Col>
                            <Col md="4">
                                <h5 className="mb-0">Last updated at</h5>
                                <p>{data.updatedAt}</p>
                            </Col>
                            <Col className="mt-3" md="12">
                                <h3>Stock</h3>
                            </Col>
                            {["leaf", "tobacco_1", "tobacco_2", "tobacco_3", "red_yarn", "jamula_yarn"].map((row, key) =>
                                data[row] != 0 && <Col md="4">
                                    <h5 className="text-capitalize mb-1">{row.replace('_', ' ')}</h5>
                                    <p>{data[row]} {(key === 4 || key === 5) ? 'Ladi' : 'Bags'}</p>
                                </Col>
                            )}
                        </Row>
                        <Row>
                            {data.bags.map((row) => <Col className="p-2" md="2">
                                <div className="bg-white rounded shadow-sm p-2">
                                    <h6 className="text-capitalize text-center mb-1">{row.type.replace('_', ' ')}</h6>
                                    <h5 className="text-center mb-0">{row.weight} kgs</h5>
                                    <p className="text-center text-secondary mb-2">serial no: {row.serial_no}</p>
                                    <p className="text-center">
                                        {row.status === "pending" ? <span class="badge bg-warning text-dark">In Stock</span> :
                                            <span class="badge bg-success">Distributed</span>
                                        }
                                    </p>
                                </div>
                            </Col>
                            )}
                        </Row>

                    </div>}
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Invoice

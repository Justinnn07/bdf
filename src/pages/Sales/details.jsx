import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import instance from "../../helpers/api/axiosHelper"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap"
import { isEmpty, map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Image
import logo from "../../assets/images/logo-dark.png"
import moment from "moment"

const Index = props => {
  const { id } = props.match.params

  const [invoiceDetail, setInvoiceDetail] = useState({})
  const [products, setProducts] = useState([])

  //Print the Invoice
  const printInvoice = () => {
    window.print()
  }

  useEffect(async () => {
    await instance
      .get(`${process.env.REACT_APP_API_URL}/admin/sales/${id}`)
      .then(res => {
        setInvoiceDetail(res.data)
      })
    await instance
      .get(`${process.env.REACT_APP_API_URL}/list/product`)
      .then(res => {
        setProducts(res.data)
      })
  }, [])

  //   sample data
  //   {"id":3,"uuid":"a1d52a24-d3a7-44d4-b035-70a6ea6b542e","invoice_no":"12","invoice_date":"2021-11-10T00:00:00.000Z","reverse_charge":true,"date_of_supply":"2021-11-12T00:00:00.000Z","place_of_supply":"none","state":"none","billing_address_name":"none","billing_address":"none","billing_address_city":"none","billing_address_state":"none","billing_address_pincode":"none","shipping_address_name":"none","shipping_address":"none","shipping_address_city":"none","shipping_address_state":"none","shipping_address_pincode":"none","customer_gstin":"none","transport_mode":"rtc","driver_name":"none","driver_mobile":"none","vehicle_no":"none","parcel_no":"none","total_quantity":3,"total_amount":"30000.00","total_discount":"10000.00","cgst_amount":"3600.00","sgst_amount":"3600.00","igst_amount":"0.00","cgst_percentage":0,"sgst_percentage":0,"igst_percentage":0,"gst_reverse_charge":null,"total_amount_after_tax":"27200.00","distributor_id":null,"agent_id":null,"products":[{"id":"","quantity":"3","price":"10000","discount_percentage":"1","cgst_percentage":"12","sgst_percentage":"12","igst_percentage":"0"}],"createdAt":"2021-11-30T10:43:06.730Z","updatedAt":"2021-11-30T10:43:06.730Z","deletedAt":null}

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
          <Breadcrumbs title="Invoices" breadcrumbItem="Invoice Detail" />
          {!isEmpty(invoiceDetail) && (
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <div className="invoice-title">
                      <h4 className="float-end font-size-16">
                        Order # {invoiceDetail.id}
                      </h4>
                      <div className="mb-4">
                        <h4>Uttam Beedi Factory</h4>
                      </div>
                    </div>
                    <hr />
                    <Row>
                      <Col xs="6">
                        <address>
                          <strong>Billed To:</strong>
                          <br />
                          <p className="mb-0">
                            {invoiceDetail?.billing_address_name} <br />
                            {invoiceDetail?.billing_address}
                            {invoiceDetail?.billing_address_city}
                            {invoiceDetail?.billing_address_state} <br />
                            <b>Pincode: </b>{" "}
                            {invoiceDetail?.billing_address_pincode}
                          </p>
                        </address>
                      </Col>
                      <Col xs="6" className="text-end">
                        <address>
                          <strong>Shipped To:</strong>
                          <br />
                          <br />
                          <p className="mb-0">
                            {invoiceDetail?.shipping_address_name} <br />
                            {invoiceDetail?.shipping_address}
                            {invoiceDetail?.shipping_address_city}
                            {invoiceDetail?.shipping_address_state} <br />
                            <b>Pincode: </b>{" "}
                            {invoiceDetail?.shipping_address_pincode}
                          </p>
                        </address>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6" className="mt-3"></Col>
                      <Col xs="6" className="mt-3 text-end">
                        <address>
                          <strong>Order Date:</strong>
                          <br />
                          {moment(invoiceDetail?.invoice_date).format(
                            "DD-MM-YYYY"
                          )}
                          <br />
                          <br />
                        </address>
                      </Col>
                    </Row>
                    <div className="py-2 mt-3">
                      <h3 className="font-size-15 fw-bold">Order summary</h3>
                    </div>
                    <div className="table-responsive">
                      <Table className="table-nowrap">
                        <thead>
                          <tr>
                            <th style={{ width: "70px" }}>No.</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>discount (%)</th>
                            <th>cgst (%) </th>
                            <th>sgst (%) </th>
                            <th>igst (%)</th>
                            <th className="text-end">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceDetail?.products.map((product, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {console.log(product)}
                                {
                                  products.filter(
                                    item => item.id == product.id
                                  )[0]?.name
                                }
                              </td>
                              <td>{product.quantity}</td>
                                <td>{product.discount_percentage}</td>
                                <td>{product.cgst_percentage}</td>
                                <td>{product.sgst_percentage}</td>
                                <td>{product.igst_percentage}</td>
                              <td className="text-end">{product.price}</td>
                              <td></td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="2" className="text-end">
                              Total Amount
                            </td>
                            <td className="text-end">
                              {invoiceDetail?.total_amount}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="border-0 text-end">
                              <strong>Total Tax Amount</strong>
                            </td>
                            <td className="border-0 text-end">
                              {invoiceDetail?.total_amount_after_tax - invoiceDetail?.total_amount}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="border-0 text-end">
                                <strong>Discount</strong>
                            </td>
                            <td className="border-0 text-end">
                                {invoiceDetail?.total_discount}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" className="border-0 text-end">
                              <strong>Total Amount After Tax</strong>
                            </td>
                            <td className="border-0 text-end">
                              <h4 className="m-0">
                                {invoiceDetail?.total_amount_after_tax - invoiceDetail?.total_discount}
                              </h4>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="d-print-none">
                      <div className="float-end">
                        <Link
                          to="#"
                          onClick={printInvoice}
                          className="btn btn-success  me-2"
                        >
                          <i className="fa fa-print" />
                        </Link>
                        <Link to="#" className="btn btn-primary w-md ">
                          Send
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index

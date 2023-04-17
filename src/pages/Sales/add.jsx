import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Card, CardBody, Button, Form, Alert } from "reactstrap"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
import { getProducts } from "helpers/fakebackend_helper"

const schema = yup.object().shape({})

const Index = props => {
  //   state
  const [productCount, setProductCount] = useState([1])
  const [products, setProducts] = useState([])

  // refs
  const FormElement = useRef(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")
  const [formStatus, setFormStatus] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const getProducts = async () => {
    await instance
      .get(`${process.env.REACT_APP_API_URL}/admin/products`)
      .then(res => {
        setProducts(res.data)
      })
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  useEffect(() => {
    getProducts()
  }, [])

  const onSubmit = (data, e) => {
    // let data = formData;
    instance
      .post(`${process.env.REACT_APP_API_URL}/admin/sales`, data)
      .then(res => {
        setIsSuccess(true)
        e.target.reset()
        setFormStatus(1)
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          setErrorResponse(err.response.data)
          setFormStatus(2)
        }
      })
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Add Sale</title>
        </MetaTags>
        <Container fluid>
          {isSuccess && (
            <Alert color="success">Sale created successfully</Alert>
          )}
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
              {formStatus === 1
                ? `Sale created successfully`
                : `Something went wrong`}
            </SweetAlert>
          ) : null}

          {/* form json data
    {
            invoice_date,
            reverse_charge,
            date_of_supply,
            place_of_supply,
            state,
            // billing details
            billing_address_name,
            billing_address,
            billing_address_city,
            billing_address_state,
            billing_address_pincode,
            // shipping details
            shipping_address_name,
            shipping_address,
            shipping_address_city,
            shipping_address_state,
            shipping_address_pincode,
            // gstin
            customer_gstin,
            // transport details
            transport_mode,
            driver_name,
            driver_mobile,
            vehicle_no,
            parcel_no,
            discount,
            // gst
            cgst_percentage,
            sgst_percentage,
            igst_percentage,
            // associations
            distributor_id,
            agent_id,
            // products
            products
        }
    */}
          <Card>
            <CardBody>
              <h4>Add Sale</h4>
              <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
                {/* invoice_no */}
                <div className="form-group">
                    <label>Invoice No</label>
                    <input
                        type="text"
                        name="invoice_no"
                        className="form-control"
                        placeholder="Invoice No"
                        {...register("invoice_no")}
                    />
                </div>
                <div className="form-group">
                  <label htmlFor="invoice_date">Invoice Date</label>
                  <input
                    type="date"
                    name="invoice_date"
                    {...register("invoice_date")}
                    className="form-control"
                    placeholder="Invoice Date"
                  />
                </div>
                {/* add inputs for remaining data */}
                <div className="form-group">
                  <label htmlFor="reverse_charge">Reverse Charge</label>
                  {/* boolean input */}
                    <select
                        name="reverse_charge"
                        {...register("reverse_charge")}
                        className="form-control"
                        >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <div className="form-group">
                  <label htmlFor="date_of_supply">Date of Supply</label>
                  <input
                    type="date"
                    name="date_of_supply"
                    {...register("date_of_supply")}
                    className="form-control"
                    placeholder="Date of Supply"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="place_of_supply">Place of Supply</label>
                  <input
                    type="text"
                    name="place_of_supply"
                    {...register("place_of_supply")}
                    className="form-control"
                    placeholder="Place of Supply"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    {...register("state")}
                    className="form-control"
                    placeholder="State"
                  />
                </div>
                {/* billing details */}
                <h4 className="mt-3">Billing details</h4>
                <div className="form-group">
                  <label htmlFor="billing_address_name">
                    Billing Address Name
                  </label>
                  <input
                    type="text"
                    name="billing_address_name"
                    {...register("billing_address_name")}
                    className="form-control"
                    placeholder="Billing Address Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billing_address">Billing Address</label>
                  <input
                    type="text"
                    name="billing_address"
                    {...register("billing_address")}
                    className="form-control"
                    placeholder="Billing Address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billing_address_city">
                    Billing Address City
                  </label>
                  <input
                    type="text"
                    name="billing_address_city"
                    {...register("billing_address_city")}
                    className="form-control"
                    placeholder="Billing Address City"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billing_address_state">
                    Billing Address State
                  </label>
                  <input
                    type="text"
                    name="billing_address_state"
                    {...register("billing_address_state")}
                    className="form-control"
                    placeholder="Billing Address State"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="billing_address_pincode">
                    Billing Address Pincode
                  </label>
                  <input
                    type="text"
                    name="billing_address_pincode"
                    {...register("billing_address_pincode")}
                    className="form-control"
                    placeholder="Billing Address Pincode"
                  />
                </div>
                {/* Shipping details */}
                <h4 className="mt-3">Shipping details</h4>
                <div className="form-group">
                  <label htmlFor="shipping_address_name">
                    Shipping Address Name
                  </label>
                  <input
                    type="text"
                    name="shipping_address_name"
                    {...register("shipping_address_name")}
                    className="form-control"
                    placeholder="Shipping Address Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shipping_address">Shipping Address</label>
                  <input
                    type="text"
                    name="shipping_address"
                    {...register("shipping_address")}
                    className="form-control"
                    placeholder="Shipping Address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shipping_address_city">
                    Shipping Address City
                  </label>
                  <input
                    type="text"
                    name="shipping_address_city"
                    {...register("shipping_address_city")}
                    className="form-control"
                    placeholder="Shipping Address City"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shipping_address_state">
                    Shipping Address State
                  </label>
                  <input
                    type="text"
                    name="shipping_address_state"
                    {...register("shipping_address_state")}
                    className="form-control"
                    placeholder="Shipping Address State"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shipping_address_pincode">
                    Shipping Address Pincode
                  </label>
                  <input
                    type="text"
                    name="shipping_address_pincode"
                    {...register("shipping_address_pincode")}
                    className="form-control"
                    placeholder="Shipping Address Pincode"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="customer_gstin">Customer GSTIN</label>
                  <input
                    type="text"
                    name="customer_gstin"
                    {...register("customer_gstin")}
                    className="form-control"
                    placeholder="Customer GSTIN"
                  />
                </div>
                <h4 className="mt-3">Transport Details</h4>
                <div className="form-group">
                  <label htmlFor="transport_mode">Transport Mode</label>
                  <select
                    name="transport_mode"
                    {...register("transport_mode")}
                    className="form-control"
                  >
                    <option value="rtc">RTC</option>
                    <option value="parcel">Parcel</option>
                  </select>
                </div>
                {/* driver name as in json */}
                <div className="form-group">
                  <label htmlFor="driver_name">Driver Name</label>
                  <input
                    type="text"
                    name="driver_name"
                    {...register("driver_name")}
                    className="form-control"
                    placeholder="Driver Name"
                  />
                </div>
                {/* driver mobile as in json */}
                <div className="form-group">
                  <label htmlFor="driver_mobile">Driver Mobile</label>
                  <input
                    type="text"
                    name="driver_mobile"
                    {...register("driver_mobile")}
                    className="form-control"
                    placeholder="Driver Mobile"
                  />
                </div>
                {/* vehicle_no */}
                <div className="form-group">
                  <label htmlFor="vehicle_no">Vehicle No</label>
                  <input
                    type="text"
                    name="vehicle_no"
                    {...register("vehicle_no")}
                    className="form-control"
                    placeholder="Vehicle No"
                  />
                </div>
                {/* parcel_no */}
                <div className="form-group">
                  <label htmlFor="parcel_no">Parcel No</label>
                  <input
                    type="text"
                    name="parcel_no"
                    {...register("parcel_no")}
                    className="form-control"
                    placeholder="Parcel No"
                  />
                </div>
                {/* Json div for products */}

                <div>
                  <div className="d-flex justify-content-between py-3">
                    <h4 className="mt-3">Products</h4>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          setProductCount(productCount.concat([1]))
                        }}
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                  {productCount.map((product, id) => (
                    <div className="row" key={id}>
                      {/* select product in dropdown */}
                      <div className="col-md-3 form-group">
                        <label htmlFor="product_name">Product Name</label>
                        <select
                          name="product_name"
                          {...register(`products[${id}].id`)}
                          className="form-control"
                        >
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* product quantity */}
                      <div className="col-md-2 form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          {...register(`products[${id}].quantity`)}
                          className="form-control"
                          placeholder="Quantity"
                        />
                      </div>
                      {/* product price */}
                      <div className="col-md-2 form-group">
                        <label htmlFor="price">Price</label>
                        <input
                          type="number"
                          name="price"
                          {...register(`products[${id}].price`)}
                          className="form-control"
                          placeholder="Price"
                        />
                      </div>
                      {/* product discount */}
                      <div className="col-md-2 form-group">
                        <label htmlFor="discount">Discount</label>
                        <input
                          type="number"
                          name="discount"
                          {...register(`products[${id}].discount_percentage`)}
                          className="form-control"
                          placeholder="Discount"
                        />
                      </div>
                      <div className="col-md-1 form-group">
                        <label htmlFor="cgst_percentage">CGST %</label>
                        <input
                          type="number"
                          name="cgst_percentage"
                          {...register(`products[${id}].cgst_percentage`)}
                          className="form-control"
                          placeholder="CGST %"
                        />
                      </div>
                      <div className="col-md-1 form-group">
                        <label htmlFor="sgst_percentage">SGST %</label>
                        <input
                          type="number"
                          name="sgst_percentage"
                          {...register(`products[${id}].sgst_percentage`)}
                          className="form-control"
                          placeholder="SGST %"
                        />
                      </div>
                      <div className="col-md-1 form-group">
                        <label htmlFor="igst_percentage">IGST %</label>
                        <input
                          type="number"
                          name="igst_percentage"
                          {...register(`products[${id}].igst_percentage`)}
                          className="form-control"
                          placeholder="IGST %"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  {[0, 1, 2].includes(formStatus) ? (
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  ) : (
                    <button class="btn btn-primary" type="button" disabled>
                      <span
                        class="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </button>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index

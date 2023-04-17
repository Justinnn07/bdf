import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Form, Row, Col, Label, Alert } from "reactstrap"


// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"

const addStock = () => {

    // state
    const [suppliers, setSuppliers] = useState([])
    const [supplier, setSupplier] = useState("")
    const [values, setValues] = useState([
        { name: "leaf",        displayName: "leaf",        supplier_type: "leaf", hsn_code: "", lot_no: "", price: 0, bags: 0, },
        { name: "tobacco_1",   displayName: "Nipali",   supplier_type: "tobacco",hsn_code: "", lot_no: "", price: 0, bags: 0, },
        { name: "tobacco_2",   displayName: "Alina",   supplier_type: "tobacco",hsn_code: "", lot_no: "", price: 0, bags: 0, },
        { name: "tobacco_3",   displayName: "Gujarat 2",   supplier_type: "tobacco",hsn_code: "", lot_no: "", price: 0, bags: 0, },
        { name: "red_yarn",    displayName: "red_yarn",    supplier_type: "yarn",hsn_code: "", lot_no: "", price: 0, bags: 0, },
        { name: "jamula_yarn", displayName: "jamula_yarn", supplier_type: "yarn",hsn_code: "", lot_no: "", price: 0, bags: 0, },
        // wrapper
        { name: "wrapper_p_10",    name: "wrapper_p_10",     supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        { name: "wrapper_uttam_15",name: "wrapper_uttam_15", supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        { name: "wrapper_uttam_20",name: "wrapper_uttam_20", supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        { name: "wrapper_vinay",   name: "wrapper_vinay",    supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        { name: "wrapper_vajram",  name: "wrapper_vajram",   supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        // zilli
        { name: "zilli_p_10",    name: "zilli_p_10",     supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        { name: "zilli_uttam_15",name: "zilli_uttam_15", supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        { name: "zilli_uttam_20",name: "zilli_uttam_20", supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        { name: "zilli_vinay",   name: "zilli_vinay",    supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },
        { name: "zilli_vajram",  name: "zilli_vajram",   supplier_type: "wrapper", hsn_code: "", lot_no: "", price: 0, bags: 0 },

    ])
    const [bags, setBags] = useState([])
    const [sgst, setSgst] = useState(0)
    const [cgst, setCgst] = useState(0)
    const [igst, setIgst] = useState(0)
    const [transportType, setTransportType] = useState("rtc")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [transportName, setTransportName] = useState("")
    const [vehicleNumber, setVehicleNumber] = useState("")
    const [parcelNo, setParcelNo] = useState("")
    const [status, setStatus] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    // sweet alert states[0:initial, 1:success,2:failed,3:loading]
    const [formStatus, setFormStatus] = useState(0)

    const changeSupplier = (e) => {
        suppliers.map((row, key) => {
            if (row.uuid === e) {
                setSupplier(row)
            }
        })
    }

    const changeValues = (type, key, value) => {
        let newValues = values.filter((row) => {
            if (row.name === type) {
                row[key] = value
            }
            return row
        })
        setValues(newValues)
        let leaf_price = newValues[0].bags * newValues[0].price || 0
        let tobacco_1_price = newValues[1].bags * newValues[1].price || 0
        let tobacco_2_price = newValues[2].bags * newValues[2].price || 0
        let tobacco_3_price = newValues[3].bags * newValues[3].price || 0
        let rYarn_price = newValues[4].bags * newValues[4].price || 0
        let jYarn_price = newValues[5].bags * newValues[5].price || 0
        // wrapper
        let wrapper_p10_price = newValues[6].bags * newValues[6].price || 0
        let wrapper_u15_price = newValues[7].bags * newValues[7].price || 0
        let wrapper_u20_price = newValues[8].bags * newValues[8].price || 0
        let wrapper_vinay_price = newValues[9].bags * newValues[9].price || 0
        let wrapper_vajram_price = newValues[10].bags * newValues[10].price || 0
        // 
        let zilli_p10_price = newValues[11].bags * newValues[11].price || 0
        let zilli_u15_price = newValues[12].bags * newValues[12].price || 0
        let zilli_u20_price = newValues[13].bags * newValues[13].price || 0
        let zilli_vinay_price = newValues[14].bags * newValues[14].price || 0
        let zilli_vajram_price = newValues[15].bags * newValues[15].price || 0

        let totalAmountElement = document.getElementById('total-amount')
        let totalAmount = 0

        // bags calculator
        let newBags = []
        if (supplier.type === "leaf") {
            document.getElementById(`total_leaf`).value = leaf_price
            totalAmount = leaf_price
            // bags
            for (let i = 0; i < newValues[0].bags; i++) {
                newBags.push({
                    "type": "leaf",
                    "weight": 0
                })
            }
        } else if (supplier.type === "tobacco") {
            document.getElementById(`total_tobacco_1`).value = tobacco_1_price
            document.getElementById(`total_tobacco_2`).value = tobacco_2_price
            document.getElementById(`total_tobacco_3`).value = tobacco_3_price
            totalAmount = tobacco_1_price + tobacco_2_price + tobacco_3_price
            for (let i = 0; i < newValues[1].bags; i++) {
                newBags.push({
                    "type": "tobacco_1",
                    "weight": 0
                })
            } for (let i = 0; i < newValues[2].bags; i++) {
                newBags.push({
                    "type": "tobacco_2",
                    "weight": 0
                })
            } for (let i = 0; i < newValues[3].bags; i++) {
                newBags.push({
                    "type": "tobacco_3",
                    "weight": 0
                })
            }
        } else if (supplier.type === "yarn") {
            document.getElementById(`total_red_yarn`).value = rYarn_price
            document.getElementById(`total_jamula_yarn`).value = jYarn_price
            totalAmount = rYarn_price + jYarn_price
        } else if (supplier.type === "wrapper") {
            document.getElementById(`total_wrapper_p_10`).value = wrapper_p10_price
            document.getElementById(`total_wrapper_uttam_15`).value = wrapper_u15_price
            document.getElementById(`total_wrapper_uttam_20`).value = wrapper_u20_price
            document.getElementById(`total_wrapper_vinay`).value = wrapper_vinay_price
            document.getElementById(`total_wrapper_vajram`).value = wrapper_vajram_price

            document.getElementById(`total_zilli_p_10`).value = zilli_p10_price
            document.getElementById(`total_zilli_uttam_15`).value = zilli_u15_price
            document.getElementById(`total_zilli_uttam_20`).value = zilli_u20_price
            document.getElementById(`total_zilli_vinay`).value = zilli_vinay_price
            document.getElementById(`total_zilli_vajram`).value = zilli_vajram_price
            totalAmount = wrapper_p10_price, wrapper_u15_price, wrapper_u20_price, wrapper_vinay_price, wrapper_vajram_price +
                zilli_p10_price + zilli_u15_price + zilli_u20_price + zilli_vinay_price + zilli_vajram_price
        }
        let sgstAmount = totalAmount * (sgst / 100)
        let csgstAmount = totalAmount * (cgst / 100)
        let igstAmount = totalAmount * (igst / 100)
        totalAmount = totalAmount + sgstAmount + csgstAmount + igstAmount
        totalAmountElement.innerHTML = totalAmount
        if(type) {
            setBags(newBags)
        }
    }

    const changeWeightOfBag = (weight, e) => {
        let newBags = bags.map((bag,key)=> {
            if(key === e) {
                bag.weight = parseInt(weight)
            }
            return bag
        })
        setBags(newBags)
    }

    const onSubmit = () => {
        console.log(bags)
        let data = {
            sgst, cgst, igst,
            leaf:        parseInt(values[0].bags) || 0,
            tobacco_1:   parseInt(values[1].bags) || 0, 
            tobacco_2:   parseInt(values[2].bags) || 0, 
            tobacco_3:   parseInt(values[3].bags) || 0, 
            red_yarn:    parseInt(values[4].bags) || 0, 
            jamula_yarn: parseInt(values[5].bags) || 0, 

            wrapper_p_10:     parseInt(values[6].bags  || 0), 
            wrapper_uttam_15: parseInt(values[7].bags  || 0), 
            wrapper_uttam_20: parseInt(values[8].bags  || 0), 
            wrapper_vinay:    parseInt(values[9].bags  || 0), 
            wrapper_vajram:   parseInt(values[10].bags || 0), 

            zilli_p_10:     parseInt(values[11].bags || 0), 
            zilli_uttam_15: parseInt(values[12].bags || 0), 
            zilli_uttam_20: parseInt(values[13].bags || 0), 
            zilli_vinay:    parseInt(values[14].bags || 0), 
            zilli_vajram:   parseInt(values[15].bags || 0), 

            meta: values,
            "transportation_type": transportType,
            from, to,
            "transport_name": transportName,
            "vehicle_no": vehicleNumber,
            "parcel_no": parcelNo,
            "supplier_id": supplier.uuid,
            bags:  bags
        }
        setFormStatus(3)
        instance.post(`${process.env.REACT_APP_API_URL}/admin/stock`, data)
            .then((res) => {
                setStatus(1)
                setFormStatus(1)
            })
            .catch((error) => {
                setStatus(2)
                setErrorMessage(error.response.data.message)
                setFormStatus(2)
            })
    }

    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/list/supplier`)
            .then((res) => {
                setSuppliers(res.data)
            })
            .catch((erorr) => {

            })
    }, [])

    return (<React.Fragment>
        <div className="page-content">
            <MetaTags>
                <title>Stock | Admin</title>
            </MetaTags>
            <Container fluid>
                <div className="bg-white p-3">
                    <h4>Add Stock</h4>
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
                    <div
                    >
                        {/* Supplier type */}
                        <Row>
                            <Col lg="4" md="6">
                                <Label>Supplier</Label>
                                <select
                                    name="supplier"
                                    label="supplier"
                                    className="form-select"
                                    onChange={(e) => changeSupplier(e.target.value)}
                                >
                                    <option value="">Select a supplier</option>
                                    {suppliers.map((row, key) =>
                                        <option value={row.uuid}>{row.name}</option>
                                    )}
                                </select>
                            </Col>
                        </Row>
                        {/* Form */}
                        {supplier.type &&
                            <Row className="mt-2">
                                {/* Supplier details */}
                                <Row>
                                    <Col md="4">
                                        <p><b>Type:</b> {supplier.type}</p>
                                    </Col>
                                    <Col md="4">
                                        <p><b>Business name:</b> {supplier.name}</p>
                                    </Col>
                                    <Col md="4">
                                        <p><b>Owner Name:</b> {supplier.owner_name}</p>
                                    </Col>
                                </Row>
                                {/* stock */}
                                {supplier.type == "leaf" &&
                                    <Row className="mt-3">
                                        <div className="col-12">
                                            <h4>{supplier.type}</h4>
                                        </div>
                                        <Col lg="2">
                                            <Label>Bags / Cartons</Label>
                                            <input
                                                name="bags"
                                                label="Bags"
                                                type="number"
                                                className="form-control"
                                                placeholder={`Enter number of bags`}
                                                defaultValue={0}
                                                onChange={(e) => changeValues(supplier.type, "bags", e.target.value)}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <Label>HSN Code</Label>
                                            <input
                                                name="hsn_code"
                                                label="HSN Code"
                                                type="text"
                                                className="form-control"
                                                placeholder="HSN Code"
                                                onChange={(e) => changeValues(supplier.type, "hsn_code", e.target.value)}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <Label>Lot No</Label>
                                            <input
                                                name="lot_no"
                                                label="Lot No"
                                                type="text"
                                                className="form-control"
                                                placeholder="Lot No"
                                                onChange={(e) => changeValues(supplier.type, "lot_no", e.target.value)}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <Label>Price</Label>
                                            <input
                                                name="price"
                                                label="Price"
                                                type="number"
                                                className="form-control"
                                                placeholder="Price"
                                                onChange={(e) => changeValues(supplier.type, "price", e.target.value)}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <Label>Total Amount</Label>
                                            <input
                                                id={`total_${supplier.type}`}
                                                name="amount"
                                                label="amount"
                                                type="number"
                                                className="form-control"
                                                placeholder="Total Amount"
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                }
                                {supplier.type == "tobacco" &&
                                    ["tobacco_1", "tobacco_2", "tobacco_3"].map((row, key) =>
                                        <Row className="mt-3">
                                            <div className="col-12">
                                                <h4>{
                                                row === "tobacco_1" ? "Nipali" : 
                                                row === "tobacco_2" ? "Alina" :
                                                row === "tobacco_3" ? "Gujarat 2" : `` 
                                                }</h4>
                                            </div>
                                            <Col lg="2">
                                                <Label>Bags / Cartons</Label>
                                                <input
                                                    name="bags"
                                                    label="Bags"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder={`Enter number of bags`}
                                                    defaultValue={0}
                                                    onChange={(e) => changeValues(row, "bags", e.target.value)}
                                                />
                                            </Col>
                                            <Col lg="2">
                                                <Label>HSN Code</Label>
                                                <input
                                                    name="hsn_code"
                                                    label="HSN Code"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="HSN Code"
                                                    onChange={(e) => changeValues(row, "hsn_code", e.target.value)}
                                                />
                                            </Col>
                                            <Col lg="2">
                                                <Label>Lot No</Label>
                                                <input
                                                    name="lot_no"
                                                    label="Lot No"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Lot No"
                                                    onChange={(e) => changeValues(row, "lot_no", e.target.value)}
                                                />
                                            </Col>
                                            <Col lg="2">
                                                <Label>Price</Label>
                                                <input
                                                    name="price"
                                                    label="Price"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Price"
                                                    onChange={(e) => changeValues(row, "price", e.target.value)}
                                                />
                                            </Col>
                                            <Col lg="2">
                                                <Label>Total Amount</Label>
                                                <input
                                                    id={`total_${row}`}
                                                    name="amount"
                                                    label="amount"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Total Amount"
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                                {supplier.type === "yarn" && ["red_yarn", "jamula_yarn"].map((row, key) =>
                                    <Row className="mt-3">
                                        <div className="col-12">
                                            <h4>{row === "red_yarn" ? "Red Yarn" : "Jamula yarn"}</h4>
                                        </div>
                                        <Col lg="2">
                                            <Label>Bags / Cartons</Label>
                                            <input
                                                name="bags"
                                                label="Bags"
                                                type="number"
                                                className="form-control"
                                                placeholder={`Enter number of bags`}
                                                defaultValue={0}
                                                onChange={(e) => changeValues(row, "bags", e.target.value)}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <Label>HSN Code</Label>
                                            <input
                                                name="hsn_code"
                                                label="HSN Code"
                                                type="text"
                                                className="form-control"
                                                placeholder="HSN Code"
                                                onChange={(e) => changeValues(row, "hsn_code", e.target.value)}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <Label>Lot No</Label>
                                            <input
                                                name="lot_no"
                                                label="Lot No"
                                                type="text"
                                                className="form-control"
                                                placeholder="Lot No"
                                                onChange={(e) => changeValues(row, "lot_no", e.target.value)}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <Label>Price</Label>
                                            <input
                                                name="price"
                                                label="Price"
                                                type="number"
                                                className="form-control"
                                                placeholder="Price"
                                                onChange={(e) => changeValues(row, "price", e.target.value)}
                                            />
                                        </Col>
                                        <Col lg="2">
                                            <Label>Total Amount</Label>
                                            <input
                                                id={`total_${row}`}
                                                name="amount"
                                                label="amount"
                                                type="number"
                                                className="form-control"
                                                placeholder="Total Amount"
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                )}
                                {supplier.type == "wrapper" &&
                                    values.filter(value => value.supplier_type == "wrapper").map((row, key) =>
                                        <Row className="mt-3">
                                            <div className="col-12">
                                                <h4>{row.name}</h4>
                                            </div>
                                            <Col lg="2">
                                                <Label>Bags / Cartons</Label>
                                                <input
                                                    name="bags"
                                                    label="Bags"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder={`Enter number of bags`}
                                                    defaultValue={0}
                                                    onChange={(e) => changeValues(row.name, "bags", e.target.value)}
                                                />
                                            </Col>
                                            <Col lg="2">
                                                <Label>HSN Code</Label>
                                                <input
                                                    name="hsn_code"
                                                    label="HSN Code"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="HSN Code"
                                                    onChange={(e) => changeValues(row.name, "hsn_code", e.target.value)}
                                                />
                                            </Col>
                                            <Col lg="2">
                                                <Label>Lot No</Label>
                                                <input
                                                    name="lot_no"
                                                    label="Lot No"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Lot No"
                                                    onChange={(e) => changeValues(row.name, "lot_no", e.target.value)}
                                                />
                                            </Col>
                                            <Col lg="2">
                                                <Label>Price</Label>
                                                <input
                                                    name="price"
                                                    label="Price"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Price"
                                                    onChange={(e) => changeValues(row.name, "price", e.target.value)}
                                                />
                                            </Col>
                                            <Col lg="2">
                                                <Label>Total Amount</Label>
                                                <input
                                                    id={`total_${row.name}`}
                                                    name="amount"
                                                    label="amount"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Total Amount"
                                                    disabled
                                                />
                                            </Col>
                                        </Row>
                                    )
                                }
                                <h5 className="mt-4">Bags</h5>
                                {bags.map((row, key) =>
                                    <Row className="mt-1">
                                        <Col className="mt-3">
                                            <Label>Type</Label>
                                            <input
                                                name="Type"
                                                label="Type"
                                                type="text"
                                                className="form-control"
                                                placeholder="Type"
                                                defaultValue={
                                                    row.type === "tobacco_1" ? "Nipali" :
                                                    row.type === "tobacco_2" ? "Alina" :
                                                    row.type === "tobacco_3" ? "Gujarat 2" : 
                                                    row.type 
                                                }
                                                disabled
                                            />
                                        </Col>
                                        <Col className="mt-3">
                                            <Label>Weight</Label>
                                            <input
                                                name="Type"
                                                label="Type"
                                                type="number"
                                                className="form-control"
                                                placeholder="Type"
                                                defaultValue={row.weight}
                                                onChange={(e)=> {changeWeightOfBag(e.target.value, key)}}
                                            />
                                        </Col>
                                    </Row>
                                )}
                                <h5 className="mt-4">GST details</h5>
                                <Row className="mt-1">
                                    <Col md="4">
                                        <Label>SGST (%)</Label>
                                        <input
                                            name="SGST"
                                            label="SGST"
                                            type="number"
                                            className="form-control"
                                            placeholder="SGST"
                                            defaultValue={0}
                                            onChange={(e) => { setSgst(e.target.value); changeValues() }}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Label>CGST (%)</Label>
                                        <input
                                            name="CGST"
                                            label="CGST"
                                            type="number"
                                            className="form-control"
                                            placeholder="v"
                                            defaultValue={0}
                                            onChange={(e) => { setCgst(e.target.value); changeValues() }}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Label>IGST (%)</Label>
                                        <input
                                            name="IGST"
                                            label="IGST"
                                            type="number"
                                            className="form-control"
                                            placeholder="IGST"
                                            defaultValue={0}
                                            onChange={(e) => { setIgst(e.target.value); changeValues() }}
                                        />
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-end mt-2">
                                    <h5 className="me-4"><b>Total:</b> ₹ <span id="total-amount"></span></h5>
                                </div>
                                <h4 className="mt-4">Transport details</h4>
                                <Col md="4">
                                    <Label>Transportation Type</Label>
                                    <select
                                        className="form-select"
                                        name="transportation_type"
                                        onChange={(e) => setTransportType(e.target.value)}
                                    >
                                        <option value="rtc">RTC</option>
                                        <option value="cargo">Cargo</option>
                                    </select>
                                </Col>
                                <Col md="4">
                                    <Label>From</Label>
                                    <input
                                        className="form-control"
                                        name="from"
                                        placeholder="From"
                                        onChange={(e) => setFrom(e.target.value)}
                                    />
                                </Col>
                                <Col md="4">
                                    <Label>To</Label>
                                    <input
                                        className="form-control"
                                        name="to"
                                        placeholder="To"
                                        onChange={(e) => setTo(e.target.value)}
                                    />
                                </Col>
                                <div className="mt-2"></div>
                                <Col md="4">
                                    <Label>Transportation Name</Label>
                                    <input
                                        className="form-control"
                                        name="transport_name"
                                        placeholder="Enter transportation name"
                                        onChange={(e) => setTransportName(e.target.value)}
                                    />
                                </Col>
                                <Col md="4">
                                    <Label>Vehicle Number</Label>
                                    <input
                                        className="form-control"
                                        name="vehicle_no"
                                        placeholder="Enter vehicle number"
                                        onChange={(e) => setVehicleNumber(e.target.value)}
                                    />
                                </Col>
                                <Col md="4">
                                    <Label>Parcel Number</Label>
                                    <input
                                        className="form-control"
                                        name="parcel_no"
                                        placeholder="Enter parcel number"
                                        onChange={(e) => setParcelNo(e.target.value)}
                                    />
                                </Col>
                                <div className="mt-2"></div>
                                <Col md="4">
                                    <Label>Driver Name</Label>
                                    <input
                                        className="form-control"
                                        name="driver_name"
                                        placeholder="Enter Driver Name"
                                    />
                                </Col>
                                <Col md="4">
                                    <Label>Driver Mobile Number</Label>
                                    <input
                                        className="form-control"
                                        name="driver_number"
                                        placeholder="Enter Mobile Number"
                                    />
                                </Col>
                                <br />
                                <div className="mt-2">
                                    {[0, 1, 2].includes(formStatus) ?
                                        <button
                                            onClick={onSubmit} type="buttton" className="btn btn-primary"
                                        >Submit</button>
                                        :
                                        <button class="btn btn-primary" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    }
                                </div>
                            </Row>}
                    </div>
                </div>
            </Container>
        </div>
    </React.Fragment>
    )
}

export default addStock;
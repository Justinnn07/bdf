import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody, Label, Button, Alert } from "reactstrap"
import SupplierStockLogs from "./components/supplierStockLogs"
import BranchStockLogs from "./components/branchStockLogs"

const Stock = (props) => {

    const [data, setData] = useState([])
    const [bagCount, setBagCount] = useState()
    const [bags, setBags] = useState([])
    const [status, setStatus] = useState(0)
    const [message, setMessage] = useState("")
    // sweet alert states[0:initial, 1:success,2:failed,3:loading]
    const [formStatus, setFormStatus] = useState(0)

    const selectBag = (bagUUID) => {
        let newBags = data.filter((bag) => {
            if (bag.uuid === bagUUID) {
                bag.isSelected = !bag.isSelected
            }
            return bag
        })
        setData(newBags)
    }


    const submitForm = async () => {
        setFormStatus(3)
        let newBags = []
        data.map(bag => {
            if (bag.isSelected == true) {
                newBags.push(bag.uuid)
            }
        })
        let formData = {
            stockIds: newBags,
            bags
        }
        instance
            .post(`${process.env.REACT_APP_API_URL}/admin/stock/tobacco`, formData)
            .then((res) => {
                setStatus(1)
                setMessage(`tobacco added successfully`)
            })
            .catch((error) => {
                setStatus(2)
                setMessage(`Something went wrong`)
            })
    }

    const changeTotalBags = (e) => {
        let newBags = []
        for (let i = 0; i < e; i++) {
            newBags.push({ weight: 0 })
        }
        setBags(newBags)
        setBagCount(e)
    }


    const changeBagWeight = (bagWeight, bagId) => {
        console.log(bagWeight, bagId)
        let newBags = bags.map((bag, key) => {
            if (bagId === key) {
                bag.weight = parseInt(bagWeight)
            }
            return bag
        })
        setBags(newBags)
    }

    useEffect(() => {
        instance
            .get(`${process.env.REACT_APP_API_URL}/admin/stock/tobacco`)
            .then((res) => {
                let response = res.data
                response.map((bag, key) => {
                    bag.isSelected = false
                })
                setData(res.data)
            })
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Create Tobacco | Admin</title>
                </MetaTags>
                <Container fluid>
                    {status === 1 &&
                        <Alert color="success">
                            {message}
                        </Alert>
                    } {status == 2 &&
                        <Alert color="danger">
                            {message}
                        </Alert>
                    }
                    <div className="d-flex justify-content-between mb-2">
                        <h4 className="my-auto">Create Tobacco</h4>
                    </div>
                    <Row>
                        <Col md="4" className="mb-3">
                            <Label>Total Bags</Label>
                            <input
                                className="form-control"
                                name="totalbags"
                                type="number"
                                placeholder="enter total bags"
                                onChange={(e) => { changeTotalBags(e.target.value) }}
                            />
                        </Col>
                        <Col md="12"></Col>
                        {data.map((bag) =>
                            <Col
                                md="2"
                                className="cursor-pointer p-2"
                                onClick={() => selectBag(bag.uuid)}
                            >
                                <div className={`${bag.isSelected === true ? 'bg-success' : 'bg-white'} shadow-sm rounded p-3`}>
                                    <h6 className="text-capitalize text-center mb-1">{
                                        bag.type === "tobacco_1" ? "Nipali" :
                                        bag.type === "tobacco_2" ? "Alina" :
                                        bag.type === "tobacco_3" ? "Gujarat 2" :
                                        bag.type
                                    }</h6>
                                    <h5 className="text-center">{bag.weight} kgs</h5>
                                    <p className="text-center text-secondary mb-0">Serial no: {bag.serial_no}</p>
                                </div>
                            </Col>
                        )}
                    </Row>
                    {bags.map((bag, key) =>
                        <Row className="mt-2">
                            <Col md="5">
                                <Label>Type</Label>
                                <input
                                    name="Type"
                                    label="Type"
                                    type="text"
                                    className="form-control"
                                    placeholder="Type"
                                    defaultValue={`Tobacco`}
                                    disabled
                                />
                            </Col>
                            <Col md="5">
                                <Label>Weight</Label>
                                <input
                                    name="Weight"
                                    label="Weight"
                                    type="number"
                                    className="form-control"
                                    placeholder="Bag weight"
                                    defaultValue={0}
                                    onChange={(e) => { changeBagWeight(e.target.value, key) }}
                                />
                            </Col>
                        </Row>
                    )}
                    <br />
                    {bagCount && bagCount != 0 &&
                        <Button color="primary" onClick={submitForm}>Submit</Button>
                    }
                </Container>
            </div>
        </React.Fragment>
    )
}

const Spinner = () => {
    return (
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    )
}

export default Stock;
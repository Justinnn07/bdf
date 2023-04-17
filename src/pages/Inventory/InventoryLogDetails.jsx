import React, { useState, useEffect, useRef } from "react";
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Link } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Form,
    Label,
    Input,
    Alert,
    FormGroup,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb"

// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"

// validation schema
const schema = yup.object().shape({
    amount: yup.string().required("Name is required"),
    quantity: yup.number().required("Quantity is required"),
    supplier_id: yup.string().nullable(),
    type: yup.string().required("Type is required"),
    inventory_id: yup.string().required("Item is required")
});
const AddInventory = (props) => {

    // state
    const [items, setItems] = useState([])
    const [itemType, setItemType] = useState("")
    const [bags, setBags] = useState([])
    const [suppliers, setSuppliers] = useState([])

    // refs
    const FormElement = useRef(null)

    const [isSuccess, setIsSuccess] = useState(false)
    const [errorResponse, setErrorResponse] = useState("")
    const [formStatus, setFormStatus] = useState(0)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const itemTypeChange = (e) => {
        items.map((item) => {
            if(e === item.uuid){
                console.log(item)
                setItemType(item.measurement)
            } 
        })
    }
    const addBags = (e) => {
        e = parseInt(e)
        setBags(Array(e).fill(0))
    }

    const changeBagValue = (e, index) => {
        let newBags = []
        newBags = bags.map((bag, i) => {
            if(i === index) {
                bag = e
            }
            return bag
        })
        setBags(newBags)
    }

    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/list/inventory`)
            .then((res) => {
                setItems(res.data)
            })
        instance.get(`${process.env.REACT_APP_API_URL}/list/supplier`)
            .then((res) => {
                setSuppliers(res.data)
            })
    }, [])

    // useEffect
    const onSubmit = (data, e) => {
        data.bags = bags
        console.log(data)
        instance.post(`${process.env.REACT_APP_API_URL}/admin/inventory/logs`, data)
            .then((res) => {
                setIsSuccess(true)
                e.target.reset()
                setFormStatus(1)
            })
            .catch((err) => {
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
                    <title>Add Inventory | Admin</title>
                </MetaTags>
                <Container fluid>
                    <Breadcrumbs title="Dashboard" breadcrumbItem="Add Inventory Log" />
                    <Card>
                        <CardBody>
                            {isSuccess &&
                                <Alert color="success">
                                    Inventory log created successfully
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
                                        `Inventory log created successfully` :
                                        `Something went wrong`
                                    }
                                </SweetAlert>
                            ) : null}

                            <Form
                                ref={FormElement}
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Row className="mt-3">
                                    <Col md="4">
                                        <Label>Item</Label>
                                        <select type="select" name="inventory_id" className={`
                                           form-select mb-2
                                        `}
                                            {...register("inventory_id")}
                                            onChange={(e) => {itemTypeChange(e.target.value)}}
                                            invalid={errors.inventory_id}>
                                            <option value="">Select an item</option>
                                            {items.map((item, key) =>
                                                <option value={item.uuid}>{item.name} ({item.type})</option>
                                            )}
                                        </select>
                                        <p className="text-danger">{errors.inventory_id?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Type</Label>
                                        <select type="select" name="measurement" className={`
                                           form-select mb-2
                                        `}
                                            {...register("type")}
                                            invalid={errors.type}>
                                            <option value="">Select Type</option>
                                            <option value="incoming">Incoming</option>
                                            <option value="outgoing">Outgoing</option>
                                        </select>
                                        <p className="text-danger">{errors.type?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Quantity</Label>
                                        <Input
                                            name="quantity"
                                            label="Quantity"
                                            className="form-control"
                                            placeholder="Enter quantity for the item"
                                            type="number"
                                            min="1"
                                            {...register("quantity")}                                            
                                           onChange={(e) => { addBags(e.target.value) }}
                                            invalid={errors.quantity}
                                        />
                                        <p className="text-danger">{errors.quantity?.message}</p>
                                    </Col>
                                    <div className="d-flex"></div>
                                    <Col md="4">
                                        <Label>Amount</Label>
                                        <Input
                                            name="amount"
                                            label="Amount"
                                            className="form-control"
                                            placeholder="Enter amount"
                                            type="number"
                                            {...register("amount")}
                                            invalid={errors.amount}
                                        />
                                        <p className="text-danger">{errors.amount?.message}</p>
                                    </Col>
                                    <Col md="4">
                                        <Label>Supplier</Label>
                                        <select type="select" name="measurement" className={`
                                           form-select mb-2
                                        `}
                                            {...register("supplier_id")}
                                            invalid={errors.supplier_id}>
                                            <option value={""}>Select Supplier</option>
                                            <option value={""}>No Supplier</option>
                                            {suppliers.map((supplier, key) =>
                                                <option value={supplier.uuid}>{supplier.name}</option>
                                            )}
                                        </select>
                                        <p className="text-danger">{errors.supplier_id?.message}</p>
                                    </Col>
                                </Row>
                                <br />
                                <h5>Bags</h5>
                                {itemType === "bags" && bags.map((row, key) => 
                                <Row>
                                    <Col md="4"
                                    >
                                        <Label>Bag</Label>
                                        <input className="form-control" type="text" value={key+1} disabled />
                                    </Col>
                                    <Col md="4">
                                        <Label>Bag  quantity</Label>
                                        <input
                                            name="bag"
                                            label="Bag"
                                            className="form-control"
                                            placeholder="Enter bag"
                                            type="number"
                                            defaultValue={row}
                                            onChange={(e) => { changeBagValue(e.target.value, key) }}
                                        />
                                    </Col>
                                </Row>
                                )}
                                <div className="mt-2">
                                    {[0, 1, 2].includes(formStatus) ?
                                        <button
                                            type="submit" className="btn btn-primary"
                                        >Submit</button>
                                        :
                                        <button class="btn btn-primary" type="button" disabled>
                                            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    }
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    )
}


export default AddInventory;
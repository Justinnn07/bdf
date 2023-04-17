import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Label,
  Alert,
} from "reactstrap"
import instance from "../../../helpers/api/axiosHelper"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// validation schema
const schema = yup.object().shape({
  inventory_id: yup.string().required("Inventory item is required"),
  quantity: yup.string().required("Please enter quantity"),
})

const AddRuleModal = props => {
  //  id
  let { id } = useParams()

  // state
  const [inventory, setInventory] = useState([])
  const [status, setStatus] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  // form validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { className } = props

  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
    setStatus(0)
    setErrorMessage("")
  }

  const onSubmit = data => {
    data.product_id  = id
    instance
      .post(`${process.env.REACT_APP_API_URL}/admin/product/rules`, data)
      .then(res => {
        setStatus(1)
        setTimeout(() => {
          toggle()
        }, 300)
      })
      .catch(error => {
        setStatus(2)
        setErrorMessage(error.response.data.message)
      })
  }

  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/list/inventory/`)
      .then(res => {
        setInventory(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <button onClick={() => toggle()} className="btn btn-primary">
        Add Rule
      </button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>Add Product rule</ModalHeader>
          <ModalBody>
            {status === 1 && (
              <Alert color="success">Carton added successfully</Alert>
            )}{" "}
            {status == 2 && <Alert color="danger">{errorMessage}</Alert>}
            <Row>
              <Col lg="12">
                <Label>Inventory</Label>
                <select
                  name="inventory"
                  label="Inventory"
                  className="form-select"
                  {...register("inventory_id")}
                >
                  <option value="">Select an inventory</option>
                  {inventory.map((row, key) => (
                    <option value={row.uuid}>{row.name}</option>
                  ))}
                </select>
                <p className="text-danger">{errors.inventory_id?.message}</p>
              </Col>
              <Col lg="12">
                <Label>Quantity</Label>
                <input
                  name="quantity"
                  label="Quantity"
                  type="number"
                  className="form-control"
                  placeholder="Enter number of quantity"
                  defaultValue={0}
                  {...register("quantity")}
                />
                <p className="text-danger">{errors.quantity?.message}</p>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}
export default AddRuleModal

import React, { useState, useEffect, useRef } from "react"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
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
  Spinner,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import Select from "react-select"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"

// validation schema
const schema = yup.object().shape({})
const AddInventory = props => {
  // refs
  const FormElement = useRef(null)

  // state
  const [tobacco, setTobacco] = useState([])
  const [bagCount, setBagCount] = useState(0)
  const [bagArray, setBagArray] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
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

  const shapeBagsData = (item, bags) => {
    let options = bags.map(bag => ({
      label: bag.bag_id,
      value: bag.uuid,
    }))
    let multiSelectData = []
    multiSelectData.push({
      label: item.name,
      options,
    })
    console.log(multiSelectData)
    return multiSelectData
  }

  const changeValues = (bags, item) => {
    let oldData = data
    let isRepeated = false
    let repeatedKey = null
    oldData.map((obj, key) => {
      if (obj.inventory_id === item.uuid) {
        isRepeated = true
        repeatedKey = key
      }
    })
    if (isRepeated == false) {
      oldData.push({
        inventory_id: item.uuid,
        bags,
      })
    } else {
      oldData[repeatedKey] = {
        inventory_id: item.uuid,
        bags,
      }
    }
    setData(oldData)
  }

  const changeBagValue = (quantity, bagKey) => {
    const oldData = bagArray
    const newData = oldData.map((obj, key) => {
      if (key === bagKey) {
        obj = quantity
      }
      return obj
    })
    setBagArray(newData)
  }

  const onSubmit = (formData, e) => {
    // let data = formData;
    instance
      .post(
        `${process.env.REACT_APP_API_URL}/admin/inventory/create-tobacco`,
        {data, bags: bagArray}
      )
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

  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/inventory/tobacco`)
      .then(res => {
        setTobacco(res.data)
        setLoading(false)
      })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Add Inventory Item | Admin</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItem="Create tobacco" />
          <Card>
            <CardBody>
              {isSuccess && (
                <Alert color="success">Item created successfully</Alert>
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
                    ? `Item created successfully`
                    : `Something went wrong`}
                </SweetAlert>
              ) : null}

              {!loading ? (
                <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    {tobacco.filter(item=> item.name != "Tobacco").map((item, key) => (
                      <Col className="mt-3" md={6}>
                        <h6>{item.name}</h6>
                        <Select
                          value={item.selectedBags}
                          isMulti={true}
                          onChange={e => {
                            changeValues(e, item)
                          }}
                          options={shapeBagsData(item, item.bags)}
                        ></Select>
                      </Col>
                    ))}
                  </Row>

                      
                  <h4 className="mt-3 mb-0">Generate tobacco bags</h4>
                  <Row>
                    <Col md="3" className="mt-1">
                      <input
                        className="form-control"
                        type="number"
                        min={0}
                        placeholder="Enter number of bags"
                        onChange={e => {
                          setBagCount(e.target.value),
                          setBagArray(Array(e.target.value ? parseInt(e.target.value) : 0).fill(0))
                        }}
                      />
                    </Col>
                    {bagArray
                      .map((row, key) =>
                        <Row className="mt-3" key={key}>
                          <Col md="5">
                            <input
                              className="form-control"
                              type="text"
                              value={key + 1}
                              disabled
                            />
                          </Col>
                          <Col md="5">
                            <input
                              className="form-control"
                              type="number"
                              name="quantity"
                              id=""
                              min={1}
                              placeholder="Enter quantity"
                              value={bagArray[key]}
                              onChange={e => { changeBagValue(e.target.value, key) }}
                            />
                          </Col>
                        </Row>
                      )}
                  </Row>
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
              ) : (
                <div class="text-center">
                  <Spinner>Loading...</Spinner>
                  <p>Loading...</p>
                </div>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddInventory

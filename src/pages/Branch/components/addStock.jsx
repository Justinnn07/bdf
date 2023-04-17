import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import instance from "../../../helpers/api/axiosHelper"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Button,
  Alert,
} from "reactstrap"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
import Select from "react-select"

const AddStock = props => {
  let { id } = useParams()
  const [redYarn, setRedYarn] = useState(0)
  const [jamulaYarn, setJamulaYarn] = useState(0)
  const [leafBags, setLeafBags] = useState([])
  const [tobaccoBags, setTobaccoBags] = useState([])
  const [selectedLeaf, setSelectedLeaf] = useState([])
  const [selectedTobacco, setSelectedTobacco] = useState([])
  const [status, setStatus] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")

  // sweet alert states[0:initial, 1:success,2:failed,3:loading]
  const [formStatus, setFormStatus] = useState(0)

  const shapeBagsData = (item, bags) => {
    let options = bags.map(bag => ({
      label: bag.bag_id,
      value: bag.uuid,
    }))
    let multiSelectData = []
    multiSelectData.push({
      label: item,
      options,
    })
    return multiSelectData
  }

  const addLeafBags = e => {
    setSelectedLeaf(e.map(bag => bag.value))
  }

  const addTobaccoBags = e => {
    setSelectedTobacco(e.map(bag => bag.value))
  }
  const submitForm = async () => {
    let data = {
      red_yarn: redYarn,
      jamula_yarn: jamulaYarn,
      leaf: selectedLeaf,
      tobacco: selectedTobacco,
      branch_id: id,
    }
    setFormStatus(3)
    instance
      .post(`${process.env.REACT_APP_API_URL}/admin/branch/stock`, data)
      .then(res => {
        setStatus(1)
        setFormStatus(1)
        setTimeout(() => {
          location.href = `/branch/${id}/stock`
        }, 1000)
      })
      .catch(error => {
        setStatus(2)
        setErrorMessage(error.response.data.message)
        setFormStatus(2)
      })
  }

  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/branch/stock`)
      .then(res => {
        let response = res.data
        setLeafBags(response.leaf)
        setTobaccoBags(response.tobacco)
      })
  }, [])

  return (
    <div>
      <React.Fragment>
        <div className="">
          <Container fluid>
            {status === 1 && (
              <Alert color="success">Stock added successfully</Alert>
            )}{" "}
            {status == 2 && <Alert color="danger">{errorMessage}</Alert>}
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
                  ? `Stock added successfully`
                  : `Something went wrong`}
              </SweetAlert>
            ) : null}
            <div>
              <h4>Add Stock</h4>
              <Row className="mt-2">
                <Col md="4">
                  <Label>Red Yarn</Label>
                  <input
                    name="redyarn"
                    label="Red Yarn"
                    type="number"
                    className="form-control"
                    placeholder="Enter Ladi for Red Yarn"
                    min={0}
                    onChange={e => setRedYarn(e.target.value)}
                  />
                </Col>
                <Col md="4">
                  <Label>Jamula yarn</Label>
                  <input
                    name="jamulayarn"
                    label="Jamula Yarn"
                    type="number"
                    className="form-control"
                    placeholder="Enter Ladi for Jamula Yarn"
                    min={0}
                    onChange={e => setJamulaYarn(e.target.value)}
                  />
                </Col>
                <Col md="12" className="mb-2"></Col>
                <Col md="4">
                  <Label>Leaf Bags</Label>
                  <Select
                    options={shapeBagsData("Leaf", leafBags)}
                    isMulti
                    onChange={e => {
                      addLeafBags(e)
                    }}
                  ></Select>
                </Col>
                <Col md="4">
                  <Label>Tobacco Bags</Label>
                  <Select
                    options={shapeBagsData("Tobacco", tobaccoBags)}
                    isMulti
                    onChange={e => {
                      addTobaccoBags(e)
                    }}
                  ></Select>
                </Col>
              </Row>
              <Button color="primary" onClick={() => submitForm()}>
                Submit
              </Button>
            </div>
          </Container>
        </div>
      </React.Fragment>
    </div>
  )
}

export default AddStock

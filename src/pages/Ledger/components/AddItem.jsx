import React, { useState, useEffect, useRef } from "react"

import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Alert,
} from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"

// form validation
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
//
import instance from "helpers/api/axiosHelper"
const schema = yup.object().shape({})

const Index = props => {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)
  // refs
  const FormElement = useRef(null)

  const [isSuccess, setIsSuccess] = useState(false)
  const [errorResponse, setErrorResponse] = useState("")
  const [formStatus, setFormStatus] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data, e) => {
    instance
      .post(
        `${process.env.REACT_APP_API_URL}/admin/ledger/${props.id}/item`,
        data
      )
      .then(res => {
        setIsSuccess(true)
        setFormStatus(1)
        e.target.reset()
        toggle()
        props.getData()
        setTimeout(() => {
          setIsSuccess(false)
          setFormStatus(0)
        }, 3000)
      })
      .catch(err => {
        setErrorResponse(err.response.data.message)
        setFormStatus(2)
      })
  }

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button color="primary" onClick={toggle}>
          Add Record
        </Button>
      </div>

      <Modal
        size="lg"
        isOpen={modal}
        toggle={toggle}
        className={props.className}
      >
        <ModalHeader toggle={toggle}>{"Add Record"}</ModalHeader>
        <ModalBody>
          {isSuccess && (
            <Alert color="success">Record created successfully</Alert>
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
                ? `Record created successfully`
                : `Something went wrong`}
            </SweetAlert>
          ) : null}
          <Form ref={FormElement} onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="form-group col-md-6 mt-2">
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  {...register("amount")}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <label>Transaction Type</label>
                <select
                  name="transaction_type"
                  className="form-control"
                  {...register("transaction_type")}
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>
              <div className="form-group col-md-6 mt-2">
                <label>Payment Method</label>
                <select
                  name="payment_method"
                  className="form-control"
                  {...register("payment_method")}
                >
                  <option value="cash">Cash</option>
                  <option value="cheque">Cheque</option>
                  <option value="card">Card</option>
                  <option value="bank transfer">Bank Transfer</option>
                </select>
              </div>
              <div className="form-group col-md-6 mt-2">
                <label>Transaction ID</label>
                <input
                  type="text"
                  name="transaction_id"
                  className="form-control"
                  {...register("transaction_id")}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <label>Account No</label>
                <input
                  type="text"
                  name="account_no"
                  className="form-control"
                  {...register("account_no")}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <label>IFSC Code</label>
                <input
                  type="text"
                  name="ifsc_code"
                  className="form-control"
                  {...register("ifsc_code")}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bank_name"
                  className="form-control"
                  {...register("bank_name")}
                />
              </div>
              <div className="form-group col-md-6 mt-2">
                <label>Date Credited</label>
                <input
                  type="date"
                  name="date_credited"
                  className="form-control"
                  {...register("date_credited")}
                />
              </div>
              <div className="form-group col-md-12 mt-2">
                <label>Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  {...register("message")}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-2">
              <button class="btn btn-primary me-2" type="submit">
                Submit
              </button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Index

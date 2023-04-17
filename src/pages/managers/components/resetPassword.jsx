import React, { useState, useRef } from "react"
import { useParams } from "react-router"
import { Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Label, Alert } from "reactstrap"
import instance from "../../../helpers/api/axiosHelper"
// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
// Sweet Alert
import SweetAlert from "react-bootstrap-sweetalert"
// validation schema
const schema = yup.object().shape({
    password: yup.string().required("Enter Reset Password"),
    confirmPassword: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password'), null], 'Passwords does not match'),
});
const ResetPassword = (props) => {
    //  id
    let { id } = useParams();
    // state
    // const [password, setPassword] = useState('')
    const FormElement = useRef(null)
    const [status, setStatus] = useState(0)
    const [formStatus, setFormStatus] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    // form validation
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = (data) => {
        setFormStatus(3)
        instance.patch(`${process.env.REACT_APP_API_URL}/admin/manager/reset/${id}`, data)
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

    return (
        <div>
            <div>
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
                            `Reset password successfully` :
                            `Something went wrong`
                        }
                    </SweetAlert>
                ) : null}
                <h5>Reset Password</h5>
                <form ref={FormElement}
                    onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="password" className="mb-0">Reset password</label>
                    <input type="password"
                        name="password" id="password"
                        label="Reset Password"
                        className="form-control"
                        placeholder="Enter Reset Password"
                        {...register("password")}
                        invalid={errors.password} />
                    <p className="text-danger">{errors.password?.message}</p>
                    <label htmlFor="cpassword" className="mt-3">Confirm password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword"
                        label="Confirm  Password"
                        className="form-control"
                        placeholder="Enter  Password"
                        {...register("confirmPassword")}
                        invalid={errors.confirmPassword} />
                    <p className="text-danger">{errors.confirmPassword?.message}</p>
                    <div className="mt-2">
                        {[0, 1, 2].includes(formStatus) ?
                            <button
                                type="buttton" className="btn btn-primary"
                            >Submit</button>
                            :
                            <button class="btn btn-primary" type="button" disabled>
                                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ResetPassword;
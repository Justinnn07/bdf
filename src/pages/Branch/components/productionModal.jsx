import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Label, Alert } from "reactstrap"
import instance from "../../../helpers/api/axiosHelper"

// form validation
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

function range(start, stop, step = 1, circularFill = false, map = (value) => value) {
    if (typeof stop === 'undefined') {
        stop = start;
        start = 0;
    }

    if (step > 0 && start >= stop) {
        step = -step;
    }

    if (step < 0 && start <= stop) {
        return [];
    }

    let index = start;
    const result = [];

    if (circularFill) {
        const size = start + stop;
        for (index; step > 0 ? index < size : index > size; index += step) {
            result.push(map(index % stop));
        }
        return result;
    }

    for (index; step > 0 ? index < stop : index > stop; index += step) {
        result.push(map(index));
    }

    return result;
}

const months = [
    { number: 1, month: "January" },
    { number: 2, month: "February" },
    { number: 3, month: "March" },
    { number: 4, month: "April" },
    { number: 5, month: "May" },
    { number: 6, month: "June" },
    { number: 7, month: "July" },
    { number: 8, month: "August" },
    { number: 9, month: "September" },
    { number: 10, month: "October" },
    { number: 11, month: "November" },
    { number: 12, month: "December" },
]

// validation schema
const schema = yup.object().shape({
    employee_id: yup.string().required("Please select an employee"),
});

const productionModal = (props) => {
    //  id
    let { id } = useParams();

    // state
    const [halfMonth, setHalfMonth] = useState(null)
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear())
    const [employees, setEmployees] = useState([])
    const [records, setRecords] = useState([])
    const [status, setStatus] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    // form validation
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const {
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const changeValues = (e, type, rowDate) => {
        let newRecords = records.map((row, key) => {
            if (row.date === rowDate) {
                row[type] = e
            }
            return row
        })
        console.log(newRecords)
        setRecords(newRecords)
    }

    const onSubmit = (data) => {
        data.half = halfMonth
        data.month = month
        data.year = year
        data.meta = records
        data.branch_id = id
        instance.post(`${process.env.REACT_APP_API_URL}/admin/employee/beedi`, data)
            .then((res) => {
                setStatus(1)
                toggle()
                props.getData()
            })
            .catch((error) => {
                setStatus(2)
                setErrorMessage(error.response.data.message)
            })
    }

    useEffect(() => {
        if (year && month && halfMonth) {
            let numDays = new Date(year, month, 0).getDate()
            let newRecords = []
            let startDate = halfMonth == 1 ? 1 : 16
            numDays = halfMonth == 1 ? 15 : numDays
            console.log({ halfMonth, startDate, numDays })
            for (let i = startDate; i <= numDays; i++) {
                newRecords.push({
                    date: `${year}-${month}-${i}`,
                    beedi: 0,
                    leaf: 0,
                    jamula_yarn: 0,
                    red_yarn: 0
                })
            }
            setRecords(newRecords)
        } else {
            setRecords([])
        }
    }, [month, year, halfMonth])


    const getEmployees = () => {
        instance
            .get(`${process.env.REACT_APP_API_URL}/admin/branch/${id}/employee`)
            .then((res) => {
                setEmployees(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        setStatus(0)
        getEmployees()
    }, [modal])

    useEffect(() => {
        getEmployees()
    }, [])

    return (
        <div>
            <button onClick={() => toggle()} className="btn btn-success">Add Product</button>
            <Modal
                size="lg"
                isOpen={modal} toggle={toggle} className={className}
            >
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <ModalHeader toggle={toggle}>Add Product</ModalHeader>
                    <ModalBody>
                        {status === 1 &&
                            <Alert color="success">
                                Beedis added successfully
                            </Alert>
                        } {status == 2 &&
                            <Alert color="danger">
                                {errorMessage}
                            </Alert>
                        }
                        <Row>
                            <Col lg="12">
                                <Label>Employee</Label>
                                <select
                                    name="employee"
                                    label="employee"
                                    className="form-select"
                                    {...register("employee_id")}
                                >
                                    <option value="">Select an employee</option>
                                    {employees.map((row, key) =>
                                        <option value={row.uuid}>{row.first_name + row.last_name}</option>
                                    )}
                                </select>
                                <p className="text-danger">{errors.employee_id?.message}</p>
                            </Col>
                            <Row>
                                <Col
                                    md="4"
                                >
                                    <Label>Half Month</Label>
                                    <select
                                        className="form-select"
                                        onChange={(e) => setHalfMonth(e.target.value)}
                                    >
                                        <option value={null}>Select half month</option>
                                        <option value={1}>First Half</option>
                                        <option value={2}>Second Half</option>
                                    </select>
                                </Col>
                                <Col
                                    md="4"
                                >
                                    <Label>Month</Label>
                                    <select
                                        className="form-select"
                                        onChange={(e) => setMonth(e.target.value)}
                                    >
                                        <option value={null}>Select a month</option>
                                        {months.map((month, key) =>
                                            <option value={month.number}>{month.month}</option>
                                        )}
                                    </select>
                                </Col>
                                <Col
                                    md="4"
                                >
                                    <Label>Year</Label>
                                    <select
                                        className="form-select"
                                        onChange={(e) => setYear(e.target.value)}
                                    >
                                        {range(2020, 2099, 1).map((year, key) =>
                                            <option
                                                value={year}
                                                selected={new Date().getFullYear() === year ? true : false}
                                            >{year}</option>
                                        )}
                                    </select>
                                </Col>
                            </Row>
                            {records.map((row, key) =>
                                <Row className="mt-2">
                                    <Col lg="2">
                                        {row.date}
                                    </Col>
                                    <Col lg="2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="leaf"
                                            onChange={(e) => changeValues(e.target.value, "leaf", row.date)}
                                        />
                                    </Col>
                                    <Col lg="2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="tobacco"
                                            onChange={(e) => changeValues(e.target.value, "tobacco", row.date)}
                                        />
                                    </Col>
                                    <Col lg="2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="yarn"
                                            onChange={(e) => changeValues(e.target.value, "red_yarn", row.date)}
                                        />
                                    </Col>
                                    <Col lg="2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="jamula yarn"
                                            onChange={(e) => changeValues(e.target.value, "jamula_yarn", row.date)}
                                        />
                                    </Col>
                                    <Col lg="2">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="beedis"
                                            onChange={(e) => changeValues(e.target.value, "beedi", row.date)}
                                        />
                                    </Col>
                                </Row>
                            )}
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary">Submit</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
export default productionModal;
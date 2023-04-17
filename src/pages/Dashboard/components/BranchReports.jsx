import React, { useEffect, useState } from "react"

import instance from "helpers/api/axiosHelper"
import { Link } from "react-router-dom"
import moment from "moment"

const Index = props => {
  const [data, setData] = useState([])
  const [from, setFrom] = useState(
    moment().subtract(15, "days").format("YYYY-MM-DD")
  )
  const [to, setTo] = useState(moment().format("YYYY-MM-DD"))

  const GetData = () => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/reports/branch/dashboard?from=${from}&to=${to}`)
      .then(res => {
        setData(res.data)
      })
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between">
      <h5>Branch Reports</h5>
      <div className="d-inline-flex">
        {/* from, to date */}
        <input
          type="date"
          className="form-control form-control-sm me-3"
          defaultValue={moment()
            .subtract(15, "days")
            .format("YYYY-MM-DD")}
          onChange={e => setFrom(e.target.value)}
        />
        <input
          type="date"
          className="form-control form-control-sm"
          defaultValue={moment().format("YYYY-MM-DD")}
          onChange={e => setTo(e.target.value)}
        />
        <button
          className="btn btn-sm btn-primary ms-3"
          onClick={GetData}
        >
          Apply
        </button>
      </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">S NO</th>
            <th scope="col">Branch Name</th>
            <th scope="col">Opening (Leaf)</th>
            <th scope="col">Closing (Leaf)</th>
            <th scope="col">Opening (Tobacco)</th>
            <th scope="col">Closing (Tobacco)</th>
            <th scope="col">Total Beedi</th>
            <th scope="col">Net Beedi</th>
            <th scope="col">Registered Beedi</th>
            <th scope="col">Reported Beedis</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, key) => (
            <tr>
              <th scope="row">{key + 1}</th>
              <td>
                <Link to={`/branch/${row.uuid}`}>{row.name}</Link>
              </td>
              <td>{Math.round(row?.reports[0]?.opening).toLocaleString()} kgs</td>
              <td>{Math.round(row?.reports[0]?.closing).toLocaleString()} kgs</td>
              <td>{Math.round(row?.reports[1]?.opening).toLocaleString()} kgs</td>
              <td>{Math.round(row?.reports[1]?.closing).toLocaleString()} kgs</td>
              <td>{parseInt(row?.total_beedi)?.toLocaleString()}</td>
              <td>{parseInt(row?.net_beedi)?.toLocaleString("en-IN")}</td>
              <td>{parseInt(row?.registered_beedi)?.toLocaleString()}</td>
              <td>{parseInt(row?.reported_beedis)?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Index

// integrate chart.js
// sample data
// [{"id":1,"invoice_date":"2021-11-04T00:00:00.000Z","total_amount":"27111084.00"},{"id":2,"invoice_date":"2021-11-24T00:00:00.000Z","total_amount":"444444.00"},{"id":3,"invoice_date":"2021-11-10T00:00:00.000Z","total_amount":"30000.00"}]

import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import instance from "../../../helpers/api/axiosHelper"

const SalesChart = () => {
  const [sales, setSales] = useState([])
  const data = {
    labels: sales.map(sale => sale.invoice_date),
    datasets: [
      {
        label: "Sales",
        data: sales.map(sale => sale.total_amount),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#556EE6",
        borderWidth: 2,
        fill: false,
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  useEffect(async () => {
    await instance
      .get(`${process.env.REACT_APP_API_URL}/graph/sales`)
      .then(res => {
        let response = res.data
        // convert key(invoice_date) from datetime to date in format dd-mm-yyy
        response.forEach(sale => {
          let date = new Date(sale.invoice_date)
          sale.invoice_date = `${date.getDate()}-${date.getMonth() +
            1}-${date.getFullYear()}`
        })
        setSales(response)
      })
  }, [])

  return <Line data={data} options={options} />
}

export default SalesChart;
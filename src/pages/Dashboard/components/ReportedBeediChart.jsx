// integrate chart.js
// sample data
// [{"id":1,"invoice_date":"2021-11-04T00:00:00.000Z","total_amount":"27111084.00"},{"id":2,"invoice_date":"2021-11-24T00:00:00.000Z","total_amount":"444444.00"},{"id":3,"invoice_date":"2021-11-10T00:00:00.000Z","total_amount":"30000.00"}]

import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import instance from "../../../helpers/api/axiosHelper"

const SalesChart = () => {
  const [sales, setSales] = useState([])
  const data = {
    labels: sales.map(sale => sale.createdAt),
    datasets: [
      {
        label: "Reported Beedi",
        data: sales.map(sale => sale.reported_beedi),
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
      .get(`${process.env.REACT_APP_API_URL}/graph/reported-beedi`)
      .then(res => {
        let response = res.data
        // convert createdAt to yyyy-mm-dd
        response.forEach(sale => {
          sale.createdAt = sale.createdAt.split("T")[0]
        })
        setSales(response)
      })
  }, [])

  return <Line data={data} options={options} />
}

export default SalesChart;
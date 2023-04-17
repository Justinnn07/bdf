import React, { Component, Suspense, useEffect, useState } from "react"
import instance from "../../helpers/api/axiosHelper"
import { Row, Col, Card, CardBody, Media, CardTitle } from "reactstrap"
import MetaTags from "react-meta-tags"
import { Container } from "reactstrap"

import SalesChart from "./components/SalesChart"
import ReportedBeediChart from "./components/ReportedBeediChart"
import BranchReports from "./components/BranchReports"

const Dashboard = () => {
  const [basic, setBasic] = useState([])

  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/dashboard`)
      .then(res => {
        setBasic(res.data)
      })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | Admin</title>
        </MetaTags>
        <Container fluid>
          <h4>Dashboard</h4>
          <Row>
            {Object.keys(basic).map((row, key) => (
              <Col lg={3} md={6} sm={6} xs={12}>
                <Card className="card-stats">
                  <CardBody>
                    <p className="text-secondary mb-0">
                      {row.replace("_", " ")}
                    </p>
                    <h5>{basic[row].toLocaleString()}</h5>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>

          <Row>
            <Col lg={6}>
              <SalesChart />
            </Col>
            <Col lg={6}>
              <ReportedBeediChart />
            </Col>
          </Row>
          <BranchReports />
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard

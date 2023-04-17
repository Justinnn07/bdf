import React, { useState, useEffect, useRef } from "react"
import {
  Switch,
  Route,
  Redirect,
  Link,
  BrowserRouter,
  useParams,
  useLocation,
  NavLink,
} from "react-router-dom"
import MetaTags from "react-meta-tags"
import { Container, Row, Col, Button } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"

//  components
import Details from "./components/details"
import Employees from "./components/employees"
import AddEmployee from "./components/addEmployee"
import Employee from "./components/employee"
import Production from "./components/production"
import addProduction from "./components/addProduction"
import StockLogs from "./components/stocklogs"
import instance from "helpers/api/axiosHelper"
import addStock from "./components/addStock"
import moment from "moment"

const addBranch = () => {
  //  id
  let { id } = useParams()

  // state
  const [branch, setBranch] = useState({})
  const [activeRoute, setActiveRoute] = useState("details")

  const resetBranchStock = () => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/branch/${id}/resetStock`)
      .then(res => {
        window.location.reload()
      })
  }

  // use effect
  useEffect(() => {
    instance
      .get(`${process.env.REACT_APP_API_URL}/admin/branch/${id}`)
      .then(res => {
        setBranch(res.data)
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="page-content">
        <MetaTags>
          <title>Branch Details | Admin</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem={branch.name + " - " + branch.person_name}
          />
          <div className="bg-white rounded-2 p-3 mb-3">
            <div className="row m-0">
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Leaf</p>
                  <h4>{branch.leaf && branch.leaf.toFixed(2)} kgs</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Tobacco</p>
                  <h4>{branch.tobacco && branch.tobacco.toFixed(2)} kgs</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className="p-2">
                  <p className="mb-0">Red Yarn</p>
                  <h4>{branch.red_yarn} potte</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className="p-2">
                  <p className="mb-0">Jamula Yarn</p>
                  <h4>{branch.jamula_yarn} potte</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Beedi</p>
                  <h4>{branch.beedi}</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Aavak Beedi</p>
                  <h4>{branch.aavak_beedi}</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Manager</p>
                  <span>{branch.manager && branch.manager.type}</span>
                </div>
              </div>
              {/* commission charges in rupees */}
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Commission Charges</p>
                  <h4>₹ {branch.commission_charges}</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Manager</p>
                  <a
                    href={`/managers/${branch.manager && branch.manager.uuid}`}
                  >
                    {(branch.manager &&
                      branch.manager.first_name +
                        " " +
                        branch.manager.last_name) ||
                      "--"}
                  </a>
                </div>
              </div>

              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Employees</p>
                  <h4>{branch.employee_count}</h4>
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Created At</p>
                  <p className="fw-bold">
                    {branch.createdAt &&
                      moment(branch.createdAt).format("DD-MM-YYYY hh:mm:ss a")}
                  </p>
                </div>
              </div>
              {/* <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Updated At</p>
                  <p className="fw-bold">
                    {branch.updatedAt &&
                      moment(branch.updatedAt).format("DD-MM-YYYY hh:mm:ss a")}
                  </p>
                </div>
              </div> */}
              {/* Reset */}
              <div className="col-lg-2 col-md-4">
                <div className=" p-2">
                  <p className="mb-0">Reset</p>
                  <button
                    className="btn btn-danger px-3"
                    onClick={() => {
                      resetBranchStock()
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2 p-3">
            <Row>
              <Col md="2">
                <NavLink
                  exact={true}
                  to={`/branch/${id}`}
                  activeClassName="btn-primary"
                  className="btn"
                >
                  View Details
                </NavLink>
              </Col>
              <Col md="2">
                <NavLink
                  exact={true}
                  to={`/branch/${id}/stock`}
                  activeClassName="btn-primary"
                  className="btn"
                >
                  Stock
                </NavLink>
              </Col>
              <Col md="2">
                <NavLink
                  exact={true}
                  to={`/branch/${id}/employees`}
                  activeClassName="btn-primary"
                  className="btn"
                >
                  Employees
                </NavLink>
              </Col>
              <Col md="2">
                <NavLink
                  exact={true}
                  to={`/branch/${id}/production`}
                  activeClassName="btn-primary"
                  className="btn"
                >
                  Production
                </NavLink>
              </Col>
            </Row>
            <Switch>
              <Route path="/branch/:id/production" component={Production} />
              <Route
                path="/branch/:id/add-production"
                component={addProduction}
              />
              <Route path="/branch/:id/stock/add" component={addStock} />
              <Route path="/branch/:id/stock" component={StockLogs} />
              <Route
                path="/branch/:id/employees/:employeeid"
                component={Employee}
              />
              <Route path="/branch/:id/employees" component={Employees} />
              <Route path="/branch/:id/add-employee" component={AddEmployee} />
              <Route path="/branch/:id" component={Details} />
            </Switch>
          </div>
        </Container>
      </div>
    </BrowserRouter>
  )
}
export default addBranch

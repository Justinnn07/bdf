import PropTypes from "prop-types"
import React, { Component } from "react"

//Simple bar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

class SidebarContent extends Component {
  constructor(props) {
    super(props)
    this.refDiv = React.createRef()
  }

  componentDidMount() {
    this.initMenu()
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props.type !== prevProps.type) {
      this.initMenu()
    }
  }

  initMenu() {
    new MetisMenu("#side-menu")

    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    for (let i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem)
    }
  }

  // componentDidUpdate() {}

  scrollElement = item => {
    setTimeout(() => {
      if (this.refDiv.current !== null) {
        if (item) {
          const currentPosition = item.offsetTop
          if (currentPosition > window.innerHeight) {
            if (this.refDiv.current)
              this.refDiv.current.getScrollElement().scrollTop =
                currentPosition - 300
          }
        }
      }
    }, 300)
  }

  activateParentDropdown = item => {
    item.classList.add("active")
    const parent = item.parentElement

    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }

    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      this.scrollElement(item)
      return false
    }
    this.scrollElement(item)
    return false
  }

  render() {
    return (
      <React.Fragment>
        <SimpleBar style={{ maxHeight: "100%" }} ref={this.refDiv}>
          <div id="sidebar-menu" className>
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{this.props.t("Menu")}</li>
              {/* Dashboard */}
              <li>
                <Link to="/dashboard" className="">
                  <i className="mdi mdi-view-dashboard" />
                  <span>{this.props.t("Dashboard")}</span>
                </Link>
              </li>
              {/* Dashboard */}

              {/* Reports */}
              <li>
                <Link to="/reports" className="">
                  <i class="bx bxs-report" />
                  <span>{this.props.t("Reports")}</span>
                </Link>
              </li>
              {/* Reports */}

              {/* Inventory */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-box" />
                  <span>{this.props.t("Inventory")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/inventory">{this.props.t("Inventory")}</Link>
                  </li>
                  <li>
                    <Link to="/inventory/logs">
                      {this.props.t("Inventory Logs")}
                    </Link>
                  </li>
                </ul>
              </li>
              {/* End Inventory */}

              {/* Suppliers */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="mdi mdi-transfer" />
                  <span>{this.props.t("Suppliers")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/suppliers/add">
                      {this.props.t("Add Supplier")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/suppliers">{this.props.t("Suppliers")}</Link>
                  </li>
                </ul>
              </li>
              {/* End Suppliers */}

              {/* Branches */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="mdi mdi-office-building" />
                  <span>{this.props.t("Branches")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/branch/add">{this.props.t("Add Branch")}</Link>
                  </li>
                  <li>
                    <Link to="/branch">{this.props.t("Branches")}</Link>
                  </li>
                  <li>
                    <Link to="/managers">{this.props.t("Managers")}</Link>
                  </li>
                </ul>
              </li>

              {/* End Branches */}
              {/* employess*/}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="mdi dripicons-user-id" />
                  <span>{this.props.t("Employees")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/employees/add">
                      {this.props.t("Add Employee")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/employees">{this.props.t("Employees")}</Link>
                  </li>
                </ul>
              </li>
              {/* end employess*/}

              {/* Beedis*/}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-package" />
                  <span>{this.props.t("Beedis")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/beedis" className="">
                      <span>{this.props.t("Reported Beedis")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/beedis/branches" className="">
                      <span>{this.props.t("Branches")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/chennilu" className="">
                      <span>{this.props.t("Chennilu")}</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* end Beedis*/}
              {/* Products */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bxl-product-hunt" />
                  <span>{this.props.t("Production")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/products">{this.props.t("Products")}</Link>
                  </li>
                  <li>
                    <Link to="/products/cartons">
                      {this.props.t("Cartons")}
                    </Link>
                  </li>
                </ul>
              </li>
              {/* End Products */}

              {/* Salary */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="mdi mdi-account-cash-outline" />
                  <span>{this.props.t("Salary")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/salary">{this.props.t("Branch")}</Link>
                  </li>
                  <li>
                    <Link to="/salary/employee">
                      {this.props.t("Employees")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/salary/logs">{this.props.t("Salary Logs")}</Link>
                  </li>
                </ul>
              </li>
              {/* End Inventory */}

              {/* Distributors */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="mdi mdi-cube-send" />
                  <span>{this.props.t("Distributors")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/distributor/add">
                      {this.props.t("Add Distributor")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/distributors">
                      {this.props.t("Distributors")}
                    </Link>
                  </li>
                </ul>
              </li>
              {/* End Distributors */}

              {/* Sales */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-receipt" />
                  <span>{this.props.t("Sales")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/sales/add">{this.props.t("Add Sale")}</Link>
                  </li>
                  <li>
                    <Link to="/sales">{this.props.t("Sales")}</Link>
                  </li>
                </ul>
              </li>
              {/* End Sales */}

              {/* Ledger */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i className="bx bx-receipt" />
                  <span>{this.props.t("Ledger")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/ledger/add">{this.props.t("Add Ledger")}</Link>
                  </li>
                  <li>
                    <Link to="/ledger">{this.props.t("Ledger Logs")}</Link>
                  </li>
                </ul>
              </li>
              {/* End Ledger */}

              {/* Logs */}
              <li>
                <Link to="/logs" className="">
                  <i class="bx bxs-report" />
                  <span>{this.props.t("Logs")}</span>
                </Link>
              </li>
              {/* Logs */}

              {/* Settings */}
              <li>
                <Link to="/#" className="has-arrow">
                  <i class="bx bxs-book-content"></i>
                  <span>{this.props.t("Settings")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/users">{this.props.t("Users")}</Link>
                  </li>
                  <li>
                    <Link to="/users/login-activity">
                      {this.props.t("Login Activity")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="">
                      <span>{this.props.t("Settings")}</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* End Settings */}
            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    )
  }
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
}

export default withRouter(withTranslation()(SidebarContent))

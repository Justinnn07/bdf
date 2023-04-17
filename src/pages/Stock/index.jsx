import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import instance from "../../helpers/api/axiosHelper"
import MetaTags from 'react-meta-tags'
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import SupplierStockLogs from "./components/supplierStockLogs"
import BranchStockLogs from "./components/branchStockLogs"

const Stock = (props) => {

    // state
    const columnValues = [
        {type: "leaf", name: "Leaf", unit: "bags"},
        {type: "red_yarn", name: "Red Yarn", unit: "ladi"},
        {type: "jamula_yarn", name: "Yamula Yarn", unit: "ladi"},
        {type: "tobacco", name: "Tobacco", unit: "bags"},
        {type: "tobacco_1", name: "Nipali", unit: "bags"},
        {type: "tobacco_2", name: "Alina", unit: "bags"},
        {type: "tobacco_3", name: "Gujarat 2", unit: "bags"},
        // wrappers
        {type: "wrapper_p_10", name: "P 10 (wrapper)", unit: ""},
        {type: "wrapper_uttam_15", name: "UTTAM 15 (wrapper)", unit: ""},
        {type: "wrapper_uttam_20", name: "UTTAM 20 (wrapper)", unit: ""},
        {type: "wrapper_vajram", name: "VAJRAM (wrapper)", unit: ""},
        {type: "wrapper_vinay", name: "VINAY (wrapper)", unit: ""},
        {type: "zilli_p_10", name: "P 10 (wrapper)", unit: ""},
        {type: "zilli_uttam_15", name: "UTTAM 15 (wrapper)", unit: ""},
        {type: "zilli_uttam_20", name: "UTTAM 20 (wrapper)", unit: ""},
        {type: "zilli_vajram", name: "VAJRAM (wrapper)", unit: ""},
        {type: "zilli_vinay", name: "VINAY (wrapper)", unit: ""},

    ]
    const [stock, setStock] = useState({});
    const [loading, setLoading] = useState(true);
    const [stockTransite, setStockTransit] = useState({})
    const [loadingTransit, setLoadingTransit] = useState(true)
    const [type, setType] = useState("supplier")

    // use effect
    useEffect(() => {
        instance.get(`${process.env.REACT_APP_API_URL}/admin/stock`)
            .then((res) => {
                setStock(res.data);
                setLoading(false);
            });
        instance.get(`${process.env.REACT_APP_API_URL}/admin/stocktransit`)
            .then((res) => {
                setStockTransit(res.data);
                setLoadingTransit(false);
            });
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Stock | Admin</title>
                </MetaTags>
                <Container fluid>
                    <div className="d-flex justify-content-between mb-2">
                        <h4 className="my-auto">Stock</h4>
                        <div>
                            <Link to="/stock/add" className="btn btn-primary me-2">Add Stock</Link>
                            <Link to="/stock/create-tobacco" className="btn btn-primary">Add Tobacco</Link>
                        </div>
                    </div>
                    <Row>
                        {!loading && columnValues.map((row, key) =><Col lg={3}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex flex-wrap">
                                        <div className="me-3">
                                            <p className="text-muted mb-2">Total {row.name}</p>
                                            <h5 className="mb-0">
                                                {!loading && stock[row.type] + ` ${row.unit}`}
                                                {loading && <Spinner />}
                                            </h5>
                                        </div>

                                        <div className="avatar-sm ms-auto">
                                            <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                                                <i className="mdi mdi-leaf"></i>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        )}
                    </Row>
                    <div className="bg-white p-2">
                        <button onClick={() => setType("supplier")} className={`btn ${type === "supplier" ? 'btn-primary' : 'btn-white'} me-2`}>Supplier</button>
                        <button onClick={() => setType("branch")} className={`btn ${type === "branch" ? 'btn-primary' : 'btn-white'}`}>Branch</button>
                        <br /><br />
                        {type === "supplier" && <SupplierStockLogs />}
                        {type === "branch" && <BranchStockLogs />}
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

const Spinner = () => {
    return (
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    )
}

export default Stock;
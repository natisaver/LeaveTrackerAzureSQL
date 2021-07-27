import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import axios from "axios";

const LeaveScreen = (props) => {

    const [leaves, setLeaves] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            const {data} = await axios(`http://localhost:3002/api/users/${props.match.params.employee_id}`)
            setLeaves(data)
        }
        fetchData()

        console.log(leaves)

    }, [setLeaves]);

    const columns = [
        {dataField: 'id', text: 'S.N'}, 
        {dataField: 'ApplicationNo', text: 'Application No.', sort: true},
        {dataField: 'LeaveType', text: 'Leave Type', sort: true },
        {dataField: 'DateFrom', text: 'From', sort: true}, 
        {dataField: 'DateTo', text: 'To', sort: true},
        {dataField: 'Days', text: 'No. of Days', sort: true, headerStyle: {backgroundColor: '#c8e6c9'}},
        {dataField: 'DateEntry', text: 'Date Requested', sort: true },
        {dataField: 'Approved[0]', text: 'Approved?', sort: true,   style: (cell, row, rowIndex, colIndex) => {
            //https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnstyle-object-function
            if (cell === true) {
                return {
                backgroundColor: '#81c784'
                };
            }
            else return {
                backgroundColor: '#d97771'
            };
        }},

    ];

    const defaultSorted = [{
        dataField: 'DateFrom',
        order: 'desc'
    }];

    return (
        <>
            <Row>
                <Col md={9}>
                    <Row className="py-4">
                        <h4 >{leaves[0] ? leaves[0].Name : "No Data"}</h4>
                        <h6>{props.match.params.employee_id} | Leave History</h6>                        
                    </Row>

                    {/* class=> .react-bootstrap-table */}
                    <BootstrapTable keyField="id" data={ leaves } columns={ columns } defaultSorted={ defaultSorted } striped wrapperClasses="table-responsive" noDataIndication="No Leave History"/>
                </Col>

            </Row>  
        </>
    )

}

export default LeaveScreen

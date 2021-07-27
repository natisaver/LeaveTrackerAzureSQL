import React, { useEffect, useState } from 'react'
import { Row, Col } from "react-bootstrap";
// import Table from 'react-bootstrap/Table'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import axios from "axios";

const HomeScreen = ({history}) => {

    const [persons, setPersons] = useState([]);



    useEffect(()=>{
        const fetchData = async()=>{
            const {data} = await axios("http://localhost:3002/api/users")
            setPersons(data)
        }
        fetchData()

    }, [setPersons]);

    console.log(persons)

    const columns = [
        {dataField: 'id', text: 'S.N'}, 
        {dataField: 'Name', text: 'Name', sort: true},
        {dataField: 'Annual_Leaves', text: 'Annual', sort: true },
        {dataField: 'Medical_Leaves', text: 'Medical', sort: true}, 
        {dataField: 'Balance_Leave', text: 'Past Year Balance', sort: true},
        {dataField: 'No_Pay_Leave', text: 'No Pay', sort: true },
        {dataField: 'Not_Yet_Approved', text: 'Leaves in Process', sort: true, headerStyle: {backgroundColor: '#d97771'}} ,
        {dataField: 'Annual_Leaves_Entitled', text: 'AL Entitled', sort: true, headerStyle: {backgroundColor: '#c8e6c9'}},
        {dataField: 'Medical_Leaves_Entitled', text: 'ML Entitled', sort: true, headerStyle: {backgroundColor: '#c8e6c9'} }
    ];

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: '#00BFFF',
        onSelect: (row, isSelect, rowIndex, e) => {
            e.preventDefault()
            history.push(`/${row.EmployeeCode}`)
            // <Link to={`/${row.EmployeeCode}`}></Link>
            console.log(row);
            console.log(isSelect);
            console.log(rowIndex);
            console.log(e);
        }
    };
    

    return (
        <>
            <Row >
                <Row className="py-3">
                    <h4 >Employee List (Applied Leaves)</h4>
                    <h6>Click on a row to access more information</h6>
                </Row>


                {/* class=> .react-bootstrap-table */}
                <BootstrapTable keyField="id" selectRow={ selectRow } data={ persons } columns={ columns } striped wrapperClasses="table-responsive"/>
                {/* <Table striped bordered hover responsive variant="dark">
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Annual</th>
                            <th>Medical</th>
                            <th>Balance</th>
                            <th>No Pay</th>
                            <th>Waiting Approval</th>
                            <th>AL Entitled</th>
                            <th>ML Entitled</th>
                        </tr>
                    </thead>

                    <tbody>
                            {persons && persons.map((person, index)=>(
                                <Tablerow item = {person} index={index}/>
                            ))}
                    </tbody>
                </Table> */}
            </Row>  
        </>
    )

}

export default HomeScreen

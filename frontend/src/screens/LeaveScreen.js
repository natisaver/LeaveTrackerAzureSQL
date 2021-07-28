import {React, useEffect, useState, useRef } from 'react'
import { Row, Col } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import moment from "moment";

import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';


import axios from "axios";

const LeaveScreen = (props) => {


    const [leaves, setLeaves] = useState([]);
    const [latestNumber, setLatestNumber] = useState([])
    const buttonStatus = useRef(true)
    const [KeyID, setKeyID] = useState()
    const [AppNo, setAppNo] = useState()
    

    
    useEffect(()=>{
        const fetchData = async()=>{
            const firstResponse = await axios.get(`http://localhost:3002/api/users/${props.match.params.employee_id}`);
            const secondResponse = await axios.get("http://localhost:3002/api/latestnumber")
            // const [firstResponse, secondResponse] = await Promise.all([
            //     axios.get(`http://localhost:3002/api/users/${props.match.params.employee_id}`),
            //     axios.get("http://localhost:3002/api/latestnumber")
            // ])
            
            setLeaves(firstResponse.data)
            setLatestNumber(secondResponse.data[0])
            console.log(secondResponse.data)

        }

        fetchData()

        // const fetchData = async()=>{
        //     const {data} = await axios(`http://localhost:3002/api/users/${props.match.params.employee_id}`)
        //     setLeaves(data)
        // }
        // fetchData()

        // axios
        //     .all([fetchData1, fetchData2])
        //     .then(axios.spread((...responses)=>{
        //         setLeaves(responses[0].data)
        //         setLatestNumber(responses[1].data)
        //     })).catch(error=>{console.log(error)})

        // console.log(leaves)
        // console.log(latestNumber)

    }, []);
    
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

    //States to manage the date input
    const [dates, setDates] = useState({ startDate: null, endDate: null });
    const defaultFocusedInput = null;
    const [focusedInput, setFocusedInput] = useState(defaultFocusedInput);
    
    //leaves applied
    // const qty = useRef(null)
    
    const qty = useRef(null)

    const handleDatesChange = (dates) => {
        setDates(dates);
        const dayresult = renderDateDiff(dates.startDate, dates.endDate)
        buttonStatus.current = false
        setFormData(prevData=>{
            return {
            //    prev note with spread operator helps to store whatever previous value
                ...prevData,
            //    event.target.name must be same as key in the useState above for this to work
                DateFrom: dates.startDate,
                DateTo: dates.endDate, 
                DateIssued: dates.startDate,
                Days: dayresult,
                KeyID: latestNumber.KeyID, 
                ApplicationNo: latestNumber.ApplicationNo
            };
        });
    };

    const onFocusChange = (focusedInput) => {
        console.log(onFocusChange);
        setFocusedInput(focusedInput);
    };

    const renderDateDiff = (date1, date2) => {
        const diff = date1 && date2 ? date2.diff(date1, 'days')+1 : null;
        return diff

    };


    //handle form data
    var today = new Date();
    var currdatetime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // const keyidz = latestNumber[0].KeyID
    // const appno = latestNumber[0].ApplicationNo

    const [formData, setFormData] = useState({
        Branch: "HO", 
        EmployeeCode: props.match.params.employee_id, 
        LeaveType: "AL", 
        DateFrom: dates.startDate, 
        DateTo: dates.endDate, 
        DateIssued: dates.startDate, 
        Days: qty.current, 
        KeyID: latestNumber.KeyID,
        DateEntry: currdatetime, 
        DateModify: currdatetime, 
        UserID: null, 
        Approved: 0, 
        ApplicationNo: latestNumber.ApplicationNo,
    });

    function handleChange(event){
        const {name, value} = event.target; 
        setFormData(prevData=>{
            return {
            //    prev note with spread operator helps to store whatever previous value
                ...prevData,
            //    event.target.name must be same as key in the useState above for this to work
                [name]: value
            };
        });
    }

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        fetch("http://localhost:3002/api/submit", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        }).then(()=>{
            console.log("Leave Added");
            window.location.reload(false);
        })
    }

    return (
        <>
            <Row>
                <Col md={7}>
                    <Row className="py-4">
                        <h4 >{leaves[0] ? leaves[0].Name : "No Data"}</h4>
                        <h6>{props.match.params.employee_id} | Leave History</h6>                        
                    </Row>

                    {/* class=> .react-bootstrap-table */}
                    <BootstrapTable keyField="id" data={ leaves } columns={ columns } defaultSorted={ defaultSorted } striped wrapperClasses="table-responsive" noDataIndication="No Leave History"/>
                </Col>
                <Col md={1}></Col>
                <Col md={4} className="py-4">
                    <Row className="py-2">
                        <h4>Apply for a new Leave</h4>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <Row className="py-0">
                            <Form.Group as={Col} className="mb-1" controlId="formBasicDetail">
                                <Form.Label>Branch</Form.Label>
                                <Form.Control  type="text" readOnly defaultValue="HO" />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formBasicDetail">
                                <Form.Label>Employee Code</Form.Label>
                                <Form.Control type="text" readOnly defaultValue={props.match.params.employee_id}/>
                            </Form.Group>
                        </Row>

                        <Row className="py-1">
                            <Form.Group as={Col} className="mb-1" controlId="formBasicDetail">
                                <Form.Label>KeyID</Form.Label>
                                <Form.Control type="text" readOnly value={latestNumber.KeyID} name="KeyID"  onChange={handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formBasicDetail">
                                <Form.Label>Application No.</Form.Label>
                                <Form.Control type="text" readOnly value={latestNumber.ApplicationNo} name="EmployeeCode" onChange={handleChange} />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="formGridState">
                            <Form.Label>Leave Type</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="LeaveType" onChange={handleChange}>
                                <option>AL</option>
                                <option>MC</option>
                                <option>NPL</option>
                                <option>ALB</option>
                                <option>OTAL</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                Click field to make selection
                            </Form.Text>
                        </Form.Group>
                        
                        <Form.Group className="mb-3 py-3">
                        <Form.Label>Date Range of Leave</Form.Label>
                                <DateRangePicker
                                startDate={dates.startDate} 
                                endDate={dates.endDate} 
                                onDatesChange={handleDatesChange}
                                focusedInput={focusedInput || defaultFocusedInput}
                                onFocusChange={onFocusChange}
                                numberOfMonths={2}
                                showDefaultInputIcon
                                inputIconPosition="after"
                                minimumNights={0}
                                />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Days Applied</Form.Label>
                            <Form.Control required name="Days" type="number" value={renderDateDiff(dates.startDate, dates.endDate)} onChange={
                                    (e)=>{
                                        qty.current = e.target.value
                                        handleChange(e)
                                    }
                                } readOnly />
                        </Form.Group>


                        <Button disabled={buttonStatus.current} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>

            </Row>  
        </>
    )

}

export default LeaveScreen

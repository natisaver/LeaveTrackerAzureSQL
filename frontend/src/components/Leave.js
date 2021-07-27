import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Leave = (props) => {
    return (
        <Card border="secondary" style={{width: "350px"}} className="my-3 p-3 px-0 closer rounded">

            <Card.Body>
                <Link to={`/leave/${props.leave._id}`}>
                    <Card.Img src={props.leave.image} variant="top" fluid/>
                
                <Card.Title as="div">
                    <b>{props.leave.name}</b>
                </Card.Title>
                </Link>
                <Card.Text>
                    <div>{props.leave.policy1}</div>
                    <div>{props.leave.policy2}</div>              
                </Card.Text>
            </Card.Body>
            
        </Card>
    )
}

export default Leave

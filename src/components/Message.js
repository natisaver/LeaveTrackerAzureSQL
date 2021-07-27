import React from 'react'
import Alert from 'react-bootstrap/Alert'

const Message = (props) => {
    return (
        <Alert variant={props.variant}>
        <Alert.Heading>{props.error}</Alert.Heading>
        <p>
          {props.msg}
        </p>
      </Alert>
    )
}

Message.defaultProps = {
  variant: 'danger',
}

export default Message
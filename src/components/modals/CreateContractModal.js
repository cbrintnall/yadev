import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import GlobalNotificationManager from '../../gnm';
import * as colors from '../../colors';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { humanized_time_span } from '../../extra/humanized_time';
import { loggedIn } from '../../utils';
import { getAcceptedOffersWithNoEstimate, createNewContract } from '../../calls';
import { isEqual } from 'lodash';

const EstimateTab = (props) => {
  const [isValid, setValid] = useState(false);
  const [date, setDate] = useState("");

  const { contract } = props;

  const onSubmit = () => {
    if (!isValid) return;

    createNewContract({
      estimateDate: date,
      from: contract.from,
      to: contract.to,
      offer: contract._id
    })
      .then(_ => {
        if (props.completedSubmission) {
          props.completedSubmission(contract)
        }
      })
      .catch(_ => {
        GlobalNotificationManager.sendAlert("Failed to submit estimate.", false)
      })
  }

  return (
    <ListGroup.Item style={{border: "none"}}>
      <Row noGutters className="d-flex justify-content-center align-items-center">
        <Col
          lg={"auto"}
          md={"auto"}
          sm={"auto"}
          className="d-flex justify-content-center align-items-center"
        >
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text><span style={{color: "green"}}> ${ contract.offer } </span></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              style={{ paddingLeft: "1.25rem", borderRadius: 0, width: "100%" }}
              required
              type="date"
              onChange={e => {
                const val = e.target.value
            
                if (val) {
                  const sDate = new Date(val)
                  setDate(val)
                  setValid(!(sDate.toString() === "Invalid Date" || sDate < new Date()))
                }
              }}
              value={date}
              isValid={isValid}
              isInvalid={!isValid}
            />
            <InputGroup.Append>
              <Button 
                style={{backgroundColor: colors.yaDevPurple}}
                onClick={onSubmit}
              >
                Submit Estimate
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <br />
        </Col>
      </Row>
      <Row>
        <Col>
          <span style={{ fontSize: "10px", color: "darkgray" }}>
            Finalized {humanized_time_span(new Date(contract.createdAt))}
          </span>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

const CreateContractModal = (props) => {
  const [contracts, setContracts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (loggedIn()) {
      getAcceptedOffersWithNoEstimate()
        .then(res => {
          setContracts(res.data)
        })
        .catch(err => {
          GlobalNotificationManager.sendAlert('Server error grabbing accepted contracts', false);
        });
    }
  }, [])

  const onSubmission = contract => {
    const newContracts = 
      contracts.filter(c => !isEqual(c, contract))

    setContracts(newContracts);
  }

  const needsEstimates = contracts.filter(contract => !!contract.estimateDate)

  return (
    <Modal
      show={needsEstimates.length > 0 || show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton style={{backgroundColor: "lightgray", borderRadius: "12px"}}>
        <Modal.Title> Complete Estimates </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <ListGroup>
                {
                  needsEstimates
                  .map((contract, i) => {
                    return (
                      <div key={i}>
                        <EstimateTab 
                          contract={contract}
                          completedSubmission={onSubmission}
                        />
                        <hr style={{marginTop: ".1rem"}}/>
                      </div>
                    )
                  })
                }
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default CreateContractModal;
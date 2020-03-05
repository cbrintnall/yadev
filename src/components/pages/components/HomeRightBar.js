import React, { useRef, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import YouDevButton from '../../buttons/YouDevButton';
import Modal from 'react-bootstrap/Modal';
import * as colors from '../../../colors';
import GlobalNotificationManager from '../../../gnm';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getLatestContracts, notifyCompletion } from '../../../calls';
import { humanized_time_span } from '../../../extra/humanized_time';
import { FaCheck } from 'react-icons/fa';
import { loggedIn } from '../../../utils';

const oneWeek = 8 * 24 * 60 * 60 * 1000;

const renderTooltip = (props) => {
  return <Tooltip show="true"> This job is due soon! </Tooltip>
}

const ContractItem = (props) => {
  const getDate = (date) => {
    const nDate = new Date(date);
    return `${nDate.getMonth()+1}/${nDate.getDate()}/${nDate.getFullYear()}`
  }

  const [confirm, setConfirm] = useState(false);
  const overlayRef = useRef(null);
  const date = props.contract.estimateDate;
  const weekAway = new Date(date).getTime() - oneWeek;
  const withinWeek = new Date().getTime() > weekAway;
  const show = true;
  
  return (
    <>
      {/* TODO: Finish this. */}
      <OverlayTrigger overlay={renderTooltip} placement="left" show="false">
        <ListGroup.Item 
          ref={overlayRef}
          style={{
            padding: "0px", 
            overflow: "hidden",
            backgroundColor: withinWeek ? colors.rejectionRed : "inherit"
          }}
        >
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{
              color: withinWeek ? "white" : "inherit",
              padding: "8px 0px 8px 0px"
            }}
          >
            <span> Due: { getDate(date) } </span>
            <Badge style={{color: withinWeek ? "black": "darkgrey"}}> { humanized_time_span(date) } </Badge>
          </Row>
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{marginBottom: "6px"}}
          >
            <YouDevButton
              style={{
                backgroundColor: confirm ? colors.acceptanceGreen : colors.yaDevPurple,
                color: confirm ? "black" : "white"
              }}
              onClick={() => {
                if (confirm) {
                  if (props.onComplete) {
                    notifyCompletion(props.contract)
                      .then(res => {
                        console.log(res)
                        props.onComplete(props.contract)
                      })
                      .catch(err => {
                        GlobalNotificationManager.sendAlert('There was an error notifying the server of the completion', false);
                      });
                  }
                  setConfirm(false);
                } else {
                  setConfirm(true);
                }
              }}
            >
              { confirm ? "Are you sure?" : "Notify Complete" }
            </YouDevButton>
          </Row>
        </ListGroup.Item>
      </OverlayTrigger>
    </>
  )
}

const CompletionModal = (props) => {
  return (
    <Modal {...props} onHide={() => {props.onClose()}}>
      <Modal.Header style={{textAlign: "center"}}> 
        <Row style={{width: "100%"}}>
          <Col className="d-flex justify-content-center align-items-center">
            <h2> 🎉 You've completed a job! 🎉 </h2> 
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body style={{backgroundColor: "#747880", color: "white" }}>
        Congrats on completing a job, you're now at <span style={{color: colors.acceptanceGreen }}> REPLACE THIS AMT WITH AMT </span> completed! We'll
        notify the other user that you've finished and ask them to rank you.
      </Modal.Body>
      <Modal.Footer>
        <YouDevButton 
          onClick={() => {props.onClose()}}
        >
          Close
        </YouDevButton>
      </Modal.Footer>
    </Modal>
  )
}

class HomeRightBar extends React.Component {
  constructor() {
    super();

    this.state = {
      contracts: [],
      showingCompletion: false
    }

    GlobalNotificationManager.subscribe('new_contract', this.onNewContract)
  }

  onComplete = (contract) => {
    const newContracts = this.state.contracts.filter(c => c !== contract);

    this.setState({
      contracts: newContracts,
      showingCompletion: true
    })
  }

  onNewContract = (contract) => {
    this.setContracts([...this.state.contracts, contract])
  }

  setContracts = (contracts) => {
    // Filters contracts to those that are after today,
    // and then sorts them by comparing their times.
    return contracts
      .filter(contract => new Date(contract.estimateDate) > new Date())
      .sort((c, n) => new Date(c.estimateDate).getTime() - new Date(n.estimateDate).getTime())
  }

  componentDidMount = () => {
    if (loggedIn()) {
      getLatestContracts()
        .then(res => {
          this.setState({ contracts: this.setContracts(res.data) })
        })
        .catch(err => {
          GlobalNotificationManager.sendAlert("Failed to get latest contracts", false);
        })
    }
  }

  render() {
    return (
      <Col {...this.props} style={{ padding: 0 }}>
        <CompletionModal
          show={this.state.showingCompletion}
          onClose={() => { this.setState({showingCompletion: false}) }}
        />
        <ListGroup>
          <ListGroup.Item style={{position: "relative", backgroundColor: colors.yaDevGrey}}>
            In Progress:
          </ListGroup.Item>
          {
            this.state.contracts && 
            this.state.contracts.length > 0 ?
            this.state.contracts
              .map((contract, i) => <ContractItem onComplete={this.onComplete} key={i} contract={contract} />) :
            <ListGroup.Item>
              <Row className="d-flex justify-content-center align-items-center">
                NONE <FaCheck style={{color: colors.acceptanceGreen, marginLeft: ".5rem"}} />
              </Row>
            </ListGroup.Item>
          }
        </ListGroup>
      </Col>
    )
  }
}

export default HomeRightBar;

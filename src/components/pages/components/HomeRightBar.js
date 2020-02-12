import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import * as colors from '../../../colors';
import GlobalNotificationManager from '../../../gnm';
import { getLatestContracts } from '../../../calls';
import { humanized_time_span } from '../../../extra/humanized_time';

const oneWeek = 8 * 24 * 60 * 60 * 1000;

const ContractItem = (props) => {
  const getDate = (date) => {
    const nDate = new Date(date);

    return `${nDate.getMonth()+1}/${nDate.getDate()}/${nDate.getFullYear()}`
  }

  const date = props.contract.estimateDate;
  const weekAway = new Date(date).getTime() - oneWeek;
  const withinWeek = new Date().getTime() > weekAway;

  return (
    <ListGroup.Item style={{padding: "0px", overflow: "hidden"}}>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: withinWeek ? colors.rejectionRed : "inherit",
          color: withinWeek ? "white" : "inherit",
          padding: "8px 0px 8px 0px"
        }}
      >
        <span> Due: { getDate(date) } </span>
        <Badge style={{color: withinWeek ? "black": "darkgrey"}}> { humanized_time_span(date) } </Badge>
      </Row>
    </ListGroup.Item>
  )
}

class HomeRightBar extends React.Component {
  constructor() {
    super();

    this.state = {
      contracts: []
    }

    GlobalNotificationManager.subscribe('new_contract', this.onNewContract)
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
    getLatestContracts()
      .then(res => {
        console.log(res.data)
        this.setState({ contracts: this.setContracts(res.data) })
      })
      .catch(console.error)
  }

  render() {
    return (
      <Col {...this.props} style={{ padding: 0 }}>
        <ListGroup style={{ borderLeft: "3px solid black", borderBottom: "3px solid black" }}>
          <ListGroup.Item style={{backgroundColor: colors.yaDevGrey}}>
            In Progress:
          </ListGroup.Item>
          {
            this.state.contracts && this.state.contracts.length > 0 &&
            this.state.contracts
              .map((contract, i) => <ContractItem key={i} contract={contract} />)
          }
        </ListGroup>
      </Col>
    )
  }
}

export default HomeRightBar;
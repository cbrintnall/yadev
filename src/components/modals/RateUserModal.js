import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../Rating';
import GlobalNotificationManager from '../../gnm';
import Spinner from 'react-bootstrap/Spinner';
import YouDevButton from '../buttons/YouDevButton';
import * as colors from '../../colors';
import { getMissingRatings, createNewRating, getUser } from '../../calls';

const RateUserModal = (props) => {
  const [ratings, setRatings] = useState([]);
  const [users, setUsers] = useState([]);
  const [confirming, setConfirming] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [toSubmitRatings, setSubmissionRatings] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getMissingRatings()
      .then(res => {
        // 204 indicates no ratings to set.
        if (res.status === 200) {
          setRatings(res.data);

          Promise.all(
            res.data.map(r => getUser(r.to))
          )
            .then(res => {
              setUsers(res.map(u => u.data));

              setShow(true)
            });
        }
      })
      .catch(err => {
        console.error(err)
      });
  }, [])
  
  const getUsername = (_id) => {
    const usernames = 
      users.filter(u => u._id === _id);

    if (usernames.length === 0){
      return _id
    } else {
      return usernames[0].username;
    }
  }

  const submit = (r, amt) => {
    createNewRating(r.to, r._id, amt)
      .then(response => {
        setRatings(ratings.filter(rating => String(rating._id) !== String(response.data.relatedContract)))
      })
      .catch(err => {
        console.error(err)
      });
  }

  const submitAll = () => {
    setFinishing(true);

    toSubmitRatings.forEach(r => {
      submit(r.contract, r.rating);
    })

    setFinishing(false);
    setConfirming(false);
    setShow(false);

    return
  }

  const radius = "10px"
  const everyOtherColor = colors.yaDevBlue

  return (
    <Modal show={show} onHide={_ => { setShow(false); }}>
      <section style={{border: "3px solid black"}}>
        <Modal.Header closeButton style={{backgroundColor: colors.acceptanceGreen}}>
          <h3> Contracts finished! </h3>
        </Modal.Header>
        <Modal.Body style={{borderRadius: `${radius} ${radius} ${radius} ${radius}`}}>
          <p style={{backgroundColor: colors.yaDevGrey, borderRadius: "10px", padding: "10px"}}>
            Below is a column to rate the users who completed their work. Please give a fair rating to the user,
            as this reflects when people are browsing jobs in the future. If they did well, please rate well. 
            Hit <span style={{color: "white"}}>submit</span> when finished.
          </p>
          <hr />
          {
            ratings.length > 0 &&
            ratings.map((r, i) => {
              const isEven = Math.ceil(i%2) === 0;
              return (
                <Row key={i} style={{ margin: "10px" }}>
                  <Col style={{backgroundColor: isEven ? everyOtherColor : "inherit", borderRadius: "6px 0px 0px 6px", color: isEven ? "white" : "black"}}>
                    { getUsername(r.to) } 
                  </Col>
                  <Col className="d-flex justify-content-center" style={{backgroundColor: !isEven ? everyOtherColor : "white", borderLeft: "2px solid darkgray", borderRadius: "0px 6px 6px 0px"}}>
                    <Rating 
                      editable 
                      onClick={v => {
                        setSubmissionRatings([...toSubmitRatings, { contract: r, rating: v }])
                      }} 
                      style={{paddingBottom: ".3rem", fontSize: "24px", color: !isEven ? "lightgoldenrodyellow" : "gold"}}
                    />
                  </Col>
                </Row>
              )
            })
          }
        </Modal.Body>
        <Modal.Footer>
          <Row className="d-flex justify-content-center align-items-center" style={{width: "100%"}}>
            {
              !!feedback &&
              <Col className="d-flex justify-content-start align-items-center" style={{textAlign: "center"}}>
                <span style={{color: colors.rejectionRed}}> <strong>{feedback}</strong> </span>
              </Col>
            }
            {
              finishing && <Spinner animation="border"/>
            }
            <Col className="d-flex justify-content-end">
              <YouDevButton
                onClick={_ => {
                  if (confirming) {
                    if (toSubmitRatings.length > 0) {
                      setFeedback("");
                      submitAll();
                    } else {
                      setFeedback("No ratings to give, please rate at least one user.");
                      setConfirming(false);
                    }
                  } else {
                    setConfirming(true);
                  }
                }}
                style={{
                  backgroundColor: confirming ? colors.acceptanceGreen : colors.yaDevPurple, 
                  color: confirming ? "black" : "white",
                  padding: "12px 20px 12px 20px",
                  marginLeft: "1rem"
                }}
              >
                { confirming ? finishing ? "Submitting..." : "Confirm" : "Submit" }
              </YouDevButton>
            </Col>
          </Row>
        </Modal.Footer>
      </section>
    </Modal>
  )
}

export default RateUserModal;

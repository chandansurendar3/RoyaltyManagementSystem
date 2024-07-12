import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import Headermain from "../../header";
import { meta } from "../../content_option";
import TransactionReport from "../transactionreport";
import { PDFDownloadLink } from '@react-pdf/renderer';

export const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { userid } = useParams();
  const userId = userid;  

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/transactions/get/${userId}`);
        setTransactions(response.data);
        console.log(transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [userId]);

  return (
    <HelmetProvider>
      <Headermain page="managerDash" />
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="justify-content-center">
          <Col md={8}>
            {/* <h1 className="text-center">Account</h1>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>SAISH M</Card.Title>
                <Card.Text>UserName</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>******</Card.Title>
                <Card.Text>Password</Card.Text>
                <Button variant="link">Edit</Button>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>40000000000</Card.Title>
                <Card.Text>Revenue Generated</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>None</Card.Title>
                <Card.Text>Manager</Card.Text>
                <Button variant="link">Get a Manager</Button>
              </Card.Body>
            </Card> */}
            <h2 className="mt-5">Transactions</h2>
            {transactions.map(transaction => (
              <Card key={transaction.paymentId} className="mb-4">
                <Card.Body>
                  <Card.Title>Transaction ID: {transaction.paymentId}</Card.Title>
                  <Card.Text>Date: {transaction.dateCreated}</Card.Text>
                  <Card.Text>Amount: ${transaction.amount}</Card.Text>
                  <Card.Text>Account Number: {transaction.accountNumber}</Card.Text>
                  <Card.Text>Bank Name: {transaction.bankName}</Card.Text>
                  <Card.Text>Username: {transaction.username}</Card.Text>
                </Card.Body>
              </Card>
            ))}
            <div className="text-center mt-4">
              <PDFDownloadLink
                document={<TransactionReport transactions={transactions} />}
                fileName="transaction_report.pdf"
                className="btn btn-primary"
              >
                {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
              </PDFDownloadLink>
            </div>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};

export default Transaction;
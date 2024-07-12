import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import { PDFDownloadLink } from '@react-pdf/renderer';
 
// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '16.5%', // Adjusted width to evenly distribute across the table
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderBottomColor: '#000',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
  },
  tableCol: {
    width: '16.5%', // Adjusted width to evenly distribute across the table
    borderStyle: 'solid',
    borderColor: '#bfbfbf',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 2, // Reduced margin for header cells
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 2, // Reduced margin for table cells
    fontSize: 8,
  },
});
 
// Create Document Component
const TransactionReport = ({ transactions }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 20 }}>Transaction Report</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Transaction ID</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Date</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Account Number</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Bank Name</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Username</Text>
          </View>
        </View>
        {transactions.map(transaction => (
          <View style={styles.tableRow} key={transaction.paymentId}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{transaction.paymentId}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{transaction.dateCreated}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>${transaction.amount}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{transaction.accountNumber}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{transaction.bankName}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{transaction.username}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TransactionReport;


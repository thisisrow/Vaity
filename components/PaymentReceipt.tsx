'use client';

import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  total: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
});

// PDF Document component
const ReceiptDocument = ({ 
  paymentId,
  bookingDate,
  adults,
  children,
  pickupService,
  totalAmount,
  transactionDate
}: {
  paymentId: string;
  bookingDate: Date;
  adults: number;
  children: number;
  pickupService: boolean;
  totalAmount: number;
  transactionDate?: Date;
}) => {
  const formattedTransactionDate = transactionDate || new Date();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Adventure Park</Text>
          <Text>Payment Receipt</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Payment ID:</Text>
            <Text style={styles.value}>{paymentId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction Date:</Text>
            <Text style={styles.value}>{formattedTransactionDate.toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Booking Date:</Text>
            <Text style={styles.value}>{bookingDate.toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={{ fontSize: 14, marginBottom: 10 }}>Booking Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Adults:</Text>
            <Text style={styles.value}>{adults} × ₹1000 = ₹{adults * 1000}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Children:</Text>
            <Text style={styles.value}>{children} × ₹500 = ₹{children * 500}</Text>
          </View>
          {pickupService && (
            <View style={styles.row}>
              <Text style={styles.label}>Pickup Service:</Text>
              <Text style={styles.value}>₹300</Text>
            </View>
          )}
        </View>

        <View style={[styles.section, styles.total]}>
          <View style={styles.row}>
            <Text style={[styles.label, { fontSize: 14 }]}>Total Amount:</Text>
            <Text style={[styles.value, { fontSize: 14 }]}>₹{totalAmount}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Adventure Park - Vaity Resort, Virar West</Text>
          <Text>Contact: +91 70587 12714</Text>
        </View>
      </Page>
    </Document>
  );
};

interface PaymentReceiptProps {
  paymentDetails: {
    paymentId: string;
    bookingDate: Date;
    adults: number;
    children: number;
    pickupService: boolean;
    totalAmount: number;
  };
}

export function PaymentReceipt({ paymentDetails }: PaymentReceiptProps) {
  return (
    <div className="flex justify-center mt-4">
      <PDFDownloadLink
        document={<ReceiptDocument {...paymentDetails} />}
        fileName={`receipt-${paymentDetails.paymentId}.pdf`}
      >
        {({ loading }) => (
          <Button disabled={loading}>
            <Download className="mr-2 h-4 w-4" />
            {loading ? "Generating Receipt..." : "Download Receipt"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
}
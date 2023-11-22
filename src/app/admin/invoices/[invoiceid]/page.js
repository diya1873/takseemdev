"use client"
import React from 'react'

function InvoiceDetails(props) {
    const invoiceid=props.params.invoiceid
  return (
    <div>InvoiceDetails {JSON.stringify(invoiceid)}</div>
  )
}

export default InvoiceDetails
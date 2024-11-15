import React from "react";
import QRCode from "react-qr-code";
import "./invoice.css";
import InvoiceInput from "../Elements/Forms/InvoiceInput";
import PaymentLoading from "./PaymentLoading";
import backIcon from "../../assets/icons/back-icon.svg";
import handleError from "../../utils/handleError";
import { checkWebln } from "../../utils/checkWebln";

function invoice({ invoice, goBack }) {
  const payInvoice = async () => {
    if (checkWebln()) {
      await window.webln.sendPayment(invoice.paymentRequest);
    } else {
      handleError("WebLN is not enabled");
    }
  };
  return (
    <div>
      <img onClick={goBack} src={backIcon} width={"20px"}></img>
      <div onClick={payInvoice} className="invoice">
        <div>
          <QRCode
            size={100}
            style={{ height: "auto", maxWidth: "150px", width: "150px" }}
            value={invoice.paymentRequest}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
      <p className="invoice-text">Click the invoice to pay</p>
      <div>
        <InvoiceInput invoice={invoice.paymentRequest} />
      </div>

      <PaymentLoading invoice={invoice} />
    </div>
  );
}

export default invoice;

import React from "react"
import ReactDOM from "react-dom"
import AddressForm from "./AddressForm"

it("renders AddressForm", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddressForm />, div);
});

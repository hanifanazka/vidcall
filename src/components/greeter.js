import * as React from "react"

const greeterStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
}

const Greeter = ({ children }) => <div style={greeterStyle}>{children}</div>

export default Greeter

import * as React from "react"
import { Navbar, Nav } from "react-bootstrap"

const TopNav = () => (
  <Navbar>
    <Navbar.Brand href="/">Vidcall</Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
      <Nav.Link href="/">Login</Nav.Link>
    </Navbar.Collapse>
  </Navbar>
)

export default TopNav

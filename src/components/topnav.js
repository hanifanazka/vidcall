import * as React from "react"
import { Navbar, Nav, Tooltip, Overlay } from "react-bootstrap"

const Login = () => {
  const [show, setShow] = React.useState(false);
  const target = React.useRef(null);

  return (
    <>
      <Nav.Link ref={target} onClick={() => setShow(!show)} onBlur={() => setShow(false)}>Login</Nav.Link>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Coming Soon
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

const TopNav = () => (
  <Navbar>
    <Navbar.Brand href="/">Vidcall</Navbar.Brand>
    <Navbar.Collapse className="justify-content-end">
      <Login/>
    </Navbar.Collapse>
  </Navbar>
)

export default TopNav

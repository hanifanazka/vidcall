import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as fa from "@fortawesome/free-solid-svg-icons"
import { Button, ButtonGroup, Modal, Navbar, Nav } from "react-bootstrap"


const PlayerControl = ({ mediaDevice, ...props }) => {
    return (
        <div {...props}>
            {mediaDevice.cameras.length > 1 &&
                <Button variant="dark" onClick={() => mediaDevice.swapCamera()} style={{color: "white"}}>
                    <FontAwesomeIcon icon={fa.faSync} />
                </Button>
            }
        </div>
    )
}

export default PlayerControl

import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as fa from "@fortawesome/free-solid-svg-icons"
import { Button, ButtonGroup } from "react-bootstrap"


const PlayerControl = ({ mediaDevice, endCall, ...props }) => {
    return (
        <div {...props}>
            <ButtonGroup>
            {mediaDevice.state.camera ? 
            <Button variant="light" onClick={() => mediaDevice.toggle("video")}>
              <FontAwesomeIcon icon={fa.faVideo} />
            </Button>
            :
            <Button className="border-left" variant="light" onClick={() => mediaDevice.toggle("video")}>
              <FontAwesomeIcon icon={fa.faVideoSlash} />
            </Button>
            }
            {mediaDevice.state.mic ?
            <Button className="border-left" variant="light" onClick={() => mediaDevice.toggle("audio")}>
              <FontAwesomeIcon icon={fa.faMicrophone} />
            </Button>
            :
            <Button className="border-left" variant="light" onClick={() => mediaDevice.toggle("audio")}>
              <FontAwesomeIcon icon={fa.faMicrophoneSlash} />
            </Button>
            }
            {mediaDevice.state.screen ?
            <Button className="border-left" variant="light" onClick={() => mediaDevice.toggle("screen")}>
              <FontAwesomeIcon icon={fa.faDesktop} />
            </Button>
            :
            <Button className="border-left" variant="light" onClick={() => mediaDevice.toggle("screen")}>
              <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon={fa.faSlash} transform="down-2" mask={fa.faDesktop}/>
                <FontAwesomeIcon icon={fa.faSlash} transform="up-.5"/>
              </span>
            </Button>
            }
            </ButtonGroup>{` `}
            <Button variant="danger" onClick={() => endCall(true)} style={{color: "white"}}>
              <FontAwesomeIcon icon={fa.faPhone} />
            </Button>
    </div>
    )
}

export default PlayerControl

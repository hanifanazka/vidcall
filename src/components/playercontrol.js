import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as fa from "@fortawesome/free-solid-svg-icons"
import { Button, ButtonGroup, Modal, Navbar, Nav } from "react-bootstrap"


const PlayerControl = ({ mediaDevice, endCall, ...props }) => {
  const [videoOn, setVideoOn] = React.useState(true)
  const [audioOn, setAudioOn] = React.useState(false)
  const [screenOn, setScreenOn] = React.useState(false)

  React.useEffect(() => {
    if (mediaDevice) {
      mediaDevice.toggle("Video", videoOn)
      mediaDevice.toggle("Audio", audioOn)
      mediaDevice.toggle("Screen", screenOn)
    }
  })

  /**
   * Turn on/off a media device
   * @param {String} deviceType - Type of the device eg: Video, Audio
   */
  const toggleMediaDevice = deviceType => {
    if (deviceType === "video") {
      if (!videoOn && screenOn) {
        setScreenOn(false)
        setVideoOn(true)
      } else {
        setVideoOn(!videoOn)
      }
      // mediaDevice.toggle("Video")
    }
    if (deviceType === "audio") {
      setAudioOn(!audioOn)
      // mediaDevice.toggle("Audio")
    }
    if (deviceType === "screen") {
      if (!screenOn && videoOn) {
        setVideoOn(false)
        setScreenOn(true)
      } else {
        setScreenOn(!screenOn)
      }
      // mediaDevice.toggle("Screen")
    }
  }

  return (
    <div {...props}>
      {/*videoOn ? 
      <button onClick={() => toggleMediaDevice("video")}>
        <FontAwesomeIcon icon={fa.faVideo} />
      </button>
      :
      <button onClick={() => toggleMediaDevice("video")}>
        <FontAwesomeIcon icon={fa.faVideoSlash} />
      </button>
      }
      {audioOn ?
      <button onClick={() => toggleMediaDevice("audio")}>
        <FontAwesomeIcon icon={fa.faMicrophone} />
      </button>
      :
      <button onClick={() => toggleMediaDevice("audio")}>
        <FontAwesomeIcon icon={fa.faMicrophoneSlash} />
      </button>
      }
      {screenOn ?
      <button onClick={() => toggleMediaDevice("screen")}>
        <FontAwesomeIcon icon={fa.faDesktop} />
      </button>
      :
      <button onClick={() => toggleMediaDevice("screen")}>
        <span className="fa-layers fa-fw">
          <FontAwesomeIcon icon={fa.faSlash} transform="down-2" mask={fa.faDesktop}/>
          <FontAwesomeIcon icon={fa.faSlash} transform="up-.5"/>
        </span>
      </button>
      */}{/*
      <button onClick={() => endCall(true)} style={{background: "red", color: "white"}}>
        <FontAwesomeIcon icon={fa.faPhone} />
      </button>
      */}
      <ButtonGroup>
      {videoOn ? 
      <Button variant="light" onClick={() => toggleMediaDevice("video")}>
        <FontAwesomeIcon icon={fa.faVideo} />
      </Button>
      :
      <Button className="border-left" variant="light" onClick={() => toggleMediaDevice("video")}>
        <FontAwesomeIcon icon={fa.faVideoSlash} />
      </Button>
      }
      {audioOn ?
      <Button className="border-left" variant="light" onClick={() => toggleMediaDevice("audio")}>
        <FontAwesomeIcon icon={fa.faMicrophone} />
      </Button>
      :
      <Button className="border-left" variant="light" onClick={() => toggleMediaDevice("audio")}>
        <FontAwesomeIcon icon={fa.faMicrophoneSlash} />
      </Button>
      }
      {screenOn ?
      <Button className="border-left" variant="light" onClick={() => toggleMediaDevice("screen")}>
        <FontAwesomeIcon icon={fa.faDesktop} />
      </Button>
      :
      <Button className="border-left" variant="light" onClick={() => toggleMediaDevice("screen")}>
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

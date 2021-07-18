import * as React from "react"
import { Link } from "gatsby"
import Peer from "peerjs"
import QRCode from "qrcode.react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as fa from "@fortawesome/free-solid-svg-icons"

import "./player.css"

const initiatorGreeter = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
}

const Player = ({ stream, mediaDevice, endCall }) => {
  const [videoOn, setVideoOn] = React.useState(true)
  const [audioOn, setAudioOn] = React.useState(false)
  const video = React.useRef()

  React.useEffect(() => {
    if (video.current && stream) video.current.srcObject = stream
  })

  React.useEffect(() => {
    if (mediaDevice) {
      mediaDevice.toggle("Video", videoOn)
      mediaDevice.toggle("Audio", audioOn)
    }
  })

  /**
   * Turn on/off a media device
   * @param {String} deviceType - Type of the device eg: Video, Audio
   */
  const toggleMediaDevice = deviceType => {
    if (deviceType === "video") {
      setVideoOn(!videoOn)
      mediaDevice.toggle("Video")
    }
    if (deviceType === "audio") {
      setAudioOn(!audioOn)
      mediaDevice.toggle("Audio")
    }
  }

  return (
    <div className="player">
      <video autoplay muted ref={video} />
      <div className="video-control">
        <button onClick={() => toggleMediaDevice("video")}>
          <FontAwesomeIcon icon={fa.faVideo} />
        </button>
        <button onClick={() => toggleMediaDevice("audio")}>
          <FontAwesomeIcon icon={fa.faMicrophone} />
        </button>
        <button nClick={() => endCall(true)}>
          <FontAwesomeIcon icon={fa.faPhone} />
        </button>
      </div>
    </div>
  )
}

const Initiator = () => {
  const [id, setId] = React.useState()
  const [stream, setStream] = React.useState()

  let peer

  React.useEffect(() => {
    peer = new Peer()

    peer.on("open", setId)

    peer.on("call", call => {
      call.on("stream", setStream)
      call.answer()
    })
  }, [])

  return <Player /> /*id
        ? stream
            ? <Player stream={stream} />
            : (
                <div style={initiatorGreeter}>
                    <QRCode value={id} />
                    <Link to={"/" + id}>Open</Link>
                </div>
            )
        : <p>Loading...</p>*/
}

export default Initiator

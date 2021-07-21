import * as React from "react"
import PlayerControl from "./playercontrol"
import Video from "./video"

import "../styles/player.css"

const Player = ({ stream, muted, mediaDevice, endCall, flip, fullscreen }) => {
  const [controlHover, setControlHover] = React.useState(false)
  const [show, setShow] = React.useState(true)
  const [showTimeout, setShowTimeout] = React.useState(true)

  let whenMouseMoves = () => {
    setShow(true)
    clearTimeout(showTimeout)
    setShowTimeout(
      setTimeout(() => {
        if (!controlHover) setShow(false)
      }, 1000)
    )
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        display: "inline-block",
        lineHeight: "0",
        zIndex: "-1",
      }}
      onMouseMove={() => mediaDevice && endCall ? whenMouseMoves() : null}
    >
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <Video
          stream={stream}
          muted={muted}
          flip={flip}
          loop
          style={{ height: "100%", width: "100%" }}
        />
        {mediaDevice && endCall && show ? (
          <PlayerControl
            style={{
              position: "absolute",
              width: "100%",
              bottom: 0,
              padding: "20px 0",
              textAlign: "center",
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
            }}
            onMouseEnter={() => setControlHover(true)}
            onMouseLeave={() => setControlHover(false)}
          />
        ) : null}
      </div>
    </div>
  )
}

/*
not-fullscreen
<div
      style={{
        position: "relative",
        backgroundColor: "#ededed",
        display: "inline-block",
        lineHeight: "0"
      }}
    >
    */

export default Player

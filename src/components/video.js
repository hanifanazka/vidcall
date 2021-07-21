import * as React from "react"

const Video = ({ stream, muted, flip, ...props }) => {
  const video = React.useRef()

  React.useEffect(() => {
    if (video.current && stream) video.current.srcObject = stream
  })
  return <video style={flip ? {transform: "rotateY(180deg)"} : {}} autoPlay muted={!!muted} playsInline ref={video} {...props}/>
}

export default Video

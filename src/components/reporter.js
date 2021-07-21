import * as React from "react"
import Peer from "peerjs"
import Player from "./player"
import { navigate } from "@reach/router"
import { Button, Modal, Navbar, Nav } from "react-bootstrap"

/* global navigator */

const Reporter = ({ call, location, myId, initiator }) => {
  const [stream, setStream] = React.useState()
  const [newUrl, setNewUrl] = React.useState("")
  const [frontCamera, setFrontCamera] = React.useState(true)
  const [peer, setPeer] = React.useState()

  const constraint = {
    video: true,
    audio: true,
  }

  React.useEffect(() => {
    const peer = new Peer(myId)
    peer.on("open", () => {
      navigator.mediaDevices.getUserMedia(constraint).then(mediaStream => {
        console.log("Got media")
        peer.call(call, mediaStream)
        setStream(mediaStream)
        const dataConnection = peer.connect(call)
        dataConnection.on("open", () => {
          dataConnection.on("data", data => {
            console.log("receive from DC: ", data)
            const newUrl =
              location.origin +
              location.pathname +
              "?id=" +
              data.reporterId +
              "&c=" +
              data.viewerId +
              "&i=" +
              call
            dataConnection.send("quit")
            console.log("navigate To New URL")
            navigate(newUrl)
          })
        })

        peer.on("connection", dataConnection => {
          console.log("Got connection")
          // TODO: Call only trusted peer
          peer.call(dataConnection.peer, mediaStream)
        })
      })
    })
    setPeer(peer)
  }, [])

  const toggleCamera = () => {
    
    const options = {
    video: {facingMode: !frontCamera ? 'user' : "environment"},
    audio: true,
  }
  setFrontCamera(!frontCamera)
  
    // Stop the tracks
    const tracks = stream.getTracks()
    tracks.forEach(track => track.stop())

    // Provide new options
    navigator.mediaDevices.getUserMedia(options).then(mediaStream => {
      peer.call(initiator, mediaStream)
      peer.call(call, mediaStream)
      setStream(mediaStream)
    })
}

  return (<>
  <Player stream={stream} muted={true} flip={true} />
  <Button onClick={()=>toggleCamera()}>Toggle</Button>
  </>)
}

export default Reporter

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
    const [cameraMute, setCameraMute] = React.useState(false)
    const [micMute, setMicMute] = React.useState(false)
    const [screenMute, setScreenMute] = React.useState(true)
    const [peer, setPeer] = React.useState()
    const [cameras, setCameras] = React.useState([])

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

        navigator.mediaDevices.enumerateDevices().then(devices =>
            setCameras(devices.filter(({ kind }) => kind === "videoinput"))
        )

    }, [])

    React.useEffect(() => {
        const options = {
            video: !cameraMute ? { facingMode: !frontCamera ? 'user' : "environment" } : false,
            audio: !micMute,
        }

        if (stream) {
            // Stop the tracks
            const tracks = stream.getTracks()
            tracks.forEach(track => track.stop())
        }

        if (peer && !(cameraMute && micMute && screenMute)) {
            if (!cameraMute)
            navigator.mediaDevices.getUserMedia(options).then(mediaStream => {
                peer.call(initiator, mediaStream)
                peer.call(call, mediaStream)
                setStream(mediaStream)
            })
            if (!screenMute)
            navigator.mediaDevices.getDisplayMedia().then(mediaStream => {
                peer.call(initiator, mediaStream)
                peer.call(call, mediaStream)
                setStream(mediaStream)
            // @TODO : Add audio stream to mediaStream
            })
        }
    }, [cameraMute, micMute, frontCamera])

    const swapCamera = () => {
        setFrontCamera(!frontCamera)
    }

    const toggleMedia = (device, ) => {
        switch (device) {
            case 'video':
                if (cameraMute && !screenMute) {
                    setScreenMute(true)
                    setCameraMute(false)
                }
                else setCameraMute(!cameraMute);
                break;

            case 'audio':
                setMicMute(!micMute)
                break;

            case 'screen':
                if (!cameraMute && screenMute) {
                    setScreenMute(false)
                    setCameraMute(true)
                }
                else setScreenMute(!screenMute);
                break;
        }
    }


    const mediaDevice = {
        toggle: toggleMedia,
        swapCamera,
        cameras,
        state: {
            camera: !cameraMute,
            mic: !micMute,
            screen: !screenMute
        }
    }

    return <Player stream={stream} muted={true} flip={true} mediaDevice={mediaDevice} endCall={()=>null}/>
}

export default Reporter

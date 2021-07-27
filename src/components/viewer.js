import * as React from "react"
import Peer from "peerjs"
import Player from "../components/player"

const Viewer = ({ location, myId, listenId }) => {
    const [stream, setStream] = React.useState()
    
    React.useEffect(() => {
        const peer = new Peer(myId)
        peer.on("open", () => {
            const dataConnection = peer.connect(listenId)
            dataConnection.on("open", () => console.log("peer pingged"))
        })
        peer.on("call", call => {
            call.answer()
            call.on("stream", setStream)
    })
        
    }, [])
    return <Player stream={stream} muted={true}/>
}

export default Viewer
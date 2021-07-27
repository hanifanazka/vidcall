import * as React from "react"
import Peer from "peerjs"

const PeerJS = ({ id, config, children, on, connect }) => {
    let peer
    
    React.useEffect(() => {
        peer = new Peer(id, config)
        
        Object.keys(on).forEach(event => {
            peer.on(event, on[event])
        })
    }, [])
    
    return (
        children()
    )
}

export default PeerJS
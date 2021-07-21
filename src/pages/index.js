import * as React from "react"

import Seo from "../components/seo"
import TopNav from "../components/topnav"
import Loadable from "@loadable/component"
import Player from "../components/player"
import { Button, Modal, Navbar, Nav } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css"

const Initiator = Loadable(() => import("../components/initiator"))
const Reporter = Loadable(() => import("../components/reporter"))
const Viewer = Loadable(() => import("../components/viewer"))

const IndexPage = ({ location }) => {
  // https://stackoverflow.com/a/901144
  const getParameterByName = (name, url = location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

  const myId = getParameterByName("id")
  const listenId = getParameterByName("l")
  const callId = getParameterByName("c")
  const initiatorId = getParameterByName("i")

  const isViewer = !!(myId && listenId)
  const isReporter = !!callId
  

  return (
    <>
      <Seo title="homepage" />

      {isReporter || isViewer ? (
        isViewer ? (
          <Viewer location={location} myId={myId} listenId={listenId} />
        ) : (
          <Reporter location={location} myId={myId} call={callId} initiator={initiatorId}/>
        )
      ) : (
        <>
          <TopNav />
          <Initiator location={location} />
        </>
      )}
      {/* <Initiator location={location}/> */}
      {/* <Player mediaDevice={{toggle: ()=>null}} endCall={()=>null}/> */}
    </>
  )
}

export default IndexPage

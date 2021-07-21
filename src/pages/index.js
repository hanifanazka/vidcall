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
  const myId = new URL(window.location.href).searchParams.get("id")
  const listenId = new URL(window.location.href).searchParams.get("l")
  const callId = new URL(window.location.href).searchParams.get("c")
  const initiatorId = new URL(window.location.href).searchParams.get("i")

  const isViewer = !!(myId && listenId)
  const isReporter = !!callId

  const getParameter = name => {
    return new URL(location.href).searchParams.get(name)
  }

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


const LoadableIndexPage = Loadable(() => import("./index"))
export default LoadableIndexPage

import * as React from "react"
import { Link } from "gatsby"
import Peer from "peerjs"
import QRCode from "qrcode.react"
import Video from "./video"
import Greeter from "./greeter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as fa from "@fortawesome/free-solid-svg-icons"
import * as uuid from "uuid"
import { Button, Container, Row, Col } from "react-bootstrap"
import ContentLoader from 'react-content-loader'


/* global navigator */

const Initiator = ({ location }) => {
  const [id, setId] = React.useState("")
  const [stream, setStream] = React.useState()
  const [viewerLink, setViewerLink] = React.useState("")


  React.useEffect(() => {
    const peer = new Peer()

    peer.on("open", setId)

    peer.on("call", call => {
      call.answer()
      call.on("stream", setStream)
    })

    peer.on("connection", dataConnection => {
      // Generate viewer link
      const reporterId = dataConnection.peer
      const viewerId = uuid.v4()
      setViewerLink(location.origin + location.pathname + "?id=" + viewerId + "&l=" + reporterId)
      dataConnection.on("open", () => {
        dataConnection.send({viewerId, reporterId})
        dataConnection.on("data", (data) => {
          console.log("got data", data)
        })
      })
    })
  }, [])

  return (
    <div>
      <Container className="pt-5">
        <Row>
          <Col>
            <div className="display-4">Scan barcode untuk memulai</div>
            <p className="lead">
              Mulai gunakan perangkat mobile anda untuk menambahkan sumber video
              ke <i>streaming software</i> anda.
            </p>
            {id ? (
            <a
              className="btn btn-outline-primary"
              href={location.origin + location.pathname + "?c=" + id}
              target="_blank"
              rel="noopener"
            >
              Gunakan perangkat ini
            </a>
            ) : (
              <ContentLoader width={210} height={42}>
                <rect x="0" y="0" rx="2" ry="2" width="210" height="42"/>
              </ContentLoader>
            )}
          </Col>
          <Col className="text-right">
            {id ? (
              stream ? (
                <>
                  <Video className="img-fluid" stream={stream} muted={true} />
                  <a href={viewerLink}>{viewerLink}</a>
                </>
              ) : (
                <div style={{ position: "relative" }}>
                  <a
                    href={location.origin + location.pathname + "?c=" + id}
                    target="_blank"
                    rel="noopener"
                  >
                    <QRCode
                      style={{
                        backgroundColor: "white",
                        padding: "8px",
                        borderRadius: "2px",
                        boxShadow: "0px 0px 12px 0px rgba(0,0,0,0.2)",
                      }}
                      size={256}
                      value={location.origin + location.pathname + "?c=" + id}
                    />
                  </a>
                  <Button
                    variant="success"
                    style={{
                      height: "50px",
                      minWidth: "50px",
                      textAlign: "center",
                      borderRadius: "50%",
                      position: "absolute",
                      bottom: "-20px",
                      right: "-20px",
                    }}
                    onClick={() =>
                      navigator.share({
                        url: location.origin + location.pathname + "?c=" + id,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={fa.faShare} />
                  </Button>
                </div>
              )
            ) : (
              <ContentLoader width={256} height={256}>
                <rect x="0" y="0" rx="2" ry="2" width="256" height="256"/>
              </ContentLoader>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Initiator

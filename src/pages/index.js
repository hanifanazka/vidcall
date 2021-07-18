import * as React from "react"

import Seo from "../components/seo"
import Loadable from "@loadable/component"
const Initiator = Loadable(() => import("../components/initiator"))

const IndexPage = () => (
  <>
    <Seo title="homepage" />
    <Initiator />
  </>
)

export default IndexPage

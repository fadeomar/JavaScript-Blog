import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout pageTitle="Oops !! not fuond">
    <SEO title="404: Not found" />
    <Link className="btn btn-primary">Back to Home</Link>
  </Layout>
)

export default NotFoundPage

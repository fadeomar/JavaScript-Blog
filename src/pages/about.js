import React from "react"
import { graphql } from "gatsby"

const AboutPage = ({ data }) => (
  <main>
    <h1>About the Author</h1>
    {console.log(data)}
    <p>Welcome to my Gatsby site.</p>
  </main>
)

export default AboutPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`

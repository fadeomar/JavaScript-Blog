const { slugify } = require("./src/util/utility")
const path = require("path")

const authors = require("./src/util/authors")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // Page templates
  const templates = {
    post: path.resolve("src/templates/singlePost.js"),
    tagsPage: path.resolve("src/templates/tags-page.js"),
    tag: path.resolve("src/templates/tag-posts.js"),
  }

  const res = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  if (res.errors) return Promise.reject(res.errors)

  // Extracting all posts from res
  const posts = res.data.allMarkdownRemark.edges

  // Create single post pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: templates.post,
      context: {
        // Passing slug for template to use to fetch the post
        slug: node.fields.slug,
        // Find author imageUrl from author array and pass it to template
        imageUrl: authors.find(x => x.name === node.frontmatter.author)
          .imageUrl,
      },
    })
  })

  // Get all tags
  let tags = []
  _.each(posts, edge => {
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })

  let tagPostCounts = {} // { tutorial: 2, design: 1}
  tags.forEach(tag => {
    // Or 0 cause it might not exist yet
    tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
  })

  // Remove duplicates
  tags = _.uniq(tags)

  // Tags page (all tags)
  createPage({
    path: "/tags",
    component: templates.tagsPage,
    context: {
      tags,
      tagPostCounts,
    },
  })

  // Tag posts pages
  tags.forEach(tag => {
    createPage({
      path: `/tag/${_.kebabCase(tag)}`,
      component: templates.tag,
      context: {
        tag,
      },
    })
  })
}

import React, { Component } from "react"
import Ad from "./components/ad/Ad"
import ErrorMessage from "./components/error/Error"
import Welcome from "./components/welcome/Welcome"
import Navigator from "./components/nav/navbar"
import * as API from "./shared/http"
import parseLinkHeader from "parse-link-header"
import orderBy from "lodash/orderBy"
import Post from "./components/post/Post"
import PropTypes from "prop-types"

/**
 * The app component serves as a root for the project and renders either children,
 * the error state, or a loading state
 * @method App
 * @module letters/components
 */
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      loading: false,
      posts: [],
      endpoint: `${
        process.env.ENDPOINT
      }/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_expand=user&_embed=likes`
    }
    this.getPosts = this.getPosts.bind(this)
  }

  static propTypes = {
    children: PropTypes.node
  }

  componentDidMount() {
    this.getPosts()
  }

  componentDidCatch(err, info) {
    console.error(err)
    console.error(info)
    this.setState(() => ({
      error: err
    }))
  }

  getPosts() {
    API.fetchPosts(this.state.endpoint)
      .then(res => {
        return res.json().then(posts => {
          const links = parseLinkHeader(res.headers.get("Link"))
          this.setState(() => ({
            posts: orderBy(this.state.posts.concat(posts), "date", "desc"),
            endpoint: links.next.url
          }))
        })
      })
      .catch(err => {
        this.setState(() => ({
          error: err
        }))
      })
  }
  render() {
    if (this.state.error) {
      return (
        <div className="app">
          <ErrorMessage error={this.state.error} />
        </div>
      )
    }
    return (
      <div className="app">
        <Navigator user={this.props.user} />
        {this.state.loading ? (
          <div className="loading">
            <Loader />
          </div>
        ) : (
          <div className="home">
            <Welcome key="welcome" />
            <div>
              {this.state.posts.length && (
                <div className="posts">
                  {this.state.posts.map(({ id }) => {
                    return <Post id={id} key={id} user={this.props.user} />
                  })}
                </div>
              )}
              <button className="block" onClick={this.getPosts}>
                Load more posts
              </button>
            </div>
            <div>
              <Ad
                url="https://ifelse.io/book"
                imageUrl="/static/assets/ads/ria.png"
              />
              <Ad
                url="https://ifelse.io/book"
                imageUrl="/static/assets/ads/orly.jpg"
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App

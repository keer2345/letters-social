import React, { Component } from "react"
import Ad from "./components/ad/Ad"
import ErrorMessage from "./components/error/Error"
import Welcome from "./components/welcome/Welcome"
import Navigator from "./components/nav/navbar"
import * as API from "./shared/http"
import parseLinkHeader from "parse-link-header"
import orderBy from "lodash/orderBy"

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
  }

  componentDidMount() {
    this.getPosts()
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
        <Navigator />
        {this.state.loading ? (
          <div className="loading">loading...</div>
        ) : (
          <div className="home">
            <Welcome key="welcome" />
            <div>
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

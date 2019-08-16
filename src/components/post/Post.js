import React, { Component } from "react"
import * as API from "../../shared/http"
import PropTypes from "prop-types"
import Loader from "../Loader"
import UserHeader from "./UserHeader"
import Content from "./Content"
import Image from "./Image.js"
import Link from "./Link"

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null,
      comments: [],
      showComments: false
      // user: this.props.user
    }
    this.loadPost = this.loadPost.bind(this)
  }
  componentDidMount() {
    this.loadPost(this.props.id)
  }
  loadPost(id) {
    API.fetchPost(id)
      .then(res => res.json())
      .then(post => {
        console.log(post)
        this.setState(() => ({ post }))
      })
  }
  render() {
    if (!this.state.post) {
      return <Loader />
    }
    return (
      <div className="post">
        <UserHeader date={this.state.post.date} user={this.state.post.user} />
        <Content post={this.state.post} />
        <Image post={this.state.post} />
        <Link link={this.state.post.link} />
      </div>
    )
  }
}

export default Post

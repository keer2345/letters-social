import fetch from "isomorphic-fetch"
import Cookies from "js-cookie"

/**
 * Generates a Fetch confiugration object so we can share headers
 * @method generateFetchConfig
 * @param  {string}            method      HTTP verb
 * @param  {object}            [body=null] payload for post/put
 * @return {object}                        config
 */
function generateFetchConfig(method, body = null) {
  const upCasedMethod = method.toUpperCase()
  const token = Cookies.get("letters-token")
  const config = {
    method: upCasedMethod,
    headers: {
      "Content-Type": "application/json",
      "Letters-Token": token
    },
    credentials: "same-origin"
  }
  if (["POST", "PUT"].includes(upCasedMethod)) {
    config.body = JSON.stringify(body)
  }
  return config
}

/**
 * Fetch posts from the API
 * @method fetchPosts
 * @param  {string}   endpoint URL provided by Redux; the API will yield further endpoints we can access via the Link Header (https://www.w3.org/wiki/LinkHeader)
 * @return {Response}          Fetch API Response
 */
export function fetchPosts(endpoint) {
  return fetch(endpoint)
}

/**
 * Fetch a post from the API
 * @method fetchPost
 * @param  {string}  id post ID
 * @return {Response}     Fetch Response object
 */
export function fetchPost(id) {
  return fetch(
    `${
      process.env.ENDPOINT
    }/posts/${id}?_embed=comments&_expand=user&_embed=likes`
  )
}

#

# USERS endpoints

## register an account

`[POST] https://justpost8-api.herokuapp.com/auth/register`

requires: `{username: "string", password: "string"}`

## login to an account

`[POST] https://justpost8-api.herokuapp.com/auth/login`

requires: `{username: "string", password: "string"}`

## register an admin account (to obtain admin token)

`[POST] https://justpost8-api.herokuapp.com/auth/admin-register`

requires: `{username: "string", password: "string"}`

## get user by id

`[GET] https://justpost8-api.herokuapp.com/auth/users/:id`

## get all users

`[GET] https://justpost8-api.herokuapp.com/admin-access/users`

requires admin token

# POSTS endpoints

## post on the wall

`[POST] https://justpost8-api.herokuapp.com/posts/create`

requires: `{ post_title: "string", post_body: "string", user_id: number}`

returns: `{ "post_id": 4, "post_title": "Hello World!", "post_body": "Im alive!!", "posted_at": "2021-08-28 18:25:13", "user_id": 1 }`

## get all posts

`[GET] https://justpost8-api.herokuapp.com/posts`

## get post by post_id

`[GET] https://justpost8-api.herokuapp.com/posts/:post_id`

## get all posts by user with user_id

`[GET] https://justpost8-api.herokuapp.com/auth/users/:id/posts`

## edit/update a post by post_id

`[PUT] https://justpost8-api.herokuapp.com/posts/:post_id`

requires `{ post_title: "string", post_body: "string", user_id: number}`

## delete a post by post_id

`[DELETE] https://justpost8-api.herokuapp.com/posts/:post_id `

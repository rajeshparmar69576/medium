import { Hono } from 'hono'

const app = new Hono()

app.post('/api/v1/user/signup', (c) => {
  return c.text('thsi is user signup route')
})

app.post('/api/v1/user/signin', (c) => {
    return c.text('this is user signin route')
})


app.post('/api/v1/blog', (c) => {
    return c.text('this is blog post route')
})


app.put('/api/v1/blog', (c) => {
    return c.text('this is blog put route')
})

app.get('/api/v1/blog/bulk', (c) => {
    return c.text('This is route for getting all blogs')
})


app.get('/api/v1/blog/:id', (c) => {
    const id = c.req.param('id')
    console.log(id);
    return c.text('this is route to get single blogs')
})



export default app

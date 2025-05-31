import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify} from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

// middleware
blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || "";

    // Bearer token 
    const token = header.split(" ")[1]

    const user = await verify(token, c.env.JWT_SECRET)
    if (user) {
        c.set("userId", user.id as string);
        await next();
    }
    else {
        c.status(403)
        return c.json({error:"You are not logged in"})
   }
})


blogRouter.post('/', async (c, next) => {
    const body = await c.req.json();
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })

        return c.json({
            id:blog.id
        })
    
    } catch (e) {
        c.status(411)
        return c.json({
            error:"error while posting blog"
        })
   }
})


blogRouter.put('/', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.update({
            where: {
                id:body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({
            id:blog.id
        })
    
    } catch (e) {
        c.status(411)
        return c.json({
            error:"error while updating blogpost"
        })
   }
})

blogRouter.get('/', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id:body.id
            },
        })

        return c.json({
            blog
        })
    
    } catch (e) {
        c.status(411)
        return c.json({
            error:"error while fetching blog post"
        })
   }
})

// should add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogs = await prisma.post.findMany();

        return c.json({
            blogs
        })
    
    } catch (e) {
        c.status(411)
        return c.json({
            error:"error while fetching all blogPosts"
        })
   }
})

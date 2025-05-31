import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from "@rajeshparmar69576/medium-common";


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

    if (!header) {
        c.status(401)
        return c.json({ error:"Authorization header missing or malformed"});
    }

    // Bearer token 
    const token = header

    try {
        const user = await verify(token, c.env.JWT_SECRET);
        c.set("userId", user.id as string);
        await next();
    } catch (err) {
        c.status(403);
        return c.json({ error: "Invalid or expired token" });
    }
})


blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({
            message:"Inputs are not correct"
        })
    }
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
    const { success } = updateBlogInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            message:"Inputs are invalid"
        })
    }

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

blogRouter.get('/:id', async (c) => {
    const id = await c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id:id
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



import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { signupInput,SigninInput, signinInput } from "@rajeshparmar69576/medium-common";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET:string
    }
}>();

userRouter.post('/signup', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const { success } = signupInput.safeParse(body);
        if (!success) {
            c.status(411)
            return c.json({
                message:"inputs are not correct"
            })
        }
        const user = await prisma.user.create({
            data: {
                name:body.name,
                email: body.email,
                password:body.password
            },
        })
    
        const token = await sign({ id: user.id,name:user.name }, c.env.JWT_SECRET)
        return c.json({
            jwt:token
        })
    } catch (e) {
        c.status(403)
        return c.json({
            error:"error while signup"
        })
    }
})

userRouter.post('/signin', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json()

        const { success } = signinInput.safeParse(body)
        if (!success) {
            c.status(411)
            return c.json({
                message:"Inputs are not correct"
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password:body.password
            }
        });

        if (!user) {
            c.status(403);
            return c.json({
                error:"user not found"
            })
        }

        const token = await sign({ id: user.id,name:user.name }, c.env.JWT_SECRET)
        return c.json({
            jwt: token
        });

    } catch (e) {
        c.status(403);
		return c.json({ error: "error while signing in" });
    }
})
import bcrypt from "bcrypt"

import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export async function POST(
  request: Request
) {
  const body = await request.json()
  const { email, name, password } = body

  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    return NextResponse.json(user)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return NextResponse.json({ error: 'Email already used' }, { status: 409 })
      }
    }
  }
}
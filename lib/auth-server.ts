import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import {prisma} from "@/lib/prisma"

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET não definido");
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET)


export async function getCurrentUser(){
    const cookieStore = await cookies()
    const token = cookieStore.get("session_token")?.value


    if (!token) {
    throw new Error("Não autenticado")
  }


  const { payload } = await jwtVerify(token, secret)

console.log("PAYLOAD COMPLETO:", payload)
console.log("USER ID DO PAYLOAD:", payload.id)


  const user = await prisma.user.findUnique({
    where: { id: payload.id as string }
  })

  console.log("este é o user ========================== " + user)

  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  return user
}

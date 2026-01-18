import { cookies } from "next/headers";
import { decrypt } from "../actions/auth";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;

  const user = token ? await decrypt(token) : null;

  return (
    <div>
      <h1>Olá, {user?.name}</h1>
      <p>Você está acessando uma rota protegida</p>
    </div>
  );
}

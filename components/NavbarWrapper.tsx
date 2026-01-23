import { cookies } from "next/headers";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const cookieStore = await cookies(); // 👈 penting
  const session = cookieStore.get("session");

  return <Navbar isLoggedIn={!!session} />;
}

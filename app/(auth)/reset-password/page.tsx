import ResetPasswordClient from "./ResetPasswordClient";

// Paksa halaman ini jadi dynamic route
export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default function Page() {
  return <ResetPasswordClient />;
}
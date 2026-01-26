export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}

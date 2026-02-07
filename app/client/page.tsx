"use client";

import FormCriar from "@/app/client/components/createForm";

export default function PageClient() {
  return (
<div className="min-h-screen
        flex flex-col
        gap-12 sm:gap-16
        px-2 sm:px-0
        items-center
        justify-center">

      <FormCriar />
    </div>
  );
}

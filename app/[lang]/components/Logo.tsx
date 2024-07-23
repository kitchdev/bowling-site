"use client";
import Image from "next/image";

export default function Logo({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <Image
      src="/logo.jpg"
      width={width}
      height={height}
      alt="SWA logo"
      style={{
        width: "auto",
        height: "auto",
      }}
      priority
    />
  );
}

"use client";
import Image from "next/image";
import logo from "@/public/bowlingLogo.svg";

export default function Logo({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <Image src={logo} width={width} height={height} alt="SWA logo" priority />
  );
}

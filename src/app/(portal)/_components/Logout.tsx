"use client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/register")}>
      <LogOut /> Logout
    </Button>
  );
};

export default Logout;

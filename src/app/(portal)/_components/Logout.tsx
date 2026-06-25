"use client";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/register")}>
      <LogOut /> Logout
    </Button>
  );
};

export default Logout;

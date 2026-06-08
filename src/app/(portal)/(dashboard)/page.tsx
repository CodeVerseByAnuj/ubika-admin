import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-14 flex items-center justify-between px-4 border-b">
      <h1 className="text-xl font-semibold">Yubika</h1>
      <Button asChild>
        <Link href={"/register"}>Register</Link>
      </Button>
    </div>
  );
}

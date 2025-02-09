import { LoginForm } from "@/components/login-form";
import "@/app/globals.css";
export default function Page() {
  return (
    <div className="flex h-[calc(100svh-156px)] w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

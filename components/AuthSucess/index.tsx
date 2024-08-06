import { AtSign } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/utils/context/authContext";

export default function AuthSucess() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    return logout();
  };
  return (
    <main className="w-full h-screen flex justify-center items-center flex-col space-y-3">
      <section className="flex justify-center items-center flex-col">
        <AtSign size={64} className="text-primary" />
        <h1 className="text-3xl font-bold tracking-tight select-none">Autenticado com sucesso!</h1>
        <p className="text-muted-foreground text-xs select-none">
          Você está logado no sistema como{" "}
          <span className="text-primary font-mono font-bold select-all">
            {user?.email}.
          </span>
        </p>
      </section>
      <section>
        <Button onClick={() => handleLogout()}>Prosseguir</Button>
      </section>
    </main>
  );
}

"use client";

import AuthSucess from "@/components/AuthSucess";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/services/database/firebase";
import { useAuth } from "@/utils/context/authContext";
import { GoogleAuthProvider } from "firebase/auth";
import { Infinity, AtSign } from "lucide-react";

export default function Home() {
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSignInWithGoogle = () => {
    const signInProvider = new GoogleAuthProvider();
    signInWithGoogle(auth, signInProvider);

    toast({
      title: "Entrando com Google",
      description: "Você está sendo redirecionado para o Google",
      duration: 3000,
    });

  };

  if (auth.currentUser?.email === "creattek.team@gmail.com"){
    return <AuthSucess />
  }
else {
  return (
    <main className="h-screen overflow-hidden w-full flex items-center justify-center select-none">
      <div className="flex flex-col justify-center items-center space-y-4 w-full">
        <div className="flex flex-col justify-center items-center">
          <Infinity />
          <h1 className="font-bold text-xl tracking-tighter">
            Entre na infinity
          </h1>
          <p className="text-muted-foreground text-sm">
            Entre usando sua conta{" "}
            <code className="font-mono font-bold text-primary">
              @creattek.team.
            </code>
          </p>
        </div>
        <Button
          onClick={handleSignInWithGoogle}
          variant={"outline"}
          className="gap-2 bg-gray-900/50 text-xs max-w-xl w-[300px]"
        >
          <AtSign size={16} />
          Entre usando uma conta <code>creattek.team</code>
        </Button>

        <p className="text-xs text-muted-foreground max-w-[256px] text-center">
          Clicando em continuar, você concorda com nossos{" "}
          <a className="font-bold text-primary underline cursor-pointer">
            Termos de serviço
          </a>{" "}
          e{" "}
          <a className="font-bold text-primary underline cursor-pointer">
            Termos de uso.
          </a>
        </p>
      </div>
    </main>
  );
}
}
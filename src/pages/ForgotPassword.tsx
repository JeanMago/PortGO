// src/pages/ForgotPassword.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
});

const ForgotPassword = () => {
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Solicitação de redefinição de senha para:", values.email);
    alert("Seu pedido de redefinição de senha foi enviado para o e-mail informado. Por favor, verifique sua caixa de entrada. (Apenas demonstrativo)");
    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-xl dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center">
          <Link to="/" className="flex justify-center mb-4">
            {/* 3. A logo agora muda com base no tema */}
            <img
              src={import.meta.env.VITE_API_URL + (theme === 'dark' ? '/PortGO_logo branco.png' : '/PortGO_logo preto.png')}
              alt="PortGO Logo"
              className="h-24 w-auto"
            /></Link>
          <CardTitle className="text-3xl font-bold">Esqueceu a Senha?</CardTitle>
          <CardDescription className="text-gray-600">
            Insira seu e-mail abaixo e enviaremos um link para redefinir sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2">
                Redefinir Senha
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Lembrou da senha?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Voltar para o login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
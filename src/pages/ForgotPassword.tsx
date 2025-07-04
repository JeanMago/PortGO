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
import { useTheme } from "@/components/ThemeProvider"; // O hook já estava importado corretamente

// Definição do Schema para validação do formulário
const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um endereço de e-mail válido." }),
});

// Nomes dos arquivos de logo
const lightLogo = "/PortGO_logo.png"; // Logo para o tema claro (fundo claro)
const darkLogo = "/PortGO_logo branco.png"; // Logo para o tema escuro (fundo escuro)

const ForgotPassword = () => {
  // 1. Obter o tema atual usando o hook
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
    // 2. Usar a cor de fundo padrão do tema ao invés de um gradiente fixo
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {/* 3. Escolher o logo dinamicamente com base no tema */}
            <img
              src={theme === 'dark' ? darkLogo : lightLogo}
              alt="PortGO Logo"
              className="h-24 w-auto"
            />
          </div>
          <CardTitle className="text-3xl font-bold">Esqueceu a Senha?</CardTitle>
          {/* 4. Usar a cor de texto secundário do tema para melhor contraste */}
          <CardDescription className="text-muted-foreground">
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
              {/* 5. Remover estilos de gradiente fixo para que o botão se adapte ao tema */}
              <Button type="submit" className="w-full">
                Redefinir Senha
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            Lembrou da senha?{" "}
            {/* 6. Usar a cor primária do tema para o link */}
            <Link to="/login" className="text-primary hover:underline">
              Voltar para o login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
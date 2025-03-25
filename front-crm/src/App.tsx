import {Link} from "react-router-dom"
import { ArrowRight, BarChart3, Calendar, CheckCircle, Clock, Sparkles, Users } from "lucide-react"



export default function Home() {

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    if(id === '/'){
      window.scrollTo({ top: 0, behavior: "smooth" });
    }


  };
  

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full flex h-16 items-center justify-between py-10 px-8">
          <div className="flex items-center gap-2 font-bold">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span>FreelancerCRM</span>
          </div>
          <nav className="hidden gap-6 md:flex">
          <button  className="text-sm font-medium transition-colors hover:text-primary cursor-pointer" onClick={() => scrollToSection("/")}>Home</button>
          <button  className="text-sm font-medium transition-colors hover:text-primary cursor-pointer" onClick={() => scrollToSection("features")}>features</button>
          <button  className="text-sm font-medium transition-colors hover:text-primary cursor-pointer" onClick={() => scrollToSection("pricing")}>pricing</button>
            {/* <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/#features" className="text-sm font-medium transition-colors hover:text-primary">
              Recursos
            </Link>
            <Link to="/#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Planos
            </Link> */}
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <button  >
                Entrar
              </button>
            </Link>
            <Link to="/signup">
              <button >Cadastrar</button>
            </Link>
          </div>
        </div>
      </header>


      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-purple-600 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>
        <div className="w-full relative grid items-center gap-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-12">
          <div className="flex max-w-[640px] flex-col items-start gap-4">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm backdrop-blur">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              <span>A solução completa para freelancers</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Gerencie seus projetos freelancer com facilidade
            </h1>
            <p className="text-lg text-white/80 md:text-xl">
              Organize clientes, projetos, prazos e pagamentos em um só lugar. Aumente sua produtividade e foque no que
              realmente importa.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/signup">
                <button  className="gap-1.5">
                  Começar agora
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/pricing">
                <button
                  className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  Ver planos
                </button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur">
              <div className="h-full w-full overflow-hidden rounded-xl bg-background">
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Dashboard Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-24 w-full bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Trusted By Section */}
      <section className="w-full py-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-xl font-medium text-muted-foreground">
            Utilizado por freelancers e agências em todo o Brasil
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Empresa A", "Agência B", "Studio C", "Consultoria D", "Marca E"].map((company) => (
              <div key={company} className="text-2xl font-bold text-muted-foreground/50">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24" id="features">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Recursos Poderosos
          </div>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Tudo o que você precisa em um só lugar
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            Gerencie todo o seu trabalho freelancer com ferramentas intuitivas e poderosas
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Gestão de Clientes</h3>
              <p className="text-muted-foreground">
                Cadastre e organize todos os seus clientes com informações detalhadas e histórico completo.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Cadastro completo de clientes</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Histórico de interações</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Organização por categorias</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Projetos e Tarefas</h3>
              <p className="text-muted-foreground">
                Crie projetos, defina tarefas e acompanhe o progresso de cada trabalho em tempo real.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Gerenciamento de projetos</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Acompanhamento de prazos</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Divisão em tarefas e etapas</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:scale-150"></div>
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Controle de Tempo</h3>
              <p className="text-muted-foreground">
                Registre as horas trabalhadas em cada projeto e gere relatórios detalhados.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Cronômetro integrado</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Relatórios por projeto</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                  <span>Exportação de dados</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="w-full">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Como Funciona</div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Simplifique seu fluxo de trabalho
            </h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Três passos simples para transformar a gestão do seu negócio freelancer
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 text-xl font-bold">Cadastre seus clientes</h3>
              <p className="mt-2 text-muted-foreground">
                Adicione informações detalhadas sobre seus clientes e mantenha tudo organizado.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 text-xl font-bold">Crie seus projetos</h3>
              <p className="mt-2 text-muted-foreground">
                Defina projetos, estabeleça prazos e divida o trabalho em tarefas gerenciáveis.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 text-xl font-bold">Acompanhe e fature</h3>
              <p className="mt-2 text-muted-foreground">
                Registre o tempo trabalhado, acompanhe o progresso e gere faturas automaticamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Depoimentos</div>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">O que nossos usuários dizem</h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            Freelancers e agências que transformaram seus negócios com o FreelancerCRM
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              name: "Ana Silva",
              role: "Designer Freelancer",
              quote:
                "O FreelancerCRM transformou completamente a forma como gerencio meus projetos. Economizo horas por semana em tarefas administrativas.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Carlos Oliveira",
              role: "Desenvolvedor Web",
              quote:
                "Finalmente encontrei uma ferramenta que entende as necessidades de um freelancer. O controle de tempo e faturamento é simplesmente perfeito.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
            {
              name: "Mariana Santos",
              role: "Agência de Marketing",
              quote:
                "Gerenciar múltiplos clientes e projetos nunca foi tão fácil. Nossa produtividade aumentou em 40% desde que começamos a usar o FreelancerCRM.",
              avatar: "/placeholder.svg?height=100&width=100",
            },
          ].map((testimonial, index) => (
            <div key={index} className="flex flex-col rounded-2xl border bg-background p-8 shadow-sm">
              <div className="flex-1">
                <p className="text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plans Section */}
      <section className="bg-gradient-to-br from-muted/50 via-muted/30 to-transparent py-16 md:py-24" id="pricing">
        <div className="w-full">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Planos e Preços
            </div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Escolha o plano ideal para você
            </h2>
            <p className="max-w-[85%] text-muted-foreground sm:text-lg">
              Opções flexíveis para freelancers e agências de todos os tamanhos
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {/* Basic Plan */}
            <div className="relative rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <div className="absolute -right-3 -top-3 rounded-full bg-muted px-3 py-1 text-xs font-medium">Grátis</div>
              <h3 className="text-2xl font-bold">Básico</h3>
              <p className="mt-1 text-muted-foreground">Para freelancers iniciantes</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">R$0</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Até 5 clientes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Até 10 projetos</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Controle básico de tempo</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Dashboard básico</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/plan-selection?plan=basic" className="w-full">
                  <button className="w-full">Começar grátis</button>
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-2xl border-2 border-primary bg-background p-8 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute -right-3 -top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Mais popular
              </div>
              <h3 className="text-2xl font-bold">Profissional</h3>
              <p className="mt-1 text-muted-foreground">Para freelancers em crescimento</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">R$49</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Clientes ilimitados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Projetos ilimitados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Controle avançado de tempo</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Relatórios personalizados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Exportação de dados</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Suporte por email</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/plan-selection?plan=pro" className="w-full">
                  <button className="w-full" >
                    Assinar agora
                  </button>
                </Link>
              </div>
            </div>

            {/* Business Plan */}
            <div className="relative rounded-2xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-2xl font-bold">Empresarial</h3>
              <p className="mt-1 text-muted-foreground">Para equipes e agências</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">R$99</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Tudo do plano Profissional</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Múltiplos usuários (até 5)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Integrações avançadas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>Personalização de marca</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  <span>API para desenvolvedores</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/plan-selection?plan=business" className="w-full">
                  <button className="w-full">Escolher plano</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-8 text-center text-white md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">Pronto para transformar seu negócio?</h2>
          <p className="mx-auto mt-4 max-w-lg text-white/80">
            Junte-se a milhares de freelancers que estão economizando tempo e aumentando sua produtividade com o
            FreelancerCRM.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/signup">
              <button className="gap-1.5">
                Começar agora
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link to="/contact">
              <button  className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                Fale conosco
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 md:py-16">
        <div className="w-full">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <div className="flex items-center gap-2 font-bold">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span>FreelancerCRM</span>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-left">
                A solução completa para freelancers e agências
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-8 lg:grid-cols-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Produto</h3>
                <Link to="/features" className="text-sm text-muted-foreground hover:text-foreground">
                  Recursos
                </Link>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                  Planos
                </Link>
                <Link to="/roadmap" className="text-sm text-muted-foreground hover:text-foreground">
                  Roadmap
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Empresa</h3>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  Sobre nós
                </Link>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                  Carreiras
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Suporte</h3>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contato
                </Link>
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                  Documentação
                </Link>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Legal</h3>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Termos
                </Link>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacidade
                </Link>
                <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-muted pt-8 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} FreelancerCRM. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


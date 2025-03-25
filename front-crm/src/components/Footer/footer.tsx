

export const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0 bg-amber-400">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} FreelancerCRM. Todos os direitos reservados.
        </p>
        <div className="flex gap-4">
          
        </div>
      </div>
  </footer>
  )
}

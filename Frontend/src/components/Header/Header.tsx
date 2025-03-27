import { Menu } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

type HeaderProps = {
    setSidebarOpen: (open: boolean) => void;
  };
  
  function Header({ setSidebarOpen }: HeaderProps) {

    const { logout,authuser } = useAuthStore();

    return (
		<header className="bg-[#FFFFFF] border-b border-solid border-b-blue-100/500  text-blue-900 shadow-md p-3 flex items-center justify-between">
			<button className="md:hidden" onClick={() => setSidebarOpen(true)}>
				<Menu size={24} />
			</button>

			<h1 className="text-xl font-bold">{authuser?.name}</h1>
			<button className="cursor-pointer btn btn-sm w-14 p-2 rounded-md text-white font-bold bg-black" onClick={logout}>Sair </button>
		</header>
    );
  }


  export default Header
import { Menu ,LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
// import {Button} from "@heroui/react";
import { Button } from "@/components/ui/button"


type HeaderProps = {
    setSidebarOpen: (open: boolean) => void;
};
  
const Header = ({ setSidebarOpen }: HeaderProps)=> {

    const { logout,authuser } = useAuthStore();

    return (
		<header className="w-full bg-[#FFFFFF] border-b border-solid border-b-blue-100/500  text-blue-900 shadow-md py-2 px-1  md:px-4 md:py-4 flex items-center justify-between">
			<button className="md:hidden" onClick={() => setSidebarOpen(true)}>
				<Menu size={24} />
			</button>

			<h1 className="text-xl font-bold">{authuser?.name}</h1>

      		<Button color="secondary" onClick={logout} >Sair <LogOut className=" h-4 w-4" /> </Button>
		
		</header>
    );
  }


  export default Header
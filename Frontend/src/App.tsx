import { Toaster } from "react-hot-toast";
import RoutesComponent from "./routes/routes";


export default function Home() {
  return (
      <div>
         <Toaster position="top-center" reverseOrder={false} toastOptions={{
          duration:4000
        }}/>
        <RoutesComponent />

      </div>
  )
}


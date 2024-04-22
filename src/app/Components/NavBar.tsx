import { ToggleTheme } from "./ToggleTheme";

export const Navbar = ()=>{
    return(
    <div className="border-b border-purple-700 flex justify-between p-1 items-center">
    <h1 className="text-xl font-bold mx-2" >Dictionary  </h1>
    <ToggleTheme/>
    </div>
    )
}
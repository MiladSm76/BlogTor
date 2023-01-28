import Navbar from "@/pages/Navbar";
import { FC } from "react";
// type DashboardLayoutProps = {
//     children: React.ReactNode,
//   };
interface myprops {
  children:React.ReactNode
}
const Layout:FC<myprops> = ({children}) => {
  return (
    <>
    <Navbar/>
    <main>{children}</main>
    </>
  )

}

export default Layout
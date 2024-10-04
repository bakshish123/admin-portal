// components/NavbarWrapper.tsx
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options"; // Adjust the path based on your structure
import Navbar from "./Nav";

const NavbarWrapper: React.FC = async () => {
  const session = await getServerSession(options);

  return <Navbar session={session} />;
};

export default NavbarWrapper;

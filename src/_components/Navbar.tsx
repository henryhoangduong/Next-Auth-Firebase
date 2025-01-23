import React from "react";
import { AiFillBug } from "react-icons/ai";
import Link from "next/link";
import { Avatar, Flex, Container } from "@radix-ui/themes";
import { useAuthContext } from "@/context/AuthContext";
const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="border-b mb-5 px-2 py-5 w-full border">
      <Container className="w-full px-0 py-5">
        <Flex justify="between" align="center" className="w-full">
          <Link href="/home">
            <AiFillBug />
          </Link>
          <Link href="admin">
            <Avatar
              src={user?.photoURL || undefined}
              fallback="?"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </Link>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;

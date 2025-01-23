"use client";
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Flex, Avatar } from "@radix-ui/themes";
import { Card } from "@radix-ui/themes";
import { Callout, Text , Button} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { signOutUser } from "@/firebase/auth/signout";
import toast from "react-hot-toast";
const Admin = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSignOut = async () => {
    const { success, error } = await signOutUser()
    if (success) {
      toast.success("Successful sign out")
    } else {
      toast.error("Fail sign out")
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (user == null) router.push("/auth/signin");
  }, [user]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="mt-40 gap-3"
    >
      <Card>
        <Flex direction="row" gap="3" align="center">
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
          />
          <Text as="div" size="2" color="gray">
            {user?.email}{" "}
          </Text>
        </Flex>
      </Card>
      <Callout.Root size="1">
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>Only logged in users can view this page.</Callout.Text>
          </Callout.Root>
          <Button onClick={handleSignOut}>Log out</Button>
    </Flex>
  );
};

export default Admin;

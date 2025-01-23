"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import { Card, TextField, Flex, Button } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { Spinner } from "@radix-ui/themes";
import Link from "next/link";
import toast from "react-hot-toast";
const SignIn = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    const { result, error } = await signIn({ email, password });

    if (error) {
      setLoading(false);
      toast.error("Sign in fail");
      return console.log(error);
    }

    // else successful
    toast.success("Successful sign in");
    console.log(result);
    setLoading(false);
    return router.push("/admin");
  };
  return (
    <Flex direction="column" align="center" justify="center" className="mt-10">
      <Card className="w-[30%]">
        <Text size="7">Sign In</Text>
        <form onSubmit={handleForm} className="form gap-5 flex flex-col">
          <label htmlFor="email" className="flex flex-col gap-2">
            <Text>Email</Text>
            <TextField.Root
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-2">
            <Text>Password</Text>
            <TextField.Root
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <Button type="submit" size="3">
            {loading ? <Spinner /> : "Sign in"}
          </Button>
        </form>
        <Link href={"signup"} className="mt-10">
          Don&apos;t have an account? Click here to sign up
        </Link>
      </Card>
    </Flex>
  );
};

export default SignIn;

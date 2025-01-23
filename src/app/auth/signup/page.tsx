"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { Spinner } from "@radix-ui/themes";
import { Card, TextField, Flex, Button } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import toast from "react-hot-toast";

const SignUp = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const router = useRouter();
  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signUp({ email, password });

    if (error) {
      toast.error("Fail sign up");
      setLoading(false);
      setEmail("");
      setPassword("");
      return console.log(error);
    }

    // else successful
    toast.success("Successful sign up");
    console.log(result);
    setLoading(false);

    return router.push("/admin");
  };
  return (
    <Flex direction="column" align="center" justify="center" className="mt-10">
      <Card className="w-[30%]">
        <Text size="7">Sign up</Text>
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
              value={email}
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
              value={password}
            />
          </label>
          <Button type="submit" size="3">
            {loading ? <Spinner /> : "Sign up"}
          </Button>
        </form>
        <Link href="signin">Already had an account? Sign In</Link>
      </Card>
    </Flex>
  );
};

export default SignUp;

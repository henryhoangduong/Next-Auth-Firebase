"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Flex, Container } from "@radix-ui/themes";
import Navbar from "@/_components/Navbar";
import getAllDocuments from "@/firebase/firestore/getData";
import { Table } from "@radix-ui/themes";
import { AddUserBox } from "../../_components/AddUserBox";
type ItemProps = {
  id: string;
  email: string;
  name: string;
};

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthContext();
  const router = useRouter();
  const [items, setItems] = useState<ItemProps[]>([
    {
      email: "",
      name: "",
      id: "",
    },
  ]);

  useEffect(() => {
    const readData = async () => {
      setLoading(true);
      const { result, error } = await getAllDocuments("users");
      if (error) {
        setLoading(false);
        console.log(error);
        return;
      }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
      setItems(result);
      setLoading(false);
      console.log(result);
    };
    readData();
  }, []);
  React.useEffect(() => {
    setLoading(true);
    if (user == null) router.push("/auth/signin");
  }, [user, router]);

  if (loading) return <>...loading</>;
  return (
    <Flex className="w-full h-full" direction="column" gap="5">
      <Navbar />
      <Container>
        <Flex className="w-full" gap="5">
          <Table.Root variant="surface" className="w-full">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map((item, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.RowHeaderCell>{item.name} </Table.RowHeaderCell>
                    <Table.Cell>{item.email} </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
          <AddUserBox />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Home;

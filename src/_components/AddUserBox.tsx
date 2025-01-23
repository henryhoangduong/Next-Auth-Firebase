import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Spinner } from "@radix-ui/themes";
import "./addUserStyle.css";
import toast from "react-hot-toast";
import addData from "@/firebase/firestore/addData";

export const AddUserBox = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("Pedro Duarte");
  const [email, setEmail] = useState<string>("exampl@gmail.com");

  const handleSave = async () => {
    setLoading(true);
    try {
      const { result, error } = await addData("users", { name, email });
      if (error) {
        console.error("Error adding user:", error);
        toast.error("Failed to add user. Please try again.");
      } else {
        console.log("User added successfully:", result);
        toast.success("User added successfully!");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred.");
	} finally {
		window.location.reload();
		setLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Add new</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add profile</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add new user profile here. Click save when you&apos;re done.
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input
              className="Input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="email">
              Email
            </label>
            <input
              className="Input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <button
              className="Button green"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Save changes"}
            </button>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

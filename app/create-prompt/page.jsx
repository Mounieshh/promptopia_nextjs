"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();

    if (!session?.user?.id) {
      console.error("User is not authenticated.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorMessage = await response.text();
        console.error("Failed to create prompt:", errorMessage);
      }
    } catch (error) {
      console.error("An error occurred while creating the prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;

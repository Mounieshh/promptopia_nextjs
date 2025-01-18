"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const ProfilePage = () => {

  const router = useRouter()
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <>
      <Profile
        name="My"
        desc="Personalized Profile"
        data={posts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
};

export default ProfilePage;

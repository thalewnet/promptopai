"use client";
import React from "react";
import PromptCard from "./PromptCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        ></PromptCard>
      ))}
    </div>
  );
};
const Feed = () => {
  const { data: session } = useSession();

  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    const searchTextInput = e.target.value.toLowerCase();
    setSearchText(e.target.value);
    if (searchTextInput) {
      const filterPost = allPosts.filter((post) => {
        return (
          post.creator.username.includes(searchTextInput) ||
          post.prompt.toLowerCase().includes(searchTextInput.toLowerCase()) ||
          post.tag.includes(searchTextInput.toLowerCase())
        );
      });
      setAllPosts(filterPost);
    } else {
      fetchPost();
    }
  };

  const filterPrompts = (searchText) => {
    const filterPost = allPosts.filter((post) => {
      return post.tag.includes(searchText.toLowerCase());
    });
    setAllPosts(filterPost);
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setAllPosts(searchResult);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={allPosts}
        handleTagClick={handleTagClick}
      ></PromptCardList>
    </section>
  );
};

export default Feed;

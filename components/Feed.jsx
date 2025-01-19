'use client'

import PromptCard from "./PromptCard"
import { useEffect, useState } from "react"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt')
        const data = await response.json()
        setPosts(data)
        setFiltered(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredPosts = posts.filter(post => 
      post.creator.username.toLowerCase().includes(searchText.toLowerCase()) || 
      post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      post.prompt.toLowerCase().includes(searchText.toLowerCase())
    )
    setFiltered(filteredPosts)
  }, [searchText, posts])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search with tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filtered}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}
export default Feed

import React from "react"

const BlogForm = ({
  titleInputVal,
  titleInputOnChange,
  authorInputVal,
  authorInputOnChange,
  urlInputVal,
  urlInputOnChange,
  formOnSubmit,
}) => {
  return (
    <form onSubmit={formOnSubmit}>
      <div>
        <label for="title">title:</label>
        <input
          type="text"
          value={titleInputVal}
          onChange={titleInputOnChange}
        />
      </div>
      <div>
        <label for="author">author:</label>
        <input
          type="text"
          value={authorInputVal}
          onChange={authorInputOnChange}
        />
      </div>
      <div>
        <label for="url">url:</label>
        <input type="text" value={urlInputVal} onChange={urlInputOnChange} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm

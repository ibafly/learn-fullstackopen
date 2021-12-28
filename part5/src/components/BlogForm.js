import React from "react"

const BlogForm = ({
  titleInputVal,
  titleInputOnChange,
  authorInputVal,
  authorInputOnChange,
  urlInputVal,
  urlInputOnChange,
  formOnSubmit,
  cancelBtnOnClick,
}) => {
  return (
    <form onSubmit={formOnSubmit}>
      <div>
        <label htmlFor="title">title:</label>
        <input
          type="text"
          value={titleInputVal}
          onChange={titleInputOnChange}
        />
      </div>
      <div>
        <label htmlFor="author">author:</label>
        <input
          type="text"
          value={authorInputVal}
          onChange={authorInputOnChange}
        />
      </div>
      <div>
        <label htmlFor="url">url:</label>
        <input type="text" value={urlInputVal} onChange={urlInputOnChange} />
      </div>
      <button type="submit">create</button>
      <button onClick={cancelBtnOnClick}>cancel</button>
    </form>
  )
}

export default BlogForm

import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test("renders content", () => {
  const blog = {
    title: "Good title",
    author: "Some One",
    url: "https://from.some.place",
    likes: 6,
  }
  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent("Good title")
  expect(component.container).toHaveTextContent("Some One")
  const div = component.container.querySelector(".togglableContent")
  expect(div).toHaveStyle("display: none")
})

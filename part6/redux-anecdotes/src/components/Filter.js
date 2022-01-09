import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { filterBy } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = event => {
    const content = event.target.value
    dispatch(filterBy(content))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
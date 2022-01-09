import React from "react"
//import { useDispatch, useSelector } from "react-redux"
import { connect } from "react-redux"
import { filterBy } from "../reducers/filterReducer"

const Filter = props => {
  //  const dispatch = useDispatch()
  const handleChange = event => {
    const content = event.target.value
    //    dispatch(filterBy(content))
    props.filterBy(content)
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

const connectedFilter = connect(null, { filterBy })(Filter)
export default connectedFilter

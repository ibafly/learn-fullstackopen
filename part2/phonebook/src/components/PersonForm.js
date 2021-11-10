import React from "react"

const PersonForm = ({
  formOnSubmit,
  nameInputVal,
  nameInputOnChange,
  numberInputVal,
  numberInputOnChange,
}) => {
  return (
    <form onSubmit={formOnSubmit}>
      <div>
        name: <input value={nameInputVal} onChange={nameInputOnChange} />
      </div>
      <div>
        number: <input value={numberInputVal} onChange={numberInputOnChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm

import {ChangeEvent, useState} from 'react';

const JoinTable = () => {
  const[joinCode, setJoinCode] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJoinCode(e.currentTarget.value)
  }
  
  const handleClick = () => {
    // TODO: fetch correct table from firebase
  }

  return (
    <>
      <input type="text" onChange={ handleChange } value={ joinCode }/>
      <button onClick={ handleClick }>Join!</button>
    </>
  )
  
}
export default JoinTable;
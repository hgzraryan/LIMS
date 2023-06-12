import React, { useState } from 'react'
import Modal from './../Modal'

export default function Agents() {
  const [show,setShow] = useState(true)
  return (
    <div>
      <h2>Click to open Modal</h2>
      <button onClick={() => setShow(true)}>Open Modal</button>
      <Modal show = {show} closeModal={() => setShow(false)}>
          Agents:0
      </Modal>
    </div>
  )
}
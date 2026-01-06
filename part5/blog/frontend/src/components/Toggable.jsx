import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const buttonSection = { display: visible ? 'none' : '' }
  const formSection = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <>
      <div style={buttonSection}>
        <button onClick={() => setVisible(true)}>{props.btnLabel}</button>
      </div>
      <div style={formSection}>
        {props.children}
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </>
  )
})

export default Toggable

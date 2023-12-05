import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisiblility = () => {
    setVisible(!visible);
  };
  
  useImperativeHandle(ref, () => {
    return {
      toggleVisiblility
    }
  })


  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisiblility}>{props.showbuttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {props.children}
            <button onClick={toggleVisiblility}>{props.hidebuttonLabel}</button>
        </div>
    </div>
  )
});

export default Togglable

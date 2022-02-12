import React from "react";

function Test(){
  var x = document.getElementById("preview")
  const [dispImg, setDispImg] = React.useState([]);
  const [show,setShow] = React.useState(true)
  const erase = () => {
    setDispImg(null);
    setShow(false)
  };
  return(
    <div>
      <button>Publish</button>
    <input type="text"></input>
    
    <button type="button" class="btn btn-primary" onClick={erase}>
          Reset
        </button>
    </div>
    )
}

export default Test;
import React, { useState } from "react";
//import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button } from "reactstrap";

import Dropzone from "react-dropzone";
//import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import { Image as KonvaImage, Stage, Layer, Image, Rect } from "react-konva";
import Rectangle from "./Rectangle";
import Circle from "./Circle";
import { addLine } from "./line";

import { addTextNode } from "./textNode";
import useImage from "use-image";
import { v1 as uuidv1 } from "uuid";
import html2canvas from "html2canvas";
const imageToBase64 = require('image-to-base64');



uuidv1();
//https://www.google.com/s2/favicons?sz=128&domain_url=yahoo.com
//https://www.google.com/s2/favicons?sz=64&domain_url=microsoft.com
//Image drag drop with URLImage
const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

function HomePage() {
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [shapes, setShapes] = React.useState([]);
  const [, updateState] = React.useState();
  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const [name, setName] = React.useState("");
  const [name2, setName2] = React.useState("");
  const dragUrl = React.useRef();
  const [images, setImages] = React.useState([]);
  const [exp, setExp] = React.useState([]);
  let y;
  const [imageList, setImageList] = React.useState([]);
  const [dispImg, setDispImg] = React.useState([]);

  const [tweet, setTweet] = React.useState("");
  const [prevLink, setPrevLink] = React.useState("");
  const [isToggled, setIsToggled] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [canvasShow, setCanvasShow] = React.useState(false);
  const [btnShow, setBtnShow] = React.useState(true);
  const [btnHide, setBtnHide] = React.useState(false);
  const [prevHide, setPrevHide] = React.useState(false);
  const [val, setVal] = React.useState([""]);
  const [val2, setVal2] = React.useState([""]);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const getBase64Image2 = (url) => {
    const varimg2 = document.createElement("img"); //new Image();
    varimg2.setAttribute("crossOrigin", "anonymous");
    varimg2.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = varimg2.width;
      canvas.height = varimg2.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(varimg2, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      // console.log("dataurl = ",dataURL)
      setVal2(dataURL);
    };
    varimg2.src = url;
    // console.log("conso",val)
    return val2;
  };
  const getBase64Image = (url) => {
    const varimg = document.createElement("img"); //new Image();
    varimg.setAttribute("crossOrigin", "anonymous");
    varimg.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = varimg.width;
      canvas.height = varimg.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(varimg, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      // console.log("dataurl = ",dataURL)
      setVal(dataURL);
    };
    varimg.src = url;
    // console.log("conso",val)
    return val;
  };

  function refreshPage() {
    window.location.reload(false);
  }

  async function getBase64(file) {
    let result_base64 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = (e) => resolve(reader.result);

      reader.readAsDataURL(file);
    });
    console.log(result_base64);
    return result_base64;
  }

  const takeshot = async () => {
    let div = await document.getElementById("canvass");
    html2canvas(div, {
      allowTaint: true,
      foreignObjectRendering: true,
      useCORS: true,
    }).then(function (canvas) {
      document.getElementById("output").appendChild(canvas);
    });
  };

  function gotFile(file) {
    Dropzone.style("display", "none");

    if (file.type === "image") {
      var image = new Image();

      image.onload = function () {
        document.body.appendChild(this);
      };

      image.src = file.data;
    }
  }

  // const handleChange = (value) => {
  //   setName(
  //     "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www." +
  //       // "https://www.google.com/s2/favicons?sz=128&domain_url=http://www." +
  //       value +
  //       ".com&size=128"
  //     // "  https://icons.duckduckgo.com/ip3/www.google.com.ico"
  //   );
  //   setName2(
  //     "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" +
  //       value +
  //       "&size=128"
  //   );
  // };

  const display = () => {
    const dataURL = stageEl ? stageEl.current.getStage().toDataURL() : null;

    const payload = {
      img: dataURL,
    };
    // console.log(JSON.stringify(payload))

    //data.append("json", JSON.stringify(payload))
    fetch("http://localhost:5000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        setPrevLink(res);
        console.log(res);
      });
  };
  var x = 1;
  const erase = () => {
    setDispImg(null);
    setShow(false);
    setCanvasShow(true);
    setPrevHide(true);
    setBtnHide(true);
  };

  const showCanvas = () => {
    setCanvasShow(true);
    setBtnHide(true);
    setBtnShow(false);
    setPrevHide(true);
  };

  const hideCanvas = () => {
    setCanvasShow(false);
    setBtnHide(false);
    setBtnShow(true);
    setPrevHide(false);
  };

  const preview = () => {
    const dataURL = stageEl ? stageEl.current.getStage().toDataURL() : null;
    console.log("dataurl=",dataURL);
    var link = document.createElement("a");
    link.href = dataURL;

    display(); // saves to db
    setDispImg(link.href);

    setShow(true);
    setCanvasShow(false);
    setPrevHide(false);
    setBtnHide(false);
  };
  //end
  const download = () => {
    //get stage dataUrl
    const dataURL = stageEl ? stageEl.current.getStage().toDataURL() : null;
    var link = document.createElement("a");
    link.download = "react-generator";
    link.href = dataURL;
    document.body.appendChild(link);
    // link.click();
    document.body.removeChild(link);
    console.log(link.href);
  };

  const addBG = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      strokeWidth: 3, // border width
      stroke: "black",
      fill: "white",
      id: `rect${rectangles.length + 1}`,
    };
    const rects = rectangles.concat([rect]);
    setRectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
  };

  const addRectangle = () => {
    const rect = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      strokeWidth: 3, // border width
      stroke: "black",
      // fill: "black",
      id: `rect${rectangles.length + 1}`,
    };
    const rects = rectangles.concat([rect]);
    setRectangles(rects);
    const shs = shapes.concat([`rect${rectangles.length + 1}`]);
    setShapes(shs);
  };
  const addCircle = () => {
    const circ = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      strokeWidth: 3, // border width
      stroke: "black",
      //fill: "black",
      id: `circ${circles.length + 1}`,
    };
    const circs = circles.concat([circ]);
    setCircles(circs);
    const shs = shapes.concat([`circ${circles.length + 1}`]);
    setShapes(shs);
  };
  const drawLine = () => {
    addLine(stageEl.current.getStage(), layerEl.current);
  };
  const eraseLine = () => {
    addLine(stageEl.current.getStage(), layerEl.current, "erase");
  };
  const drawText = () => {
    const id = addTextNode(stageEl.current.getStage(), layerEl.current);
    const shs = shapes.concat([id]);
    setShapes(shs);
  };

  const forceUpdate = React.useCallback(() => updateState({}), []);
  const fileChange = (ev) => {
    let file = ev.target.files[0];
    let reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const undo = () => {
    const lastId = shapes[shapes.length - 1];
    let index = circles.findIndex((c) => c.id === lastId);
    if (index !== -1) {
      circles.splice(index, 1);
      setCircles(circles);
    }
    index = rectangles.findIndex((r) => r.id === lastId);
    if (index !== -1) {
      rectangles.splice(index, 1);
      setRectangles(rectangles);
    }

    shapes.pop();
    setShapes(shapes);
    forceUpdate();
  };

  document.addEventListener("keydown", (ev) => {
    if (ev.code === "Delete") {
      let index = circles.findIndex((c) => c.id === selectedId);
      if (index !== -1) {
        circles.splice(index, 1);
        setCircles(circles);
      }
      index = rectangles.findIndex((r) => r.id === selectedId);
      if (index !== -1) {
        rectangles.splice(index, 1);
        setRectangles(rectangles);
      }

      forceUpdate();
    }
  });
  var imgFromURL=document.createElement("img"); 
  //imgFromURL.crossOrigin="anonymous"
  window.setInterval(() => {
    var url=document.getElementById('myInput').value;  
	  if (url) {
	
	    var srcURL ="https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www."+ url +".com&size=128";
      
      // if (url.indexOf('.')===-1) { //if no tld, then add .com
      //   srcURL+='.com&size=128';
      // }
      
	    
	    imgFromURL.src=srcURL;
    //   imageToBase64(imgFromURL.src) // Path to the image
    // .then(
    //     (response) => {
    //         console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
    //     }
    // )
    // .catch(
    //     (error) => {
    //         console.log(error); // Logs an error if there was one
    //     }
    // )
      // console.log("imhg url =",imgFromURL.src)
     document.getElementById("logo").src =imgFromURL.src ;
    // encodeImage(imgFromURL.src);
    
    }
  },2000);
  function encodeImage(src, callback) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        img = document.getElementById("logo");
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        callback(canvas.toDataURL());
    }
    img.src = src;
}

  return (
    <div className="home-page">
      {/* For the icon components  */}

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
      <div id="yt-video">
        <center>
          <iframe
            src="https://www.youtube.com/embed/E7wJTI-1dvQ"
            frameBorder="2"
            margin-top-height="50"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            width="600"
            height="300"
          />
        </center>
      </div>
      <center>
        <div id="input-area">
          <textarea
            autoComplete="off"
            placeholder="Search for the required logo"
            id="myInput"
            name="name"
            className="textzone"
            
           // onChange={(event) => handleChange(event.target.value)}
          />

          {btnShow ? (
            <Button
              color="primary"
              id="canvas-show-btn"
              onClick={showCanvas}
              title="Show Canvas"
            >
              Show Canvas
            </Button>
          ) : null}
        </div>
      </center>
      <div></div>
      {}
      <center>
        <img
        
          id="logo"
          //src={getBase64Image(name)} //name}
         
          draggable="true"
          onDragStart={(e) => {
            dragUrl.current = e.target.src;
          }}
        />
        <img
          src={getBase64Image2(name2)} //name}
          draggable="true"
          onDragStart={(e) => {
            dragUrl.current = e.target.src;
          }}
        />
      </center>

      {btnHide ? (
        <Button
          color="primary"
          id="canvas-hide-btn"
          onClick={hideCanvas}
          title="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </Button>
      ) : null}

      <div></div>

      <div className="container">
        {canvasShow ? (
          <div className="bts" role="group" aria-label="Basic example">
            <div></div>
            <Button color="primary" onClick={addRectangle} title="Square">
              <i class="fa-regular fa-square"></i>
            </Button>
            <Button color="primary" onClick={addCircle} title="Circle">
              <i class="fa-regular fa-circle"></i>
            </Button>
            <Button color="primary" onClick={drawLine} title="Pen">
              <i class="fa-solid fa-pencil"></i>
            </Button>

            <Button color="primary" onClick={eraseLine} title="Eraser">
              <i class="fa-solid fa-eraser"></i>
            </Button>

            <Button color="primary" onClick={drawText} title="Text">
              <i class="fa-solid fa-font"></i>
            </Button>

            <Button color="primary" onClick={undo} title="Undo">
              <i class="fa-solid fa-delete-left"></i>
            </Button>
            <Button color="primary" onClick={download} title="download">
              Export
            </Button>
            {/* <Button color="primary" onClick={display}>
                Save to db
              </Button> */}

            <Button color="primary" onClick={refreshPage} title="Clear">
              Clear
            </Button>
            {isToggled}
          </div>
        ) : null}
        {imageList.map((item) => {
          return (
            <img
              src={item}
              draggable="true"
              onDragStart={(e) => {
                dragUrl.current = item;
              }}
            />
          );
        })}
        <div
          onDrop={(e) => {
            e.preventDefault();
            // register event position
            stageEl.current.setPointersPositions(e);
            // add image
            setImages(
              images.concat([
                {
                  ...stageEl.current.getPointerPosition(),
                  src: dragUrl.current,
                },
              ])
            );
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {canvasShow ? (
            <div id="child-canvas">
              <Stage
                style={{
                  border: "1px solid grey",
                  width: "1250px",
                  position: "relative",
                  left: "10px",
                  bottom: "20px",
                  top: "5px",
                  background: "#f4f7f6",
                }}
                width={window.innerWidth * 0.84}
                height={window.innerHeight - 150}
                ref={stageEl} //,stageRef}
                onMouseDown={(e) => {
                  // deselect when clicked on empty area
                  const clickedOnEmpty = e.target === e.target.getStage();
                  if (clickedOnEmpty) {
                    selectShape(null);
                  }
                }}
              >
                <Layer ref={layerEl}>
                  {images.map((image) => {
                    return <URLImage image={image} />;
                  })}

                  {rectangles.map((rect, i) => {
                    return (
                      <Rectangle
                        key={i}
                        shapeProps={rect}
                        isSelected={rect.id === selectedId}
                        onSelect={() => {
                          selectShape(rect.id);
                        }}
                        onChange={(newAttrs) => {
                          const rects = rectangles.slice();
                          rects[i] = newAttrs;
                          setRectangles(rects);
                        }}
                      />
                    );
                  })}

                  {circles.map((circle, i) => {
                    return (
                      <Circle
                        key={i}
                        shapeProps={circle}
                        isSelected={circle.id === selectedId}
                        onSelect={() => {
                          selectShape(circle.id);
                        }}
                        onChange={(newAttrs) => {
                          const circs = circles.slice();
                          circs[i] = newAttrs;
                          setCircles(circs);
                        }}
                      />
                    );
                  })}
                </Layer>
              </Stage>
            </div>
          ) : null}

          {prevHide ? (
            <Button
              color="primary"
              onClick={preview}
              title="Preview"
              id="preview-btn"
            >
             <i class="fas fa-arrow-right"></i>
            </Button>
          ) : null}

          {show ? (
            <button
              type="button"
              id="reset-btn"
              class="btn btn-primary"
              onClick={erase}
            >
              Reset
            </button>
          ) : null}
          <div className="child-preview" id="preview">
            <img id="preview-image" src={dispImg} width="1000"></img>

            <div className="tweet-text" id="textbox-chars">
              {show ? (
                <textarea
                  className="tweet-text-area"
                  value={tweet}
                  onChange={(e) => setTweet(e.target.value)}
                />
              ) : null}
              {/* <link rel="canonical" href="/web/tweet-button"></link> */}
              {show ? (
                <a
                  class="twitter-share-button"
                  href={`https://twitter.com/intent/tweet?text=${tweet}&url=https://frosty-lumiere-178f71.netlify.app/images/${prevLink}`}
                  data-size="large"
                  target="_blank"
                >
                  Tweet
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;

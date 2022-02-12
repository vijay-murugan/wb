import React, { useState } from "react";
//import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Button } from "reactstrap";

import {TwitterShareButton, TwitterIcon} from "react-share"

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


const fn = () => {
  var s = document.getElementById('logo')
  console.log(s)
}


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

  const [isToggled, setIsToggled] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  
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

//   function toDataUrl(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//         var reader = new FileReader();
//         reader.onloadend = function() {
//             callback(reader.result);
//         }
//         reader.readAsDataURL(xhr.response);
//     };
//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.send();
// }

// const imagepath = "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://ap.com&size=128"

// toDataUrl(imagepath, function(myBase64) {
//   console.log(myBase64); // myBase64 is the base64 string
// });

  const handleChange = (value) => {
    setName(
      "https://www.google.com/s2/favicons?sz=128&domain_url=http://www." +
        value +
        ".com"
    // "  https://icons.duckduckgo.com/ip3/www.google.com.ico"
    );
    setName2("https://www.google.com/s2/favicons?sz=128&domain_url=" + value);
  };

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
      .then((res) => console.log(res));
  };
  var x = 1;
  const erase = () => {
    setDispImg(null);
    setShow(false);
  };




  const preview = () => {
    const dataURL = stageEl ? stageEl.current.getStage().toDataURL() : null;
    var link = document.createElement("a");
    link.href = dataURL;

    let y;

    setDispImg(link.href);

    setShow(true);
  };
  //end
  const download = () => {
    //get stage dataUrl
    const dataURL = stageEl ? stageEl.current.getStage().toDataURL() : null;
    var link = document.createElement("a");
    link.download = "react-generator";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  return (
    <div className="home-page">
      <div id="canvass">
        <div></div>
    {/* For the icon components  */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        {/* <textarea
          autoComplete="off"
          rows="4"
          cols="150"
          placeholder="Search for the required logo"
          id="myInput"
          name="name"
          onChange={(event) =>
            setName(
              "https://www.google.com/s2/favicons?sz=128&domain_url=" +
                event.target.value +
                ".com"
            )
            
          }
          
        /> */}
        <textarea
          autoComplete="off"
          rows="4"
          cols="150"
          placeholder="Search for the required logo"
          id="myInput"
          name="name"
          onChange={(event) =>
            handleChange(event.target.value)
          }
        />
        {/* <textarea
          autoComplete="off"
          rows="4"
          cols="150"
          placeholder="Enter the URL to fetch the logo"
          id="myInput"
          name="name"
          onChange={(event) =>
            setName(
              "https://www.google.com/s2/favicons?sz=128&domain_url=" +
                event.target.value
            )
          }
        /> */}
        <div></div>
        
        <img
          id = "logo"
          src={name} //name}
          draggable="true"
        />
        <img
          src={name2} //name}
          draggable="true"
        />
        {fn()}
        <Dropzone
          onDrop={(acceptedFiles) => {
            y = getBase64(acceptedFiles[0]);
            // console.log(y)
            y.then((result) => {
              console.log(result)
              setImageList((prev) => [...prev, result]);
            });
            y.catch((e)=>console.log(e))
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className="drop-container">
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
   
                <div className="upload-icon"></div>
    Drag & Drop icons here or click to upload then drag & drop icons generated to canvas

              </div>
              </div>
            </section>
          )}
        </Dropzone>
        {/* <img
          src={name} //name}
          draggable="true"
          onDragStart={(e) => {
            dragUrl.current = e.target.src;
          }}
        /> */}
        <div></div>

          <div className="container">
            {/* <div className="parent flex-parent"> */}
            <div
              className="bts"
              //  className="child btn-group-vertical"
              role="group"
              aria-label="Basic example"
            >
              <div></div>
              <Button color="primary" onClick={addRectangle} title="Square">
                <i class="fa-regular fa-square"></i>
                {/* <img id="sqr-img" src="reshot-icon-square-S3RGTA8EF5.svg" /> */}
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
              {/* <Button color="primary" onClick={download} title="download">
                Export
              </Button> */}
              {/* <Button color="primary" onClick={display}>
                Save to db
              </Button> */}
              <Button color="primary" onClick={preview} title="Preview">
                {/* onClick={() => setIsToggled(true)}> */}
                Preview
              </Button>
              {isToggled }
            </div>
            {/* {imageToBase64("https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://go.com&size=128") // Path to the image
    .then(
        (response) => {
            console.log("data:image/png;base64,"+response); // "cGF0aC90by9maWxlLmpwZw=="
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )} */}
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
            <div
              id="child-canvas"
            >
              <Stage
                style={{
                  border: "1px solid grey",
                  width: "1200px",
                  position: "relative",
                  left: "50px",
                  bottom: "20px",
                  top: "5px",
                  background: "#f4f7f6",
                }}
                width={window.innerWidth * 0.87}
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
            

            <div className="child-preview" id="preview">
              <img id="preview-image" src={dispImg} width="1000"></img>
          
              <div className="tweet-text" id="textbox-chars">
                {show ? (
                  <textarea
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                  />
                ) : null}
                <link rel="canonical" href="/web/tweet-button"></link>
                {show ? (
                  <a
                    class="twitter-share-button"
                    href={`https://twitter.com/intent/tweet?text=${tweet}`}
                    data-size="large"
                  >
                    Tweet
                  </a>
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
              </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;

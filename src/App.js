import React, {useState} from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'



function App() {
  const [input, inputState]=useState('');
  const [imgURL, imgURLState]=useState('');
  const [box,boxState]=useState({});


  const setupClarifaiRequest=(imageURL)=>{
    const PAT = '7cbab129482f461a9eac2b56f8a6c73c';
    const USER_ID = 'wnammmq0x3moa';       
    const APP_ID = 'APIFun';
    // const MODEL_ID='face-detection'
    const IMAGE_URL = imageURL;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
  }
  const calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace)
    const image = document.getElementById('inputImage');
    const width= Number(image.width);
    const height= Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width-(clarifaiFace.right_col * width),
      bottomRow: height-(clarifaiFace.bottom_row * height),
    }
  }
  const displayFaceBox=(boxs)=>{
    console.log(boxs);
    boxState(boxs);
  }

  const onInputChange = (event)=>{  
    inputState(event.target.value);
    
  }
  const onSubmit = ()=>{
    imgURLState(input);
      fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", setupClarifaiRequest(input))
        .then(result => result.json())
        .then(result => displayFaceBox(calculateFaceLocation(result)))
        .catch(error => console.log('error', error))
  }

  
  return (
    <div className="App">
      <ParticlesBg type="circle" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm  onInputChange={onInputChange} onSubmit={onSubmit}/>
      <FaceRecognition box={box} imgURLState={imgURL}/>

    </div>
  );
}

export default App;
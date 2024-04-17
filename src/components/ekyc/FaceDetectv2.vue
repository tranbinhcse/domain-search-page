<template>
    <div>
      <video ref="video" width="640" height="480" autoplay></video>
      <canvas ref="canvas" width="640" height="480"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as facemesh from '@mediapipe/face_mesh';
  
  const video = ref(null);
  const canvas = ref(null);
  
  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      video.value.srcObject = stream;
    } catch (err) {
      console.error("Unable to access the camera: ", err);
    }
  };
  
  const setupFaceMesh = async () => {
    const faceMesh = new facemesh.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });
  
    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
  
    await faceMesh.initialize();
  
    setInterval(async () => {
      const predictions = await faceMesh.send({ image: video.value });
      drawFaceMesh(predictions, canvas.value);
    }, 100);
  };
  
  const drawFaceMesh = (predictions, canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("face detected", predictions);
    if (Array.isArray(predictions)) {
       
      predictions.forEach(prediction => {
        prediction.scaledMesh.forEach(point => {
          const [x, y] = point;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, 2 * Math.PI);
          ctx.fillStyle = 'red';
          ctx.fill();
        });
      });
    } else {
      console.log("No face detected");
    }
  };
  
  onMounted(() => {
    setupCamera();
    setupFaceMesh();
  });
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  
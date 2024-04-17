<template>
  <div>
 
      <a-alert   type="success" >{{ randomActionSequenceRef[stepRef]?.message }}</a-alert>
      <div>
          <div v-if="loadingVideo" class="pre-loading-video">
              <a-spin size="large"  tip="Đang mở camera..." spinning />
          </div>
          <div class="video-box">
              <video style=" max-width: 100%;" v-show="!isPhotoTaken" ref="camera" webkit-playsinline playsinline autoplay :onPlay="handleGetUserMedia"></video>
              <canvas id="photoTaken" ref="canvas" style=" max-width: 100%;  display:none" :width="450" :height="337.5"></canvas>
          </div>
      </div>
  </div>
   
</template>

<script setup>
 
import { defineProps, ref, onMounted, watch } from 'vue'; 

// import * as FaceMesh from '@mediapipe/face_mesh';
import { FaceMesh } from '@mediapipe/face_mesh';
import { shuffleFromPositionOne } from "@/utility/ekyc/shuffle-array";
import { setIntervalAsync } from "set-interval-async/dynamic";
import { clearIntervalAsync } from "set-interval-async";
import { faceLiveNessCheck, getBoundingBox } from "@/utility/ekyc/face-liveness";

 

import delay from "@/utility/ekyc/delay"; 
const isMobile = ref(false)
const props = defineProps(['open', 'faceOK']);
const emits = defineEmits(['DataImage']);

import { Howl } from "howler";
let confirmAudio = new Howl({ src: ["/component/confirm.wav"] });
let alertAudio = new Howl({ src: ["/component/alert.mp3"] });

const faceActions = [
    { action: "forward", message: "Nhìn thẳng về phía máy ảnh" },
    // { action: "up", message: "Quay lên trên" },
    // { action: "down", message: "Quay xuống dưới" },
    // { action: "left", message: "Quay sang trái" },
    // { action: "right", message: "Quay sang phải" },
    // { action: "eye-closed", message: "Nhắm mắt" },
];

const getActionsSequence = () => {
    let sequence = shuffleFromPositionOne(faceActions);
    sequence.push(faceActions[0]);
    return sequence;
};

let setUpFaceDetectionCallBack = ref(false);
let stepRef = ref(0);
let firstStepDelayRef = ref(true);
let validFrameCountRef = ref(0);
let faceImageRef = ref(null);
 
const randomActionSequenceRef = ref(getActionsSequence());
const VALID_FRAME = 2;
const isPhotoTaken = ref(false);
const isCameraOpen = ref(false);
const loadingVideo = ref(true);
const isLoading = ref(false);
// const cameraType = ref('user');
const camera = ref(null);
 
const face = new FaceMesh({
    locateFile: (file) => {
        return "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/" + file;
    },
});

const handleGetUserMedia = async () => {
    randomActionSequenceRef.value = getActionsSequence();
    
   
    face.setOptions({
        selfieMode: true,
        maxNumFaces: 1,
        refineLandmarks: true,
    });

    const timer = setIntervalAsync(async () => {
        // Setting up callback for face detection for the first time
        if (!setUpFaceDetectionCallBack.value) {
            console.log("Start liveness check");
            setUpFaceDetectionCallBack.value = true;

            face.onResults(async (results) => {
            // Just to check if the countdown reset the step in-between the face liveness check
            let currentStep = stepRef.value;

            // Check if the user moves the face outside of the camera
            if (
                results.multiFaceLandmarks &&
                results.multiFaceLandmarks.length === 0 &&
                stepRef.value !== 0
            ) {
                firstStepDelayRef.value = true;
                alertAudio.play();
                validFrameCountRef.value = 0;
                randomActionSequenceRef.value = getActionsSequence();
                stepRef.value = 0;
            }
            // Check if the user does the required action for VALID_FRAME number of frames.
            else if (
                faceLiveNessCheck(
                results,
                randomActionSequenceRef.value[currentStep].action
                ) &&
                currentStep === stepRef.value
            ) {
                console.log(validFrameCountRef.value);
                if (validFrameCountRef.value < VALID_FRAME) {
                    validFrameCountRef.value += 1;
                } else {
                // If first step, take the picture
                if (stepRef.value === 0) {
                    const canvas = results.image;
                    const { x1, x2, y1, y2 } = getBoundingBox(results);
                    // Check if the face is fully presented
                    if (
                    x1 >= 0 &&
                    y1 >= 0 &&
                    x2 <= canvas.width &&
                    y2 <= canvas.height
                    ) {
                    faceImageRef.value = results.image.toDataURL("image/jpeg");
                    confirmAudio.play();
                    validFrameCountRef.value = 0;
                    stepRef.value += 1;
                    }
                } else {
                    if (
                    stepRef.value !==
                    randomActionSequenceRef.value.length - 1
                    ) {
                    confirmAudio.play();
                    validFrameCountRef.value = 0;
                    stepRef.value += 1;
                    } else {
                    confirmAudio.play();
                    console.log("Stop liveness check end step");
                    stopCameraStream();
                    isPhotoTaken.value = true;
                    clearIntervalAsync(timer);
                    }
                }
                }
            }
            // Reset frame count when the user fails the liveness check
            else if (currentStep === stepRef.value) {
                validFrameCountRef.value = 0;
            }
            });
        }

        await face.send({ image: camera.value });
        // Start to process frame by frame
        if (
            camera.value !== null
        ) {
            if (stepRef.value === 0 && firstStepDelayRef.value) {
            await delay(1000);
            firstStepDelayRef.value = false;
            }
            await face.send({ image:  camera.value });
        } else {
         
            clearIntervalAsync(timer);
            
        }
    }, 10);
};

const handleOpenCamera = () => {
    isPhotoTaken.value = false;
    isCameraOpen.value = true;
    createCameraElement();
};

const createCameraElement = async () => {
    isLoading.value = true;
    const constraints = {
        audio: false,
        video: {
            facingMode:  "user",
            width: { min: 1280, max: 1920, ideal: 1440 },
            height: { ideal: isMobile.value ? 1440 : 1080 },
            aspectRatio: { ideal: isMobile.value ? 1.333333333 : 1.777777778 },
        }
    };
    await navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        isLoading.value = false;
        camera.value.srcObject = stream;
        loadingVideo.value = false;
    }).catch((error) => {
        isLoading.value = false;
        alert("May the browser didn't support or there is some errors.");
        console.log(error);
    });
};

const stopCameraStream = () => {
  emits('DataImage', faceImageRef.value);
    isCameraOpen.value = false;
    let tracks = camera.value.srcObject.getTracks();
    tracks.forEach(async track => {
        await delay(1000);
        track.stop();
    });
};


onMounted(() => {
    handleOpenCamera();
});

watch(() => props.open, () => {
    if(!props.open) {
        stopCameraStream();
    }
});
</script>
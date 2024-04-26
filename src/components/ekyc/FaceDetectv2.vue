<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { useDevicesList, useUserMedia } from '@vueuse/core'

import { shuffleFromPositionOne } from '@/utility/ekyc/shuffle-array'
import { setIntervalAsync } from 'set-interval-async/dynamic'
import { clearIntervalAsync } from 'set-interval-async'
import { faceLiveNessCheck, getBoundingBox } from '@/utility/ekyc/face-liveness'
import delay from '@/utility/ekyc/delay'

// const { FaceLandmarker, FilesetResolver, DrawingUtils } = vision;
import { FaceMesh } from '@mediapipe/face_mesh'

const currentCamera = ref()
const video = ref()
const canvas = document.createElement('canvas')

const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find((i) => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  }
})

const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } }
})

watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value
})

import { Howl } from 'howler'
let confirmAudio = new Howl({ src: ['/component/confirm.wav'] })
let alertAudio = new Howl({ src: ['/component/alert.mp3'] })

const faceActions = [
  { action: 'forward', message: 'Nhìn thẳng về phía máy ảnh' },
  // { action: "up", message: "Quay lên trên" },
  // { action: "down", message: "Quay xuống dưới" },
  { action: 'left', message: 'Quay sang trái' },
  { action: 'right', message: 'Quay sang phải' },
  { action: 'eye-closed', message: 'Nhắm mắt' }
]

const getActionsSequence = () => {
  let sequence = shuffleFromPositionOne(faceActions)
  sequence.push(faceActions[0])
  return sequence
}

let setUpFaceDetectionCallBack = ref(false)
let stepRef = ref(0)
let firstStepDelayRef = ref(true)
let validFrameCountRef = ref(0)
let faceImageRef = ref(null)

const randomActionSequenceRef = ref(getActionsSequence())
const VALID_FRAME = 5
const isPhotoTaken = ref(false)

const handleGetUserMedia = async () => {
  randomActionSequenceRef.value = getActionsSequence()

  const faceMesh = new FaceMesh({
    locateFile: (file) => {
      return '/component/face_mesh/' + file
    }
  })

  faceMesh.setOptions({
    selfieMode: true,
    maxNumFaces: 1,
    refineLandmarks: true
  })

  await faceMesh.initialize()

  const timer = setIntervalAsync(async () => {
    // Thực hiện xử lý khung hình ở đây
    // Ví dụ:
    // await faceMesh.send({ image: currentCamera.value });

    if (!setUpFaceDetectionCallBack.value) {
      console.log('Start liveness check')
      setUpFaceDetectionCallBack.value = true
      faceMesh.onResults(async (results) => {
        console.log('results', results)
        // Just to check if the countdown reset the step in-between the face liveness check
        let currentStep = stepRef.value

        // Check if the user moves the face outside of the camera
        if (
          results.multiFaceLandmarks &&
          results.multiFaceLandmarks.length === 0 &&
          stepRef.value !== 0
        ) {
          firstStepDelayRef.value = true
          alertAudio.play()
          validFrameCountRef.value = 0
          randomActionSequenceRef.value = getActionsSequence()
          stepRef.value = 0
          console.log('ok')
        } else if (
          faceLiveNessCheck(results, randomActionSequenceRef.value[currentStep].action) &&
          currentStep === stepRef.value
        ) {
          console.log(validFrameCountRef.value)
          if (validFrameCountRef.value < VALID_FRAME) {
            validFrameCountRef.value += 1
          } else {
            // If first step, take the picture
            if (stepRef.value === 0) {
              const canvas = results.image

              const { x1, x2, y1, y2 } = getBoundingBox(results)
              // Check if the face is fully presented
              if (x1 >= 0 && y1 >= 0 && x2 <= canvas.width && y2 <= canvas.height) {
                faceImageRef.value = results.image.toDataURL('image/jpeg')
                confirmAudio.play()
                validFrameCountRef.value = 0
                stepRef.value += 1
              }
            } else {
              if (stepRef.value !== randomActionSequenceRef.value.length - 1) {
                confirmAudio.play()
                validFrameCountRef.value = 0
                stepRef.value += 1
              } else {
                confirmAudio.play()
                console.log('Stop liveness check end step')
                stopCameraStream()
                isPhotoTaken.value = true
                clearIntervalAsync(timer)
              }
            }
          }
        }
        // Reset frame count when the user fails the liveness check
        else if (currentStep === stepRef.value) {
          validFrameCountRef.value = 0
        }
      })
    }

    if (video.value !== null) {
      if (stepRef.value === 0 && firstStepDelayRef.value) {
        await delay(1000)
        firstStepDelayRef.value = false
      }
      await faceMesh.send({ image: video.value })
    } else {
      clearIntervalAsync(timer)
    }
  }, 100)
}

const stopCameraStream = () => {
  enabled.value = !enabled.value
}
// onMounted(handleGetUserMedia);
</script>

<template>
  <div class="flex flex-col gap-4 text-center">
    <a-alert type="success">{{ randomActionSequenceRef[stepRef]?.message }}</a-alert>
    <div>
      <button @click="stopCameraStream">
        {{ enabled ? 'Stop' : 'Start' }}
      </button>
    </div>

    <div>
      <div
        v-for="camera of cameras"
        :key="camera.deviceId"
        class="px-2 py-1 cursor-pointer"
        :class="{ 'text-primary': currentCamera === camera.deviceId }"
        @click="currentCamera = camera.deviceId"
      >
        {{ camera.label }}
      </div>
    </div>
    <div>
      <video
        style="max-width: 100%"
        v-show="!isPhotoTaken"
        ref="video"
        webkit-playsinline
        playsinline
        autoplay
        :onPlay="handleGetUserMedia"
      ></video>
    </div>
  </div>
</template>

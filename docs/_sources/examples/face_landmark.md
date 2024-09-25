# Face Landmark
<div class="video-container" style="text-align:center;position:relative;height:0;padding-bottom:56.25%;padding-top:0px;overflow:hidden;">
<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/apdJaqSHD8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

- On-device AI Face Landmark App with ZETIC.MLange

## Github Repository

- We provide Face Landmark demo application source code for both Android and iOS. [repository](https://github.com/zetic-ai/ZETIC_MLange_apps/tree/main/face_landmark)

## What is Face Landmark

- The Face Landmark model in Google’s MediaPipe is a highly efficient machine learning model used for real-time face detection and landmark extraction.
- Face Landmark Google AI Document : [link](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker)

## Model pipelining

For accurate use of the face landmark model, it is necessary to pass an image of the correct facial area to the model. To accomplish this, we construct a pipeline with the face detection Model.

1. Face Detection: we use the Face Detection Model to accurately detect the face regions in the image. Using the information from the detected face region, we extract that part of the original image.
2. Face Landmark: Input the extracted face image into the Face Landmark model to analyze facial landmarks.

## Step-by-step implementation

### 0. Prerequisites

Prepare the model [`Face Detection and Face Landmark`](https://github.com/patlevin/face-detection-tflite) from github.

- Face Detection: Convert the Tensorflow model to the TorchScript model.
    ``` bash
    $ pip install tf2onnx
    $ python -m tf2onnx.convert --tflite face_detection_short_range.tflite --output face_detection_short_range.onnx --opset 13
    ```
- Face Landmark: Convert the Tensorflow model to the TorchScript model.
    ``` bash
    $ pip install tf2onnx
    $ python -m tf2onnx.convert --tflite face_landmark.tflite --output face_landmark.onnx --opset 13
    ```

### 1. Generate ZETIC.MLange model
- Get your own MLange model key from the model
    - If you want to get your own model key, please get your own model key as below.
    
    ``` bash
        # (1) Get mlange_gen
        $ wget https://github.com/zetic-ai/ZETIC_MLange_document/raw/main/bin/mlange_gen && chmod 755 mlange_gen

        # (2) Run mlange_gen for two models
        #    - Face detection model
        $ ./mlange_gen -m face_detection_short_range.onnx -i input.npy

        #    - Face landmark model
        $ ./mlange_gen -m face_landmark.onnx -i input.npy

    ```

    - Expected output
    ``` bash
        ...
        MLange Model Key : {YOUR_FACE_DETECTION_MODEL_KEY}
        ...

        ...
        MLange Model Key : {YOUR_FACE_LANDMARK_MODEL_KEY}
        ...
    ```

### 2. Implement ZeticMLangeModel with your model key

- We prepared a model key for the demo app: `face_detection` and `face_landmark`. You can use the model key to try the Zetic.MLange Application.

- Anroid app
  - For the detailed application setup, please follow [`deploy to Android Studio`](https://docs.zetic.ai/android/deploy-to-android-studio.html) page
  - ZETIC.MLange usage in `Kotlin`

  ```kotlin
    val faceLandmarkModel = ZeticMLangeModel(this, 'face_landmark')

    faceLandmarkModel.run(inputs)

    val outputs = faceLandmarkModel.outputBuffers
  ```

- iOS app
  - For the detailed application setup, please follow [`deploy to XCode`](https://docs.zetic.ai/ios/deploy-to-xcode.html) page
  - ZETIC.MLange usage in `Swift`
  ``` swift
    let faceLandmarkModel = ZeticMLangeModel('face_landmark')

    faceLandmarkModel.run(inputs)

    let outputs = faceLandmarkModel.getOutputDataArray()
  ```

### 3. Prepare Face Landmark image feature extractor for Android and iOS
- We provide a Face Landmark feature extractor as an Android and iOS module.
    - (The Face Landmark feature extractor extension will be exposed as an open-source repository soon.)
    - You can use your own feature extractor if you have one for Face Landmark usage

- For Android 
    ``` kotlin
    // (0) Initialize ZeticMLangeFeatureFaceLandmark
    val feature = ZeticMLangeFeatureFaceLandmark()

    // (1) Preprocess bitmap and get processed float array
    val inputs = feature.preprocess(bitmap)

    ...

    // (2) Postprocess to bitmap
    val resultBitmap = feature.postprocess(outputs)
    ```

- For iOS

    ``` swift
    import ZeticMLange

    // (0) Initialize ZeticMLangeFeatureFaceLandmark
    let feature = ZeticMLangeFeatureFaceLandmark()
    
    // (1) Preprocess UIImage and get processed float array
    let inputs = feature.preprocess(image)

    ...

    // (2) Postprocess to UIImage
    let resultBitmap = feature.postprocess(&outputs)
    ```

## Total Face Landmark Process implementation
Pipelining two models.
- For Android
    - Kotlin
        1. Face Detection Model
        ``` kotlin
        // (0) Initialization Models
        val faceDetectionModel = ZeticMLangeModel(this, 'face_detection')

        // (1) Initialization Feature
        val faceDetectionFeature = ZeticMLangeFeatureFaceDetection()
        
        // (2) Preprocess Image
        val faceDetectionInputs = faceDetectionFeature.preprocess(bitmap)

        // (3) Process Model
        faceDetectionModel.run(faceDetectionInputs)
        val faceDetectionOutputs = faceDetectionModel.outputBuffers

        // (4) Postprocess model run result
        val faceDetectionPostprocessed = faceDetectionFeature.postprocess(faceDetectionOutputs)
        ```

        2. Face Landmark Model
        Pass the result of face detection model as a input.
        ``` kotlin
        // (0) Initialization Models
        val faceLandmarkModel = ZeticMLangeModel(this, 'face_landmark')

        // (1) Initialization Feature
        val faceLandmarkFeature = ZeticMLangeFeatureFaceLandmark()
        
        // (2) Preprocess Image
        val faceLandmarkInputs = faceLandmarkFeature.preprocess(bitmap, faceDetectionPostprocessed)

        // (3) Process Model
        faceLandmarkModel.run(faceLandmarkInputs)
        val faceLandmarkOutputs = faceLandmarkModel.outputBuffers

        // (4) Postprocess model run result
        val faceLandmarkPostprocessed = faceLandmarkFeature.postprocess(faceLandmarkOutputs)
        ```

- For iOS
    - Swift
        1. Face Detection Model
        ``` swift
        // (0) Initialization Models
        let faceDetectionModel = ZeticMLangeModel('face_detection')

        // (1) Initialization Feature
        let faceDetectionFeature = ZeticMLangeFeatureFaceDetection()
        
        // (2) Preprocess Image
        let faceDetectionInputs = faceDetectionFeature.preprocess(bitmap)

        // (3) Process Model
        faceDetectionModel.run(faceDetectionInputs)
        let faceDetectionOutputs = faceDetectionModel.getOutputDataArray()

        // (4) Postprocess model run result
        let faceDetectionPostprocessed = faceDetectionFeature.postprocess(&faceDetectionOutputs)
        ```

        2. Face Landmark Model
        Pass the result of face detection model as a input.

        ``` swift
        
        // (0) Initialization Models
        let faceLandmarkModel = ZeticMLangeModel('face_landmark')

        // (1) Initialization Feature
        let faceLandmarkFeature = ZeticMLangeFeatureFaceLandmark()
        
        // (2) Preprocess Image
        let faceLandmarkInputs = faceLandmarkFeature.preprocess(bitmap, faceDetectionPostprocessed)

        // (3) Process Model
        faceLandmarkModel.run(faceLandmarkInputs)
        let faceLandmarkOutputs = faceLandmarkModel.getOutputDataArray()

        // (4) Postprocess model run result
        let faceLandmarkPostprocessed = faceLandmarkFeature.postprocess(&faceLandmarkOutputs)

        ```

## Conclusion

 Discover just how easy and lightning-fast building your own on-device AI applications can be with ZETIC.MLange! Harness the full power of mobile NPUs for unparalleled performance and speed. We're continually adding new models to our examples and [HuggingFace](https://huggingface.co/ZETIC-ai) page—stay tuned and [contact us](https://zetic.ai/contact-sales) to collaborate on exciting projects!

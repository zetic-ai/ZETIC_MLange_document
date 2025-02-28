# Face Detection
<div class="video-container" style="text-align:center;position:relative;height:0;padding-bottom:56.25%;padding-top:0px;overflow:hidden;">
<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/GXtJKk7MdjQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

- On-device AI Face Detection App with ZETIC.MLange

## GitHub Repository

- We provide Face Detection demo application source code for both Android and iOS. [repository](https://github.com/zetic-ai/ZETIC_MLange_apps/tree/main/face_detection)

## What is Face Detection

- The Face Detection model in Google’s MediaPipe is a high-performance machine learning model designed for real-time face detection in images and video streams.
- Face Detection Google AI Document : [link](https://ai.google.dev/edge/mediapipe/solutions/vision/face_detector)

## Step-by-step implementation

### 0. Prerequisites

Prepare the model [`Face Detection`](https://github.com/patlevin/face-detection-tflite) from GitHub.

- Face Detection: Convert the TensorFlow model to the TorchScript model.
    ``` bash
    $ pip install tf2onnx
    $ python -m tf2onnx.convert --tflite face_detection_short_range.tflite --output face_detection_short_range.onnx --opset 13
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

    ```

    - Expected output
    ``` bash
        ...
        MLange Model Key : {YOUR_FACE_DETECTION_MODEL_KEY}
        ...
    ```

### 2. Implement ZeticMLangeModel with your model key

- We prepared a model key for the demo app: `face_detection`. You can use the model key to try the Zetic.MLange Application.

- Android app
  - For the detailed application setup, please follow [`deploy to Android Studio`](https://docs.zetic.ai/android/deploy-to-android-studio.html) page
  - ZETIC.MLange usage in `Kotlin`

  ``` kotlin
    val model = ZeticMLangeModel(this, 'face_detection')

    model.run(inputs)

    val outputs = model.outputBuffers
  ```

- iOS app
  - For the detailed application setup, please follow [`deploy to XCode`](https://docs.zetic.ai/ios/deploy-to-xcode.html) page
  - ZETIC.MLange usage in `Swift`
  ``` swift
    let model = ZeticMLangeModel('face_detection')

    model.run(inputs)

    let outputs = model.getOutputDataArray()
  ```

### 3. Prepare Face Detection image feature extractor for Android and iOS
- We provide a Face Detection feature extractor as an Android and iOS module.
    - (The Face Detection feature extractor extension will be exposed as an open-source repository soon.)
    - You can use your own feature extractor if you have one for Face Detection usage

- For Android 
    ``` kotlin
    // (0) Initialize ZeticMLangeFeatureFaceDetection
    val feature = FaceDetectionWrapper()

    // (1) Preprocess bitmap and get processed float array
    val inputs = feature.preprocess(bitmap)

    ...

    // (2) Postprocess to bitmap
    val resultBitmap = feature.postprocess(outputs)
    ```

- For iOS

    ``` swift
    import ZeticMLange

    // (0) Initialize ZeticMLangeFeatureFaceDetection
    let feature = FaceDetectionWrapper()
    
    // (1) Preprocess UIImage and get processed float array
    let inputs = feature.preprocess(image)

    ...

    // (2) Postprocess to UIImage
    let resultBitmap = feature.postprocess(&outputs)
    ```

## Total Face Detection Process implementation
Pipelining two models.
- For Android
    - Kotlin
        - Face Detection Model
        ``` kotlin
        // (0) Initialization Models
        val model = ZeticMLangeModel(this, 'face_detection')

        // (1) Initialization Feature
        val faceDetection = FaceDetectionWrapper()
        
        // (2) Preprocess Image
        val faceDetectionInputs = faceDetectionFeature.preprocess(imagePtr)

        // (3) Process Model
        model.run(faceDetectionInputs)
        val faceDetectionOutputs = model.getOutputBuffers()

        // (4) Postprocess model run result
        val faceDetectionPostprocessed = faceDetectionFeature.postprocess(faceDetectionOutputs)
        ```
- For iOS
    - Swift
        - Face Detection Model
        ``` swift
        // (0) Initialization Models
        let model = ZeticMLangeModel('face_detection')

        // (1) Initialization Feature
        let faceDetection = FaceDetectionWrapper()
        
        // (2) Preprocess Image
        let faceDetectionInputs = faceDetection.preprocess(uiImage)

        // (3) Process Model
        model.run(faceDetectionInputs)
        let faceDetectionOutputs = model.getOutputDataArray()

        // (4) Postprocess model run result
        let faceDetectionPostprocessed = faceDetection.postprocess(&faceDetectionOutputs)
        ```

## Conclusion
 With ZETIC.MLange, building your own on-device AI applications with NPU utilization is incredibly easy. We've developed a custom OpenCV module and an ML application pipeline, making the implementation of models like face detection remarkably simple and efficient. This streamlined approach allows you to integrate advanced features with minimal effort. We're continually uploading new models to our examples and [HuggingFace](https://huggingface.co/ZETIC-ai) page. Stay tuned, and [contact us](https://zetic.ai/contact-sales) for collaborations!
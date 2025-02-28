# Face Emotion Recognition (EMO-AffectNet)
<div class="video-container" style="text-align:center;position:relative;height:0;padding-bottom:56.25%;padding-top:0px;overflow:hidden;">
<iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/1FU3n3xBdWA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

- On-device AI Face Emotion Recognition App with ZETIC.MLange

## GitHub Repository

- We provide Face Emotion Recognition demo application source code for both Android and iOS. [repository](https://github.com/zetic-ai/ZETIC_MLange_apps/tree/main/face_emotion_recognition)

## What is EMO-AffectNet

- EMO-AffectNet is a Resnet-50 based deep convolutional neural network architecture that is often used for various computer vision tasks, including image classification and facial emotion recognition.
- EMO-AffectNet hugging face : [link](https://huggingface.co/ElenaRyumina/face_emotion_recognition)

## Model pipelining

For accurate use of the face emotion recognition model, it is necessary to pass an image of the correct facial area to the model. To accomplish this, we construct a pipeline with the Face Detection Model.

1. Face Detection: we use the Face Detection Model to accurately detect the face regions in the image. Using the information from the detected face region, we extract that part of the original image.
2. Face Emotion Recognition: Input the extracted face image into the Face Emotion Recognition model to analyze emotions.

## Step-by-step implementation

### 0. Prerequisites

Prepare the model and input sample of [`Face Emotion Recognition`](https://huggingface.co/ElenaRyumina/face_emotion_recognition) and [`Face Detection`](https://github.com/patlevin/face-detection-tflite/tree/main/fdlite/data) from hugging face.

- Face Detection: Convert the TensorFlow model to the TorchScript model.
    ``` bash
    $ pip install tf2onnx
    $ python -m tf2onnx.convert --tflite face_detection_short_range.tflite --output face_detection_short_range.onnx --opset 13
    ```

- Face Emotion Recognition: Trace the PyTorch model to be a TorchScript model and save.
    - You can find ResNet50 class in [here](https://huggingface.co/ElenaRyumina/face_emotion_recognition/blob/main/run_webcam.ipynb)
    ``` python
    import torch
    import torch.nn as  nn
    import numpy as np
    
    emo_affectnet = ResNet50(7, channels=3)
    emo_affectnet.load_state_dict(torch.load('FER_static_ResNet50_AffectNet.pt'))
    emo_affectnet.eval()

    model_cpu = emo_affectnet.cpu()
    # cur_face would be cropped face image type of numpy array.
    model_traced = torch.jit.trace(model_cpu, (cur_face))

    np_cur_face = cur_face.detach().numpy()
    np.save("data/cur_face.npy", np_cur_face)
                
    output_model_path = f"models/FER_static_ResNet50_AffectNet_traced.pt"
    torch.jit.save(model_traced, output_model_path)
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

        #    - Face emotion recognition model
        $ ./mlange_gen -m FER_static_ResNet50_AffectNet.pt -i input.npy

    ```

    - Expected output
    ``` bash
        ...
        MLange Model Key : {YOUR_FACE_DETECTION_MODEL_KEY}
        ...

        ...
        MLange Model Key : {YOUR_FACE_EMOTION_RECOGNITION_MODEL_KEY}
        ...
    ```

### 2. Implement ZeticMLangeModel with your model key

- We prepared a model key for the demo app: `face_detection` and `face_emotion_recognition`. You can use the model key to try the Zetic.MLange Application.

- Android app
  - For the detailed application setup, please follow [`deploy to Android Studio`](https://docs.zetic.ai/android/deploy-to-android-studio.html) page
  - ZETIC.MLange usage in `Kotlin`

  ``` kotlin
    val faceEmotionRecognitionModel = ZeticMLangeModel(this, 'face_emotion_recognition')

    faceEmotionRecognitionModel.run(inputs)

    val outputs = faceEmotionRecognitionModel.outputBuffers
  ```

- iOS app
  - For the detailed application setup, please follow [`deploy to XCode`](https://docs.zetic.ai/ios/deploy-to-xcode.html) page
  - ZETIC.MLange usage in `Swift`
  ``` swift
    let faceEmotionRecognitionModel = ZeticMLangeModel('face_emotion_recognition')

    faceEmotionRecognitionModel.run(inputs)

    let outputs = faceEmotionRecognitionModel.getOutputDataArray()
  ```

### 3. Prepare Face Emotion Recognition image feature extractor for Android and iOS
- We provide a Face Emotion Recognition feature extractor as an Android and iOS module.
    - (The Face Emotion Recognition feature extractor extension will be exposed as an open-source repository soon.)
    - You can use your own feature extractor if you have one for Face Emotion Recognition usage

- For Android 
    ``` kotlin
    // (0) Initialize FaceEmotionRecognitionWrapper
    val feature = FaceEmotionRecognitionWrapper()

    // (1) Preprocess bitmap and get processed float array
    val inputs = feature.preprocess(bitmap)

    ...

    // (2) Postprocess to bitmap
    val resultBitmap = feature.postprocess(outputs)
    ```

- For iOS

    ``` swift
    import ZeticMLange

    // (0) Initialize FaceEmotionRecognitionWrapper
    let feature = FaceEmotionRecognitionWrapper()
    
    // (1) Preprocess UIImage and get processed float array
    let inputs = feature.preprocess(image)

    ...

    // (2) Postprocess to UIImage
    let resultBitmap = feature.postprocess(&outputs)
    ```

## Total Face Emotion Recognition Process implementation
Pipelining two models.
- For Android
    - Kotlin
        1. Face Detection Model
        ``` kotlin
        // (0) Initialization Models
        val faceDetectionModel = ZeticMLangeModel(this, 'face_detection')

        // (1) Initialization Feature
        val faceDetection = FaceDetectionWrapper()
        
        // (2) Preprocess Image
        val faceDetectionInputs = faceDetection.preprocess(bitmap)

        // (3) Process Model
        faceDetectionModel.run(faceDetectionInputs)
        val faceDetectionOutputs = faceDetectionModel.outputBuffers

        // (4) Postprocess model run result
        val faceDetectionPostprocessed = faceDetection.postprocess(faceDetectionOutputs)
        ```

        2. Face Emotion Recognition Model
        Pass the result of face detection model as an input.
        ``` kotlin
        // (0) Initialization Models
        val faceEmotionRecognitionModel = ZeticMLangeModel(this, 'face_emotion_recognition')

        // (1) Initialization Feature
        val faceEmotionRecognition = FaceEmotionRecognitionWrapper()
        
        // (2) Preprocess Image
        val faceEmotionRecognitionInputs = faceEmotionRecognition.preprocess(bitmap, faceDetectionPostprocessed)

        // (3) Process Model
        faceEmotionRecognitionModel.run(faceEmotionRecognitionInputs)
        val faceEmotionRecognitionOutputs = faceEmotionRecognitionModel.outputBuffers

        // (4) Postprocess model run result
        val faceEmotionRecognitionPostprocessed = faceEmotionRecognition.postprocess(faceEmotionRecognitionOutputs)
        ```

- For iOS
    - Swift
        1. Face Detection Model
        ``` swift
        // (0) Initialization Models
        let faceDetectionModel = ZeticMLangeModel('face_detection')

        // (1) Initialization Feature
        let faceDetection = FaceDetectionWrapper()
        
        // (2) Preprocess Image
        let faceDetectionInputs = faceDetection.preprocess(bitmap)

        // (3) Process Model
        faceDetectionModel.run(faceDetectionInputs)
        let faceDetectionOutputs = faceDetectionModel.getOutputDataArray()

        // (4) Postprocess model run result
        let faceDetectionPostprocessed = faceDetection.postprocess(&faceDetectionOutputs)
        ```

        2. Face Emotion Recognition Model
        Pass the result of face detection model as an input.
        ``` swift
        // (0) Initialization Models
        let faceEmotionRecognitionModel = ZeticMLangeModel('face_emotion_recognition')

        // (1) Initialization Feature
        let faceEmotionRecognition = FaceEmotionRecognitionWrapper()
        
        // (2) Preprocess Image
        let faceEmotionRecognitionInputs = faceEmotionRecognition.preprocess(bitmap, faceDetectionPostprocessed)

        // (3) Process Model
        faceEmotionRecognitionModel.run(faceEmotionRecognitionInputs)
        let faceEmotionRecognitionOutputs = faceEmotionRecognitionModel.getOutputDataArray()

        // (4) Postprocess model run result
        let faceEmotionRecognitionPostprocessed = faceEmotionRecognition.postprocess(&faceEmotionRecognitionOutputs)
        ```

## Conclusion

 With ZETIC.MLange, building your own on-device AI applications with NPU utilization is incredibly easy and silky smooth. We provide the simplest way to implement machine learning applications within pipelines. For example, in our Face Emotion Recognition application, we construct a straightforward pipeline: `Face Detection` to `Face Emotion Recognition`. We're continually uploading new models to our examples and [HuggingFace](https://huggingface.co/ZETIC-ai) page. Stay tuned, and [contact us](https://zetic.ai/contact-sales) for collaborations!

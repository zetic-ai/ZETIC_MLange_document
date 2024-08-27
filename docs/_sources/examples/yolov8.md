# Object Detection (YOLOv8)

![Image](img_yolov8_demo.png)

- On-device AI Object Detection App with ZETIC.MLange (YOLOv8)

## Github repository
- We provide YOLOv8 demo application source code for both Android and iOS applications for the YOLOv8 demo. [repository](https://github.com/zetic-ai/ZETIC_MLange_apps/tree/main/yolov8)

## What is YOLOv8
 - The YOLOv8 is the latest version of the acclaimed real-time object detection and image segmentation model.
 - YOLOv8 document page by Ultralytics: [link](https://docs.ultralytics.com)
 - Currently, we only support detector mode. We'll support other features for the YOLOv8 model later.

## Step-by-step implementation

### 0. Prerequisites
  - We prepared the model key for the model for you. You can skip to step `2` if you want.

#### Prepare the YOLOv8 model and input sample

- Export YOLOv8 model 
    - You will get `yolov8n.onnx` model after the following script

    ``` python
    from ultralytics import YOLO
    import torch

    # Load a YOLOv8 model
    model = YOLO("yolov8n.pt")

    # Export the model
    model.export(format="onnx", opset=12, simplify=True, dynamic=False, imgsz=640)
    ```

- Prepare input sample as NumPy array
    - You can use the default sample input that we prepared: [link](https://github.com/zetic-ai/ZETIC_MLange_apps/raw/main/yolov8/samples/yolo8_detector_input.npy)
    - Default input size for `yolov8n` model
    - Or prepare input from your image file with the below function `preprocess_image(...)`

    ``` python
    import cv2
    import numpy as np

    def preprocess_image(image_path, target_size=(640, 640)):
        img = cv2.imread(image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, target_size)
        img = img.astype(np.float32) / 255.0
        img = np.transpose(img, (2, 0, 1))
        img = np.expand_dims(img, axis=0)
        return img
    ```


### 1. Generate ZETIC.MLange model key

- Get your own MLange model key from the model
    - If you want to get your own model key, please get your own model key as below.
    
    ``` bash
        # (1) Get mlange_gen
        $ wget https://github.com/zetic-ai/ZETIC_MLange_document/raw/main/bin/mlange_gen && chmod 755 mlange_gen

        # (2) Run mlange_gen 
        $ ./mlange_gen -m yolov8n.onnx -i yolo8_detector_input.npy

        # Expected output
        # ...
        # MLange Model Key : {YOUR_YOLOV8_MODEL_KEY}
        # ...
    ```

### 2. Implement ZeticMLangeModel with your model key

- We prepared a model key for the demo app: `yolo-v8n-test`. You can use the model key to try the Zetic.MLange Application.

- Anroid app
  - For the detailed application setup, please follow [`deploy to Android Studio`](https://docs.zetic.ai/android/deploy-to-android-studio.html) page
  - ZETIC.MLange usage in `Java`
    - Demo app is written in `Java`, but you can use `Kotlin` as well.

  ``` java
    ZeticMLangeModel zeticMLangeYoloVModel = new ZeticMLangeModel(this, "YOUR_YOLOV8_MODEL_KEY");

    zeticMLangeYoloVModel.run(inputs);

    ByteBuffer[] outputs = zeticMLangeYoloVModel.getOutputBuffers();
  ```

- iOS app
  - For the detailed application setup, please follow [`deploy to XCode`](https://docs.zetic.ai/ios/deploy-to-xcode.html) page
  - ZETIC.MLange usage in Swift
  ``` swift
    let yoloModel = ZeticMLangeModel(mlange_model_key)

    yoloModel.run(yoloModelInput);

    let outputs = yoloModel.getOutputDataArray()
  ```


### 3. Prepare YOLOv8 image feature extractor for Android and iOS
- We provide a YOLOv8 feature extractor as an Android and iOS module.
    - (The YOLOv8 feature extractor extension will be exposed as an open-source repository soon.)
    - You can use your own feature extractor if you have one for YOLOv8 usage

- For Android 
    ``` java
    // (0) Initialize ZeticMLangeFeatureYolov8 with `coco.yaml` for the model
    ZeticMLangeFeatureYolov8 zeticMLangeFeatureYolov8 = new ZeticMLangeFeatureYolov8(cocoYamlFilePath);

    // (1) Preprocess bitmap and get processed float array
    float[] floatInput = zeticMLangeFeatureYolov8.preprocess(bitmap);

    ...

    // (2) Postprocess to bitmap
    Bitmap resultBitmap = zeticMLangeFeatureYolov8.postprocess(outputFloatArray);
    ```

- For iOS

    ``` swift
    import ZeticMLange

    // (0) Initialize ZeticMLangeFeatureYolov8
    let yoloFeature = ZeticMLangeFeatureYolov8(cocoYamlFileUrl)
    
    // (1) Preprocess UIImage and get processed float array
    let yoloProcessedData = self.yoloFeature.preprocess(image)

    ...

    // (2) Postprocess to UIImage
    let yoloResultImage = self.yoloFeature.postprocess(image, &outputs[0])
    ```

## Total YOLOv8 Process implementation

- For Android
    - Java
        ``` java
        // (0) Initialization
        ZeticMLangeFeatureYolov8 zeticMLangeFeatureYolov8 = new ZeticMLangeFeatureYolov8(cocoYamlFilePath);
        zeticMLangeYoloVModel = new ZeticMLangeModel(this, "YOUR_YOLOV8_MODEL_KEY");

        // (1) Preprocess image
        float[] floatInput = zeticMLangeFeatureYolov8.preprocess(bitmap);

        // (2) Process YOLOv8 Model
        zeticMLangeYoloVModel.run([floatInput]);
        ByteBuffer[] outputs = zeticMLangeYoloVModel.getOutputBuffers();

        // (3) Postprocess to bitmap
        Bitmap resultBitmap = zeticMLangeFeatureYolov8.postprocess(outputFloatArray);        
        ```

- For iOS

    - iOS

        ``` swift
        // (0) Initialization
        private let yoloModel: ZeticMLangeModel
        private let yoloFeature = ZeticMLangeFeatureYolov8(cocoYamlFileUrl)

        // (1) Preprocess image
        let yoloProcessedData = self.yoloFeature.preprocess(image)

        // (2) Process YOLOv8 Model
        self.yoloModel.run([yoloProcessedData]);
        let outputs = self.yoloModel.getOutputDataArray()

        // (3) Postprocess the output
        let yoloResultImage = self.yoloFeature.postprocess(image, &outputs[0])
        ```

## Conclusion

  With ZETIC.MLange, You can easily build your own on-device AI application with NPU utilizations. We are going to keep uploading the models to our examples and huggingface page. Please keep noticed and [contact us](https://zetic.ai/contact-sales) for the collaborations!

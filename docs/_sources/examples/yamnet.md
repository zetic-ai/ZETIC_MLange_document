# Audio Classification (YAMNet)

## What is YAMNet

- YAMNet is a deep neural network that predicts audio events from the AudioSet-YouTube corpus
- YAMNet was trained on the AudioSet dataset, which includes 521 audio event classes
- YAMNet hugging face: [link](https://huggingface.co/tensorflow/yamnet)

## Step-by-step implementation

### 0. Prerequisites

Prepare the YAMNet model from TensorFlow Hub or Hugging Face.

- YAMNet: Convert the TensorFlow model to ONNX format
    ```python
    import tensorflow as tf
    import tensorflow_hub as hub
    import tf2onnx
    import numpy as np

    model = hub.load('https://tfhub.dev/google/yamnet/1')
    concrete_func = model.signatures['serving_default']

    input_shape = [1, 16000]
    sample_input = np.random.randn(*input_shape).astype(np.float32)

    input_tensor = tf.convert_to_tensor(waveform, dtype=tf.float32)

    tf.saved_model.save(
        model,
        "yamnet_saved_model",
        signatures=concrete_func
    )

    # Now use tf2onnx command line
    # python -m tf2onnx.convert --saved-model yamnet_saved_model --output yamnet.onnx --opset 13
    ```

- Prepare sample input for converting:
    ```python
    import numpy as np
    
    sample_rate = 16000
    duration = 1  # 1 second
    waveform = np.sin(2 * np.pi * 440 * np.linspace(0, duration, sample_rate))
    waveform = waveform.astype(np.float32)
    waveform = np.expand_dims(waveform, axis=0)
    np.save('waveform.npy', waveform)
    ```

### 1. Generate ZETIC.MLange model

- Get your own MLange model key
    ```bash
    # (1) Get mlange_gen
    $ wget https://github.com/zetic-ai/ZETIC_MLange_document/raw/main/bin/mlange_gen && chmod 755 mlange_gen

    # (2) Run mlange_gen for YAMNet model
    $ ./mlange_gen -m yamnet.onnx -i waveform.npy
    ```

    - Expected output
    ```bash
    ...
    MLange Model Key : {YOUR_YAMNET_MODEL_KEY}
    ...
    ```

### 2. Implement ZeticMLangeModel with your model key

- We provide a model key for the demo app: `yamnet`. You can use this model key to try the Zetic.MLange Application.

- Android app
  - For detailed application setup, please follow [`deploy to Android Studio`](https://docs.zetic.ai/android/deploy-to-android-studio.html)
  - ZETIC.MLange usage in `Kotlin`

  ```kotlin
    val yamnetModel = ZeticMLangeModel(this, "yamnet")

    yamnetModel.run(inputs)

    val outputs = yamnetModel.outputBuffers
  ```

- iOS app
  - For detailed application setup, please follow [`deploy to XCode`](https://docs.zetic.ai/ios/deploy-to-xcode.html)
  - ZETIC.MLange usage in `Swift`
  ```swift
    let yamnetModel = ZeticMLangeModel("yamnet")

    yamnetModel.run(inputs)

    let outputs = yamnetModel.getOutputDataArray()
  ```

### 3. Prepare Audio Feature Extractor for Android and iOS

- We provide an Audio Feature Extractor as an Android and iOS module
    - You can use your own feature extractor if you have one for audio processing

- For Android
    ```kotlin
    // (1) Preprocess audio data and get processed float array
    val inputs = preprocess(audioData)

    ...

    // (2) Postprocess model outputs
    val results = postprocess(outputs)
    ```

- For iOS
    ```swift
    import ZeticMLange

    // (1) Preprocess audio data and get processed float array
    let inputs = preprocess(audioData)

    ...

    // (2) Postprocess model outputs
    let results = postprocess(&outputs)
    ```

## Complete Audio Classification Implementation

- For Android
    - Kotlin
    ```kotlin
    // (0) Initialize Model
    val yamnetModel = ZeticMLangeModel(this, "yamnet")

    // (1) Preprocess Audio
    val inputs = preprocess(audioData)

    // (2) Run Model
    yamnetModel.run(inputs)
    val outputs = yamnetModel.outputBuffers

    // (3) Postprocess Results
    val predictions = postprocess(outputs)
    ```

- For iOS
    - Swift
    ```swift
    // (0) Initialize Model
    let yamnetModel = ZeticMLangeModel("yamnet")

    // (1) Preprocess Audio
    let inputs = preprocess(audioData)

    // (2) Run Model
    yamnetModel.run(inputs)
    let outputs = yamnetModel.getOutputDataArray()

    // (3) Postprocess Results
    let predictions = postprocess(&outputs)
    ```

## Conclusion

With ZETIC.MLange, implementing on-device audio classification with NPU acceleration is straightforward and efficient. YAMNet provides robust audio event detection capabilities across a wide range of categories. The simple pipeline of audio preprocessing and classification makes it easy to integrate into your applications. We're continuously adding new models to our examples and [HuggingFace](https://huggingface.co/ZETIC-ai) page. Stay tuned, and [contact us](https://zetic.ai/contact-sales) for collaborations!
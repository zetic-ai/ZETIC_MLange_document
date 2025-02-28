# Getting Started

This page describes the requirements to start ZETIC.MLange

```{admonition} Beta version notification

 Current version of ZETIC.MLange generates an on-device AI library from your model on a remote server.
We guarantee that your AI model and data remain confidential and we won't use or leak it.

```

## 0. Prepare model

- The input for the MLange is (1) [TorchScript, ONNX] model and (2) NumPy input(s).
- For more details, refer to [Prepare Model and Input(s)](../steps/prepare_model/index.rst)

## 1. Prepare Model Key and Personal Key
- Use `SaaS Method` or `CLI Method` to generate **Model Key**.
    - Generating `Model Key` Example
    ``` bash
    # Generating Model Key with CLI Method.
    $ zetic gen -p $PROJECT_NAME -i $INPUT_0 -i $INPUT_1 .... $MODEL_PATH
    ```
- Use `SaaS Method` to generate **Personal Key**
    - Copying `Personal Key` Example
    ![Copying-Personal-Key](../steps/generate_personal_key/2_copy_personal_key.png)
- For more details, refer to [Generate Model Key](../steps/generate_model_key/index.rst) and [Generate Personal Key](../steps/generate_personal_key/index.rst)

## 2. Initialize and run your model in mobile app

- Android

    - Please follow [deploy-to-android-studio](../deploy_model/android.md) page for details

    - **Kotlin**

        ``` kotlin
        val model = ZeticMLangeModel(this, "MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY")
        model.run(YOUR_INPUT_BYTE_BUFFERS)
        ```

- iOS

    - Please follow [deploy-to-xcode](../deploy_model/iOS.md) page for details

    - **Swift**

        ``` swift
        let model = try ZeticMLangeModel("MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY")
        model.run(YOUR_INPUT_DATA_ARRAY)
        ```


## (+) Profiling MLange Model
With proving [SaaS](https://mlange.zetic.ai), You can also get much information about MLange Model. Including progress of making Model Key and how effectively the model can be used on various devices.


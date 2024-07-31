Deploy to Android Studio
========================

 MLange supports both for **Kotlin** and **Java** implementations.

 Deploy your own On-device AI Android application easily.
There are only three steps are needed.
  1. Download [`zeticMLange.aar`](https://github.com/zetic-ai/zetic_mlange_android_sample/releases/download/v0.2.0/zeticMLange.aar) and place it in your application library directory
  2. Add module dependency in your library
  3. Initiailize `ZeticMLangeModel` with your Model Key and run

## Prerequisite

1. Model Key

    - You can get Model Key in with `mlange_gen` at [Getting-started](https://zetic-ai.github.io/ZETIC_MLange_document/overview/getting-started.html) page

2. Aar Library

    - Zetic MLange : [`zeticMLange.aar` (*click to download*)](https://github.com/zetic-ai/zetic_mlange_android_sample/releases/download/v0.2.0/zeticMLange.aar) 

## 1. Download and place `zeticMLange.aar` to your project

- Leave [`zeticMLange.aar`](https://github.com/zetic-ai/zetic_mlange_android_sample/releases/download/v0.2.0/zeticMLange.aar) under `app/libs/zeticlibs`

  - e.g. Android project structure
    ``` 
    app
    └── libs
        └── zeticlibs
            └── zeticMLange.aar
    ```


## 2. Add `zeticMLange.aar` dependency to your app

- Update gradle to use `zeticMLange.aar`
- You can choose `Groovy` build or `Kotlin DSL` build
    - build.gradle (Groovy)

    ``` gradle

    android {
        ...
        packagingOptions {
            jniLibs {
                useLegacyPackaging true
            }
        }
    }

    dependencies {
        implementation files('libs/zeticlibs/zeticMLange.aar')
    }

    ```

    - build.gradle.kts (Kotlin DSL)

    ``` gradle

    android {
        ...
        packaging {
            jniLibs {
                useLegacyPackaging = true
            }
        }
    }

    dependencies {
        implementation(files("libs/zeticlibs/zeticMLange.aar"))
    }

    ```


## 3. Initialize and run `ZeticMLangeModel` model with your Model Key
- MLange supports both Kotlin and Java implementation

  1. Zetic MLange model running (Java)

    ``` java
    // 1. Zetic MLange model running

    // (1) Load Zetic MLange model
    ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE_MODEL_KEY");

    // (2) Run model after preparing model inputs
    ByteBuffer[] inputs = // Prepare your inputs;
    model.run(inputs);

    // (3) Get output buffers of the model
    ByteBuffer[] outputs = model.getOutputBuffers();
    ```

  2. Zetic MLange model running (Kotlin)

    ``` kotlin
    // 1. Zetic MLange Model Running

    // (1) Load Zetic MLange model
    val model = ZeticMLangeModel(this, "MLANGE_MODEL_KEY")

    // (2) Run model after preparing model inputs
    val inputs: Array<ByteBuffer> = // Prepare your inputs
    model.run(inputs)

    // (3) Get output buffers of the model
    val outputs = model.outputBuffers
    ```

## MLange Android Sample App

 - Please refer [MLange Android sample app](https://github.com/zetic-ai/zetic_mlange_android_sample) for more details


## (+) Additional API for MLange-Android usage

- As a default we set the model to use **FP16** data type over **NPU**.
- We set 2 more options for user to choose runtime mode for **(1) Better output accuracy** and **(2) High-speed inference**.
- You cas set model option while you laod the model like sample code below.


    ``` kotlin

        // (1) Output Accuracy mode - `FP32 - (CPU, GPU)` mode
        val model = ZeticMLangeModel(this, "MLANGE_MODEL_KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_FP32)

        // (2) High-speed inference mode - `Quantized - (NPU)` mode
        val model = ZeticMLangeModel(this, "MLANGE_MODEL_KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_QUANTIZED)
    ```

    ``` java

        // (1) Output Accuracy mode - `FP32 - (CPU, GPU)` mode
        ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE_MODEL_KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_FP32);

        // (2) High-speed inference mode - `Quantized - (NPU)` mode
        ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE_MODEL_KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_QUANTIZED);
    ```
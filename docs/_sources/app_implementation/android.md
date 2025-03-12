Android
========================

Deploy to Android Studio
------------------------

MLange supports both for **Kotlin** and **Java** implementations.

Deploy your own On-device AI Android application easily.

There are only two steps are needed.
  1. Add module dependency in your library
  2. Initialize `ZeticMLangeModel` with your **Model Key / Personal Key** and run

## Prerequisite
- Model Key
  - Prepare Model Key in with [**SaaS**](../steps/generate_model_key/index.rst) or [**CLI**](../steps/generate_model_key/generate-to-CLI.md) method
- Personal Key
  - Prepare Personal Key in with [**SaaS**](../steps/generate_personal_key/index.rst) method

## Step-by-step Guideline

### 1. Add `ZeitcMLange` dependency

- You can choose `Groovy` build or `Kotlin DSL` build
    - build.gradle (Groovy)

        ``` groovy

        android {
            ...
            packagingOptions {
                jniLibs {
                    useLegacyPackaging true
                }
            }
        }

        dependencies {
            implementation 'com.zeticai.mlange:mlange:1.0.1'
        }

        ```

    - build.gradle.kts (Kotlin DSL)

        ``` kotlin

        android {
            ...
            packaging {
                jniLibs {
                    useLegacyPackaging = true
                }
            }
        }

        dependencies {
            implementation("com.zeticai.mlange:mlange:1.0.1")
        }

        ```


### 2. Initialize and run `ZeticMLangeModel` model with Model Key
- MLange supports both Kotlin and Java implementation

  1. Zetic MLange model running (Java)

    ``` java
    // 1. Zetic MLange model running

    // (1) Load Zetic MLange model
    ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY");

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
    val model = ZeticMLangeModel(this, "MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY")

    // (2) Run model after preparing model inputs
    val inputs: Array<ByteBuffer> = // Prepare your inputs
    model.run(inputs)

    // (3) Get output buffers of the model
    val outputs = model.outputBuffers
    ```

## ZETIC.MLange Android Sample App

 - Please refer [ZETIC MLange Apps](https://github.com/zetic-ai/ZETIC_MLange_apps) for more details


### (+) Additional API for MLange-Android usage

- As a default we set the model to use **FP16** data type over **NPU**.
- We set 2 more options for user to choose runtime mode for **(1) Better output accuracy** and **(2) High-speed inference**.
- You can set model option while you load the model like sample code below.


    ``` kotlin

    // (1) Output Accuracy mode - `FP32 - (CPU, GPU)` mode
    val model = ZeticMLangeModel(this, "MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_FP32)

    // (2) High-speed inference mode - `Quantized - (NPU)` mode
    val model = ZeticMLangeModel(this, "MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_QUANTIZED)
    ```

    ``` java

    // (1) Output Accuracy mode - `FP32 - (CPU, GPU)` mode
    ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_FP32);

    // (2) High-speed inference mode - `Quantized - (NPU)` mode
    ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_QUANTIZED);
    ```
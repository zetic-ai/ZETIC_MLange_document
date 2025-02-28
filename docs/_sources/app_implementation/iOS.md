iOS
===

Deploy to Xcode
---------------

 We provide Swift Native Interface.

Deploy your own On-device AI iOS application easily.
There are only three steps are needed.
  1. Embed `ZeticMLange.framework` to your iOS application project
  2. Update project settings to use `ZeticMLange.framework`
  3. Initialize `ZeticMLangeModel` with your **Model Key / Personal Key** and run


## Prerequisite

### Model Key
- You can get Model Key in with [**SaaS**](../steps/generate_model_key/generate-to-SaaS.md) or [**CLI**](../steps/generate_model_key/generate-to-CLI.md) method
### Personal Key
- You can get Personal Key in with [**SaaS**](../steps/generate_personal_key/index.rst) method
### `ZeticMLange.framework` Library
    - Zetic MLange : [`ZeticMLange.framework`](https://github.com/zetic-ai/ZETIC_MLange_apps/tree/add_framework_1.0.1/ZeticLLMApps/ZeticLLMApp-iOS/ZeticMLange.framework)
      - you can download [`ZeticMLange.framework.zip` (*click to download*)](https://github.com/zetic-ai/ZETIC_MLange_apps/raw/refs/heads/add_framework_1.0.1/files/ZeticMLange.framework.zip). Please unzip the library to your Xcode project.


## 1. Download and embed place `ZeticMLange.framework` to your project

  - e.g. iOS application project structure
    ```
    MyiOSApplicationProject
    └── MyiOSApplication
    └── ZeticMLange.framework
    ```

## 2. Update project settings to use `ZeticMLange.framework` to your project

1. Embed `ZeticMLange.framework` to your application project
![alt text](iOS_imgs/mlange_xcode_app_setting_01.png)

2. Set `runpath` Search Paths to `@executable_path/Frameworks`
![alt text](iOS_imgs/mlange_xcode_app_setting_02.png)


## 3. Initialize and run `ZeticMLangeModel` model with your Model Key

  - Zetic MLange model running (Swift)

    ``` swift
    // 1. Zetic MLange model running

    // (1) Load Zetic MLange model
    let model = try ZeticMLangeModel("MLANGE_PERSONAL_KEY", "MLANGE_MODEL_KEY")

    // (2) Run model after preparing model inputs
    let inputs: [Data] = [] // Prepare your inputs
    try model.run(inputs)

    // (3) Get output data array
    let outputs = model.getOutputDataArray()
    ```

## MLange iOS Sample App
  - Please refer [MLange iOS sample app](https://github.com/zetic-ai/zetic_mlange_ios_sample) for more details


## (+) Additional API for MLange-iOS usage
- The Swift pakage manager support will be updated soon.
- (This will be updated very soon!)
  - As a default we set the model to use FP16 data type over NPU
  - We set 1 more option for user to choose runtime mode for Better output accuracy.

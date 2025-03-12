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
- Model Key
  - Prepare Model Key in with [**SaaS**](../steps/generate_model_key/generate-to-SaaS.md) or [**CLI**](../steps/generate_model_key/generate-to-CLI.md) method
- Personal Key
  - Prepare Personal Key in with [**SaaS**](../steps/generate_personal_key/index.rst) method

## Step-by-step Guideline

### 1. Download and embed `ZeticMLange.framework`
- **Future Works**: We are currently working on integrating the `ZeticMLange.framework` via `Swift Package Manager(SPM)` for easier management and inclusion in your project. Once this is available, you will be able to simply add the package through Xcode without needing to manually download and unzip the framework.
1. Download the `ZeticMLange.framework.zip` file from the provided link and unzip it.
  - Zetic MLange: [**ZeticMLange.framework**](https://github.com/zetic-ai/ZETIC_MLange_apps/tree/add_framework_1.0.1/ZeticLLMApps/ZeticLLMApp-iOS/ZeticMLange.framework)
  - Download Link [**ZeticMLange.framework.zip**](https://github.com/zetic-ai/ZETIC_MLange_apps/raw/refs/heads/add_framework_1.0.1/files/ZeticMLange.framework.zip)
    - Please unzip the library to your Xcode project.
2. Drag the unzipped `ZeticMLange.framework` file into your Xcode project in the appropriate location.
  - Example project structure:
      ```
      MyiOSApplicationProject
      └── MyiOSApplication
      └── ZeticMLange.framework
      ```

### 2. Update project settings to use `ZeticMLange.framework`

1. Embed `ZeticMLange.framework` to your application project
![alt text](iOS_imgs/mlange_xcode_app_setting_01.png)

2. Set `runpath` Search Paths to `@executable_path/Frameworks`
![alt text](iOS_imgs/mlange_xcode_app_setting_02.png)


### 3. Initialize and run `ZeticMLangeModel` model with Model Key

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

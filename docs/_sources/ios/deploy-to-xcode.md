Deploy to XCode
========================

 We provide Swift Native Interface.

Deploy your own On-device AI iOS application easily.
There are only three steps are needed.
  1. Embed `ZeticMLange.framework` to your iOS application project
  2. Update project settings to use `ZeticMLange.framework`
  3. Initiailize `ZeticMLangeModel` with your Model Key and run


## Prerequisite

1. Model file

    - You can get Model Key in with `mlange_gen` at [Getting-started](https://zetic-ai.github.io/ZETIC_MLange_document/overview/getting-started.html) page

2. `ZeticMLange.framework` Library

    - Zetic MLange : [`ZeticMLange.framework`](https://github.com/zetic-ai/zetic_mlange_ios_sample/tree/v0.2.0/ZeticMLangeiOSSample/ZeticMLange.framework)
      - you can download [`ZeticMLange.framework.zip` (*click to download*)](https://github.com/zetic-ai/zetic_mlange_ios_sample/releases/download/v0.2.0/ZeticMLange.framework.zip). Please unzip the library to your XCode project.


## 1. Download and embed place `ZeticMLange.framework` to your project

  - e.g. iOS application project structure
    ```
    MyiOSApplicationProject
    └── MyiOSApplication
    └── ZeticMLange.framework
    ```

## 2. Update project settings to use `ZeticMLange.framework` to your project

1. Embed `ZeticMLange.framework` to your application project
![alt text](mlange_xcode_app_setting_01.png)

2. Set `runpath` Search Paths to `@executable_path/Frameworks`
![alt text](mlange_xcode_app_setting_02.png)


## 3. Initialize and run `ZeticMLangeModel` model with your Model Key

  - Zetic MLange model running (Swift)

    ``` swift
    // 1. Zetic MLange model running

    // (1) Load Zetic MLange model
    let model = try ZeticMLangeModel("MLANGE_MODEL_KEY")

    // (2) Run model after preparing model inputs
    let inputs: [Data] = [] // Prepare your inputs
    try model.run(inputs)

    // (3) Get output data array
    let outputs = model.getOutputDataArray()
    ```

## MLange iOS Sample App
  - Please refer [MLange iOS sample app](https://github.com/zetic-ai/zetic_mlange_ios_sample) for more details


## (+) Additional API for MLange-iOS usage
- (This will be updated very soon!)
  - As a default we set the model to use FP16 data type over NPU
  - We set 1 more option for user to choose runtime mode for Better output accuracy.

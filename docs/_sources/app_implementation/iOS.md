iOS
===

Deploy to Xcode
---------------

We Provide ZETIC.MLange iOS Package via Swift Package Manager. you can easily add `ZeticMLange` to your project!
There are only two steps are needed.
  1. Add `ZeticMLange` Package in project.
  2. Select target to add `ZeticMLange` Package.
  3. Initialize `ZeticMLangeModel` with your **Model Key / Personal Key** and run


## Prerequisite
- Model Key
  - Prepare Model Key in with [**SaaS**](../steps/generate_model_key/generate-to-SaaS.md) or [**CLI**](../steps/generate_model_key/generate-to-CLI.md) method
- Personal Key
  - Prepare Personal Key in with [**SaaS**](../steps/generate_personal_key/index.rst) method

## Step-by-step Guideline

### 1. Add `ZeticMLange` Package in project.
1. Click File -> Add Package Dependencies in XCode.
2. Search for `https://github.com/zetic-ai/ZeticMLangeiOS.git`.
3. Click Add Package.
![add package](iOS_imgs/mlange_xcode_app_setting_01.png)

### 2. Select target to add `ZeticMLange` Package.

1. Select target in `Add to Target` column.
2. Click Add Package.
![select target](iOS_imgs/mlange_xcode_app_setting_02.png)


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

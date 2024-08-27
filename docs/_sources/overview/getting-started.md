# Getting Started

This page describes the requirements to start ZETIC.MLange

```{admonition} Beta version notification

 Current version of ZETIC.MLange generates an on-device AI library from your model on a remote server.
We guarantee that your AI model and data remain confidential and we won't use or leak it.

```

## 0. Prepare model

- The input for the MLange is (1) [TorchScript, ONNX] model and (2) numpy input.
- To use Torch `nn.Module`, please trace your model first.
    - Refer the following page for details: [link](https://pytorch.org/docs/stable/generated/torch.jit.save.html)

    ``` python
        import torch
        import numpy as np

        torch_model = Torch.nn.Module(...)

        # Trace Your PyTorch model
        torchscript_model = torch.jit.trace(your_torch_model, TORCH_INPUTS)

        # (1) Save your traced model
        torch.jit.save(torchscript_model, OUTPUT_TORCHSCRIPT_MODEL_PATH)

        # (2) Save your sample inputs to use
        np_input = TORCH_INPUT.detach().numpy()
        np.save("INPUT.npy", np_input)

    ```
- Or you can get ONNX model from your own model
    - Refer the following page for getting ONNX model: [link](https://github.com/onnx/tutorials#converting-to-onnx-format)



## 1. ZETIC.MLange Model generator

- Run `mlange_gen` and get `MLANGE_MODEL_KEY` for your model
    - Please save your `MLANGE_MODEL_KEY` to utilize in your app

    ``` bash
        $ wget https://github.com/zetic-ai/ZETIC_MLange_document/raw/main/bin/mlange_gen
        $ ./mlange_gen -m ai_model.pt -i input0.npy,input1.npy,...
        # You can also use onnx model for `mlange_gen`
    
    ```
        
    - Expected Output: Save `MLANGE_MODEL_KEY`

        ``` bash     
            # Enter your email to receive updates from us
            # Press Enter to skip
            Email : {TYPE YOUR EMAIL}

            File Uploading...

            MLange Model Key : MLANGE_MODEL_KEY
            MLange model profiling started. it might takes 10 or more minutes.
            The number of model downloads is limited. You can download it 5 times during the trial.

        ```

## 2. Initialize and run your model in mobile app
- Android
  - Please follow [deploy-to-android-studio](https://zetic-ai.github.io/ZETIC_MLange_document/android/deploy-to-android-studio.html) page for details
  - (Kotlin)
    ``` kotlin
        val model = ZeticMLangeModel(this, "MLANGE_MODEL_KEY")
        model.run(YOUR_INPUT_BYTE_BUFFERS)
    ```

- iOS
  - Please follow [deploy-to-xcode](https://zetic-ai.github.io/ZETIC_MLange_document/ios/deploy-to-xcode.html) page for details
  - (Swift)
    ``` swift
        let model = try ZeticMLangeModel("MLANGE_MODEL_KEY")
        model.run(YOUR_INPUT_DATA_ARRAY)
    ```


## (+) MLange model status checker
 - We provide `mlange_stat` to check the profiling status of your model.
    ``` bash
    $ ./mlange_stat -k MLANGE_MODEL_KEY
    ```
   ### [Expected outputs per status]
   - (1) On Converting 
        ``` bash
        MLange Model : MODEL_KEY is on CONVERTING.
        Your model is converting to target libraries.
        It takes about 5 ~ 10 minutes.
        ```
   - (2) On Benchmarking
        - Benchmark result will be provided to starter package users only: [Contact us for detail](https://zetic.ai/contact-sales)
        ``` bash
        MLange Model : MODEL_KEY is on BENCHMARKING
        Converted target libraries will be benchmarked on a pool of real devices.
        It takes about 20 ~ 30 minutes.
        ```
   - (3) On Available
        ``` bash
        MLange Model : MODEL_KEY is on AVAILABLE
        ZETIC.MLange Model is now ready to be used.
        Please refer the documentation to deploy on real device. https://docs.zetic.ai/
        You have 5 downloads left.
        ```
   - (4) On Failed
        ``` bash
        MLange Model : MODEL_KEY is on FAILED.
        Model profiling has failed. Please Contact us. https://zetic.ai/contact-sales
        ```

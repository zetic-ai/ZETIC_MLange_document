# Getting Started

This page describes requirements to start ZETIC.MLange

```{admonition} Beta version notification

 Current version of ZETIC.MLange generates On-device AI library from your model in remote server.
We guarantee that your AI model and data remain confidential and we are not going to use it.

```

## 0. Prepare model

- The input for the MLange is (1) TorchScript model and (2) numpy input.
- Please trace your pytorch model first.
- Refer following page for details: [link](https://pytorch.org/docs/stable/generated/torch.jit.save.html)

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


## 1. ZETIC Model generator

``` bash
    $ wget https://github.com/zetic-ai/ZETIC_MLange_document/raw/main/bin/mlange_gen
    $ ./mlange_gen -m TORCH_SCRIPT_MODEL -i INPUT0.npy,INPUT1.npy,...

    # Expected Output
    # Enter your email to receive updates from us
    # Press Enter to skip
    Email : {INPUT EMAIL}

    File Uploading...

    MLange Model Key : {YOUR_MODEL_KEY}
    MLange model profiling started. it might takes 10 or more minutes.
    The number of model downloads is limited. You can download it 5 times during the trial.

```


## 2. ZETIC.MLange Implementation in your mobile app
- Android
  - (Kotlin)
    ``` kotlin
        ZeticMLangeModel model = new ZeticMLangeModel("YOUR MODEL KEY");
        model.run(YOUR_INPUT_BYTE_BUFFERS)
    ```

- iOS
  - (Swift)
    ``` swift
        val model = ZeticMLangeModel(this, "YOUR MODEL KEY")
        model.run(YOUR_INPUT_BYTE_BUFFERS)
    ```



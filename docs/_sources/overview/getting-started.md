# Getting Started (Requirements)

This page describes requirements to start ZETIC.MLange

```{admonition} Beta version notification

 Current version of ZETIC.MLange generate library from your model in remote server.
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
    $ wget [TO BE UPDATED]
    $ ./ mlange_gen -m TORCH_SCRIPT_MODEL -i INPUT0.npy,INPUT1.npy,...

    # Expected Output
    # [Type your e-mail if you want to get contact about the mail: ] (Press Enter to skip)

    # - MLange Model key: {YOUR MODEL KEY}

```


## 2. ZETIC.MLange Implementation in your mobile app
- Android
  - (Kotlin)
    ``` kotlin
        ZeticMelangeModel userModel = new ZeticMelangeModel("https://zetic.ai/target_models/USER/MODEL_PATH");
        userModel.run(MODEL_INPUTS)
    ```

- iOS
  - (Swift)
    ``` swift
        val model = ZeticMLangeModel(this, "YOUR MODEL KEY")
        model.run(YOUR_INPUT_BYTE_BUFFERS)
    ```



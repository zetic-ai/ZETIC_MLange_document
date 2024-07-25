Model Preparations for On-device AI
===================================

## Prepare model

- We need a model that is saved after converting from pytorch `nn.Module` to torch script model.
- Currently dynamic shape is not supported 
- Model export sample

  ``` python

  your_torch_model = Torch.nn.Module(...)

  # Set target cpu for your Model
  torch_model_cpu = your_torch_model.cpu()

  # Prepare sample input file 
  torch_input0 // torch.Tensor
  torch_input1 // torch.Tensor
  torch_inputs = tuple([torch_input0, torch_input1])

  # Trace your model to TorchScript model
  traced_model = torch.jit.trace(torch_model_cpu, torch_inputs)

  # Prepare sample output file
  torch_output = traced_model(torch_inputs)

  # (1) Save your model to deliver to ZETIC.ai
  torch.jit.save(model_traced, OUTPUT_TORCH_MODEL_PATH)

  # (2) Save your sample input and output to deliver to ZETIC.ai
  import numpy as np
  numpy_model_input0 = torch_input0.detach().numpy()
  np.save(OUTPUT_INPUT_SAMPLE0_PATH, numpy_model_input0)

  numpy_model_input1 = torch_input1.detach().numpy()
  np.save(OUTPUT_INPUT_SAMPLE0_PATH, numpy_model_input1)

  numpy_model_output = torch_output0.detach().numpy()
  np.save(OUTPUT_INPUT_SAMPLE0_PATH, numpy_model_output0)

  ```

## Contact `ZETIC.ai`

After you create Model and Sample data, please contact `contact@zetic.ai`.

Then we will provide you as below steps.
  1. Measure your model's performance benchmark in Android/iOS device
  2. Optimize when it is needed
  3. Provide you runtime libraries for implementation
    - Please refer `deploy-to-android-studio` page to implement
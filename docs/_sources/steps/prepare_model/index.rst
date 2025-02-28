Prepare Model and Input(s)
==========================

Save Model and Input(s)
-----------------------

- The input for the MLange is (1) [TorchScript, ONNX] model and (2) NumPy input(s).
- To use Torch ``nn.Module``, please trace your model first.
    .. code:: python

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
    
    - Refer the following page for details: `torch.jit.save <https://pytorch.org/docs/stable/generated/torch.jit.save.html>`_

- Or you can get ONNX model from your own model
    - Refer the following page for getting ONNX model: `Converting to ONNX format <https://github.com/onnx/tutorials#converting-to-onnx-format>`_


Check the Order of Model Input(s)
---------------------------------

You can verify the order of the model inputs using `Netron <https://github.com/lutzroeder/netron>`_. It’s crucial to provide the data in the **same order** when generating a new model key or running the model after deployment. Maintaining the correct input order is essential for the model to function correctly.

Additionally, even if the original model supports flexible input sizes, the input and output sizes of the generated model will be fixed based on the size of the input tensor used when creating the model.


.. image:: check_list_with_netron.png
   :alt: Checking input sequence
   :align: center
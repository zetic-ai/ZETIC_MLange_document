
CLI Method
==========

### How to Generate a Model Key Using CLI

This guide explains how to generate a model key using the CLI(Command Line Interface) method. **We assume that the project has already been created using the SaaS method.**

0. **Install zetic CLI** 
To get started, install the zetic CLI by running the following command:

```bash
$ pip install zetic
```
This will install the `zetic` command, which you will use to interact with your project.

1. **Sign Up / Log In**
Before proceeding, you must be signed in to your ZETIC account. If you are not logged in yet, use the following command:

```bash
$ zetic auth login
```

2. **Upload Your Model**
Once you're logged in, you can upload your model to ZETIC. Use the following command to upload your model:

```bash
$ zetic gen -p $PROJECT_NAME -i $INPUT_0 -i $INPUT_1 .... $MODEL_PATH
```
- **Where**:
    - **PROJECT_NAME** is the name of the project that contains your model and is formatted as `USER_NAME/MODEL_NAME`. You can find this by logging into mlange.zetic.ai.
    - **INPUT_0, INPUT_1, ...** are the paths to input files you want to upload. We currently support only `.npy` files for inputs.
    - **MODEL_PATH** is the path to the model file you want to upload. We support `TorchScript` and `ONNX` formats only.
- **Pay attention to the input sequence of your model.** For more details on the input sequence, please refer to [this link](../prepare_model/index.rst#check-the-order-of-model-input-s).


##### Example:
```bash
$ zetic gen -p USER_NAME/MODEL_NAME -i INPUT_0.npy -i INPUT_1.npy MODEL_NAME.onnx
```
##### Expected Output:
```bash
Uploading model from MODEL_NAME.onnx to project USER_NAME/MODEL_NAME
Starting upload process...
Project: USER_NAME/MODEL_NAME
Model Path: MODEL_NAME.onnx
Upload completed successfully!
Model is requested to convert
Your model key is MODEL_KEY_HASH
Check your dashboard at: https://mlange.zetic.ai/p/USER_NAME/MODEL_NAME/models/MODEL_KEY_HASH
The upload process will begin, and after it completes, a model key will be generated.
The model key, shown as MODEL_KEY_HASH, is unique to your model and can be used to reference it in your zetic dashboard.
To view more details about your model, including settings and statistics, visit the link provided in the output: https://mlange.zetic.ai/p/USER_NAME/MODEL_NAME/models/MODEL_KEY_HASH.
```

Additional Commands and Help
----------------------------
If you need more information or options related to the `zetic` CLI, you can run the following commands:
```bash
$ zetic --help
$ zetic auth login --help
$ zetic gen --help
...
```

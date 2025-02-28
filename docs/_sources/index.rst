.. ZETIC.MLange documentation master file, created by
   sphinx-quickstart on Thu May 16 13:47:29 2024.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

ZETIC.MLange API
=============================================

.. image:: icon/zetic_mlange_icon.png
  :width: 75
  :alt: MLange icon image

ZETIC.MLange is an On-device AI runtime library supporting heterogeneous Mobile NPUs' utilization.

We provide the real On-device AI immediately with key features below
   1. `End-to-end on-device AI`
   2. `One-stop deployment`
   3. `Heterogeneous OS and target Hardware supporting`

In these documentations, we provide instructions and examples for the ZETIC.MLange.
Since we are keep developing very hardly with speed, Please contact ZETIC.ai for any kind of issues.

*This is the `Beta` version of the ZETIC.MLange before official release.*


---------------------

Quick Start
---------------------

1. Go to `mlange.zetic.ai <https://mlange.zetic.ai>`_ and generate **Model Key** and **Personal Key**

   - Generating **Model Key** Example
   .. code-block:: bash

      # Generating Model Key with CLI Method.
      $ zetic gen -p $PROJECT_NAME -i $INPUT_0 -i $INPUT_1 .... $MODEL_PATH


   - Copying **Personal Key** Example
   .. image:: steps/generate_personal_key/2_copy_personal_key.png
      :alt: copy-personal-key
      :align: center

   - For more detail, refer to folowing documentations:
      - `Generating Model Key <steps/generate_model_key/index.html>`_
      - `Generating Personal Key <steps/generate_personal_key/index.html>`_

2. Use your model key in Mobile Applications

- Android - Kotlin

.. code-block:: Kotlin

   val model = ZeticMLangeModel(this, "YOUR_PERSONAL_KEY", "YOUR_MODEL_KEY")
   model.run(YOUR_INPUT_BYTE_BUFFERS)


- iOS - Swift

.. code-block:: Swift

   let model = try ZeticMLangeModel("YOUR_PERSONAL_KEY", "YOUR_MODEL_KEY")
   model.run(YOUR_INPUT_DATA_ARRAY)



Contents
--------

.. toctree::
   :maxdepth: 1
   :caption: Overview

   overview/what-is-zetic-mlange.md
   overview/how-mlange-works.md
   overview/model_profiling.md
   overview/zetic-mlange-llm-model.md

.. toctree::
   :maxdepth: 2
   :caption: Getting Started
   :glob:

   steps/prepare_model/index.rst
   steps/generate_model_key/index.rst
   steps/generate_personal_key/index.rst

.. toctree::
   :maxdepth: 1
   :caption: App Implementation

   app_implementation/android.md
   app_implementation/iOS.md

.. toctree::
   :maxdepth: 1
   :caption: Examples

   examples/yolov8.md
   examples/face_detection.md
   examples/face_landmark.md
   examples/face_emotion_recognition.md
   examples/yamnet.md
   examples/whisper.md

.. toctree::
   :maxdepth: 1
   :caption: Additional features

   additional_features/future_works.md



:ref:`genindex`  |  :ref:`search`

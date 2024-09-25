.. ZETIC.MLange documentation master file, created by
   sphinx-quickstart on Thu May 16 13:47:29 2024.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

ZETIC.MLange API
=============================================

.. image:: icon/zetic_mlange_icon.png
  :width: 75
  :alt: MLange icon image

ZETIC.MLange is an On-device AI runtime library supporting heterogeneous Mobile NPUs' utilizations.

We provide the real On-device AI immediately with key features below
   1. `End-to-end on-device AI`
   2. `One-stop deployment`
   3. `Heterogeneous OS and target Hardware supporting`

In this documentations, we provide instructions and examples for the ZETIC.MLange.
Since we are keep developing very hardly with speed, Please contact ZETIC.ai for any kind of issues.

*This is the `Beta` version of the ZETIC.MLange before official release.*


---------------------

Quick Start
---------------------

0. Get `mlange_gen` to generate ZETIC.MLange

.. code-block:: bash
   
   $ wget https://github.com/zetic-ai/ZETIC_MLange_document/raw/main/bin/mlange_gen


1. Let ZETIC.MLange automatically make runnable target model for heterogeneous target devices!

.. code-block:: bash
   
   $ ./mlange_gen -m ai_model -i input0.npy,input1.npy,...

   # ...
   # MLange Model Key : {YOUR_MODEL_KEY}


2. Use your model key in Mobile Applications

- Android - Kotlin

.. code-block:: Kotlin

   val model = ZeticMLangeModel(this, "YOUR MODEL KEY")
   model.run(YOUR_INPUT_BYTE_BUFFERS)


- iOS - Swift

.. code-block:: Swift

   let model = try ZeticMLangeModel("YOUR MODEL KEY")
   model.run(YOUR_INPUT_DATA_ARRAY)



Contents
--------

.. toctree::
   :maxdepth: 1
   :caption: Overview

   overview/what-is-zetic-mlange.md
   overview/getting-started.md
   overview/model_profiling.md

.. toctree::
   :maxdepth: 1
   :caption: Examples

   examples/yolov8.md
   examples/face_detection.md
   examples/face_landmark.md
   examples/face_emotion_recognition.md

.. toctree::
   :maxdepth: 1
   :caption: Android

   android/deploy-to-android-studio.md

.. toctree::
   :maxdepth: 1
   :caption: iOS

   ios/deploy-to-xcode.rst

.. toctree::
   :maxdepth: 1
   :caption: Additional features

   additional_features/future_works.md



:ref:`genindex`  |  :ref:`search`
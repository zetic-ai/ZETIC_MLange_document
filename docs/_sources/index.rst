.. ZETIC.MLange documentation master file, created by
   sphinx-quickstart on Thu May 16 13:47:29 2024.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

ZETIC.MLange API
=============================================

ZETIC.MLange is an On-device AI runtime library supporting heterogeneous Mobile NPUs' utilizations.

We provides below key features for real On-device AI
   1. `End-to-end on-device AI`
   2. `One-stop deployment`
   3. `Heterogeneous OS and target Hardware supporting`

In this documentations, we provide instructions and examples for the ZETIC.MLange.
Since we are keep developing very hardly with speed, Please contact ZETIC.ai for any kind of issues.

This is the `Beta` version of the ZETIC.MLange before official release.


---------------------

Quick Start
---------------------

0. Get `mlange_gen` to generate ZETIC.MLange

.. code-block:: bash
   
   $ wget https://github.com/zetic-ai/zetic_mentat/blob/20fccdf7a117d319b1c676d2f9a4640d35790db0/mlange_gen


1. Let ZETIC.MLange automatically make runnable target model for heterogeneous target devices!

.. code-block:: bash
   
   $ ./mlange_gen -m TORCHSCRIPT_MODEL -i INPUT0.npy,INPUT1.npy,...

   # Expected Output
   # [Type your e-mail if you want to get contact about the mail: ] (Press Enter to skip)

   # - MLange Model key: {YOUR MODEL KEY}


2. Use result hash value of your model in Mobile Applications

- Android - Kotlin

.. code-block:: Kotlin

   let model = try ZeticMLangeModel("YOUR MODEL KEY")
   model.run(YOUR_INPUT_DATA_ARRAY)


- iOS - Swift

.. code-block:: Swift

   val model = ZeticMLangeModel(this, "YOUR MODEL KEY")
   model.run(YOUR_INPUT_BYTE_BUFFERS)



Contents
--------

.. toctree::
   :maxdepth: 1
   :caption: Overview

   overview/getting-started.md
   .. overview/what-is-zetic-mlange.rst
   .. overview/melange-api.md
   .. preparation/model_converting.md

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

   future_works.md
   .. preprocess/preprocess.md
   .. preprocess/opencv.rst
   .. preprocess/librosa.rst
   .. preprocess/tokenizer.rst

   .. api_versions/api_versions.rst



:ref:`genindex`  |  :ref:`search`
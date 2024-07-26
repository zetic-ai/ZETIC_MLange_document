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
   
   $ wget https://github.com/zetic-ai/ZETIC_MLange_document/raw/main/bin/mlange_gen


1. Let ZETIC.MLange automatically make runnable target model for heterogeneous target devices!

.. code-block:: bash
   
   $ ./mlange_gen -m ai_model.pt -i input0.npy,input1.npy,...

   # Expected Output
    # Enter your email to receive updates from us
    # Press Enter to skip
    Email : {INPUT EMAIL}

    File Uploading...

    MLange Model Key : {YOUR_MODEL_KEY}
    MLange model profiling started. it might takes 10 or more minutes.
    The number of model downloads is limited. You can download it 5 times during the trial.


2. Use key of your model in Mobile Applications

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



:ref:`genindex`  |  :ref:`search`
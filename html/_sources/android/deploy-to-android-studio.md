.. Deploy to Android Studio to use MLange in Android app

Deploy to Android Studio
========================

 Currently Java Native Interface is provided.

## Prerequisite

1. Model file

    - Model file is provided by ZETIC.ai with URL. You can simply use the model url.

2. Aar Library

    - Zetic MLange : `zeticMLange.aar`

## Android application project structure

``` 

app
└── libs
    └── zeticlibs
        └── zeticMLange.aar


```


## App settings

- build.gradle (Groovy)

``` gradle

android {
    ...
    packagingOptions {
        jniLibs {
            useLegacyPackaging true
        }
    }
}

dependencies {
    implementation files('libs/zeticlibs/zeticMLange.aar')
}

```
- build.gradle.kts (Kotlin DSL)

``` gradle

android {
    ...
    packaging {
        jniLibs {
            useLegacyPackaging = true
        }
    }
}

dependencies {
    implementation(files("libs/zeticlibs/zeticMLange.aar"))
}

```


## Application Implementation


1. Zetic MLange model running (Java)

``` java
// 1. Zetic MLange model running

// (1) Prepare model inputs
ByteBuffer[] inputs = // Prepare your inputs;

// (2) Load Zetic MLange model
ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE MODEL KEY");

// (3) Run model and get outputs
model.run(inputs);

// (4) Get output buffers
ByteBuffer[] outputs = model.getOutputBuffers();
```

2. Zetic MLange model running (Kotlin)

``` kotlin
// 1. Zetic MLange Model Running

// (1) Prepare model inputs
val inputs: Array<ByteBuffer> = // Prepare your inputs

// (2) Load Zetic MLange model
val model = ZeticMLangeModel(this, "MODEL KEY")

// (3) Run model and get outputs
model.run(inputs)

// (4) Get output buffers
val outputs = model.outputBuffers
```

## (+) Additional API for MLange-Android usage

- As a default we set the model to use FP16 data type over NPU.
- We set 2 more options for user to choose runtime mode for (1) Better output accuracy and (2) High-speed inference.
- You cas set model option while you laod the model like sample code below.


``` kotlin

    // (1) Output Accuracy mode - `FP32 - (CPU, GPU)` mode
    val model = ZeticMLangeModel(this, "MODEL KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_FP32)

    // (2) High-speed inference mode - `Quantized - (NPU)` mode
    val model = ZeticMLangeModel(this, "MODEL KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_QUANTIZED)
```

``` java

    // (1) Output Accuracy mode - `FP32 - (CPU, GPU)` mode
    ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE MODEL KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_FP32);

    // (2) High-speed inference mode - `Quantized - (NPU)` mode
    ZeticMLangeModel model = new ZeticMLangeModel(this, "MLANGE MODEL KEY", ZeticMLangeModel.ZETIC_MLANGE_RUN_MODE_QUANTIZED);
```
# ZETIC.MLange API 

This page describes the APIs of ZETIC.MLange internal library.
We provide a unified API format for target libraries


## C++ (For JNI libraries)

``` c++

ZETIC_RESULT ZeticMelangeModel::ZeticMelangeModel(std::string target_model_path, std::string model_info_path);

ZETIC_RESULT ZeticMelangeModel::init();
ZETIC_RESULT ZeticMelangeModel::deinit();

ZETIC_RESULT ZeticMelangeModel::inference(char[][] input_buffers, int num_inputs,\
                                    char[][] output_buffers, int num_outputs);
```

## Java (For Android)

``` java

public class ZeticMelangeModel {
    public ZeticMelangeModel(String modelPath, String modelInfoPath);

}

```


## Objective-C (For iOS)

``` objective-c

// To be filled...

```


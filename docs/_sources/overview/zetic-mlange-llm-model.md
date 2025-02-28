# ZETIC.MLange LLM Model

## Overview

ZETIC.MLange LLM Model provides an abstraction layer for LLM (Large Language Model) implementations using ZETIC.ai's infrastructure. It offers a developer-friendly interface for downloading and running LLM models on mobile devices, managing model downloads.

## Model Support

Current tested models include:
- DeepSeek-R1-Distill-Qwen-1.5B-F16
- TinyLlama-1.1B-Chat-v1.0

Model compatibility depends on device capacity. 

[Performance and Latency section to be added]

## Core Concept

### Backend Abstraction
- Supports multiple LLM backends including LLaMA.cpp
- Handles model initialization and runtime management
- Provides unified interface across different backend implementations

## API Reference

### Initialization
- `init(personalKey: String, modelKey: String)`
    - Downloads device-appropriate model using prepared personal key and model key
    - Initializes LLM model with proper backend

### Conversation
- `run(prompt: String)`
    - Starts conversation with provided prompt
- `waitForNextToken(): String`
    - Returns next generated token, empty string indicates completion

## Implement ZETIC.LLM.Model to your project

### Prerequisites

[Model key generation section to be added]

- We prepared a model key for the demo app: `deepseek-r1-distill-qwen-1.5b-f16`. You can use the model key to try the ZETIC.LLM.MLange Application.

- Android app
  - For the detailed application setup, please follow [`deploy to Android Studio`](../deploy_model/android.md) page
  - ZETIC.LLM.MLange usage in `Kotlin`

    ``` kotlin
    val model = ZeticMLangeLLMModel(this, "PERSONAL_KEY", "deepseek-r1-distill-qwen-1.5b-f16")

    model.run("prompt")

    while (true) {
        val token = model.waitForNextToken()
        
        if (token == "") break

        // add token to your chat bubble text of the ai agent
    }
    ```

- iOS app
  - For the detailed application setup, please follow [`deploy to XCode`](../deploy_model/iOS.md) page
  - ZETIC.LLM.MLange usage in `Swift`
    ``` swift
    let model = ZeticMLangeLLMModel("PERSONAL_KEY", "deepseek-r1-distill-qwen-1.5b-f16")

    model.run("prompt")

    while true {
        let token = model.waitForNextToken()
        
        if token == "" {
            break
        }
    
        // add token to your chat bubble text of the ai agent
    }
    ```

### Screenshots
<img src="android_llm.png" alt="android_llm" width="200"/>

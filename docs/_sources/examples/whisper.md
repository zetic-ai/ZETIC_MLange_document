# Speech Recognition (Whisper)

## What is Whisper

- Whisper is a state-of-the-art speech recognition model developed by OpenAI
- The model supports multilingual speech recognition and translation capabilities
- Whisper can perform various tasks including speech recognition, language detection, and translation
- Whisper hugging face: [link](https://huggingface.co/openai/whisper-small)

## Step-by-step implementation

### 0. Prerequisites

Prepare the Whisper model from Hugging Face.

- Whisper: Convert the PyTorch model to TorchScript format
    - decoder
    ```python
    class DecoderWrapper(torch.nn.Module):
        def __init__(self, decoder):
            super().__init__()
            self.decoder = decoder
        
        def forward(self, input_ids, encoder_hidden_states):
            return self.decoder(input_ids=input_ids, encoder_hidden_states=encoder_hidden_states)[0]
        
    model = WhisperModel.from_pretrained(model_path)
    model.eval()
    
    wrapped_decoder = DecoderWrapper(model.decoder)
    wrapped_decoder.eval()
    
    decoder_input_ids = torch.zeros(1, 1, dtype=torch.long)
    encoder_hidden_states = torch.randn(1, 1500, 384)
    
    with torch.no_grad():
        traced_decoder = torch.jit.trace(
            wrapped_decoder,
            (decoder_input_ids, encoder_hidden_states),
            strict=False
        )
        
    torch.jit.save(traced_decoder, "whisper_tiny_decoder.pt")
    ```

    - encoder
    ```python
    class EncoderWrapper(torch.nn.Module):
        def __init__(self, encoder):
            super().__init__()
            self.encoder = encoder
        
        def forward(self, input_features):
            return self.encoder(input_features).last_hidden_state
        
    model = WhisperModel.from_pretrained(model_path)
    model.eval()
    
    wrapped_encoder = EncoderWrapper(model.encoder)
    wrapped_encoder.eval()
    
    encoder_inputs = torch.randn(1, 80, 3000)
    
    with torch.no_grad():
        traced_encoder = torch.jit.trace(wrapped_encoder, (encoder_inputs,), strict=False)
        
    torch.jit.save(traced_encoder, "whisper_tiny_encoder.pt")
    ```
- Prepare sample input for converting:
    ```python
    # encoder
    encoder_input = torch.randn(1, 80, 3000)
    np_encoder_input = encoder_input.numpy()
    np.save("encoder_input.npy", np_encoder_input)

    # decoder
    decoder_input_ids = torch.zeros(1, 1, dtype=torch.long)
    encoder_hidden_states = torch.randn(1, 1500, 384)
    
    np_decoder_input_ids = decoder_input_ids.numpy()
    np_encoder_hidden_states = encoder_hidden_states.numpy()
    
    np.save("decoder_input_ids.npy", np_decoder_input_ids)
    np.save("decoder_encoder_hidden_states.npy", np_encoder_hidden_states)
    ```

### 1. Generate ZETIC.MLange model

- Get your own MLange model key
    ```bash
    # (1) Get mlange_gen
    $ wget https://github.com/zetic-ai/ZETIC_MLange_document/raw/main/bin/mlange_gen && chmod 755 mlange_gen

    # (2) Run mlange_gen for Whisper model both encoder and decoder
    $ ./mlange_gen -m whisper_tiny_encoder.pt -i encoder_input.npy
    $ ./mlange_gen -m whisper_tiny_decoder.pt -i decoder_input_ids.npy,decoder_encoder_hidden_states.npy
    ```

    - Expected output
    ```bash
    ...
    MLange Model Key : {YOUR_WHISPER_MODEL_KEY}
    ...
    ```

### 2. Implement ZeticMLangeModel with your model key

- We provide a model key for the demo app: `whisper-tiny-encoder` and `whisper-tiny-decoder`. You can use this model key to try the Zetic.MLange Application.

- Android app
  - For detailed application setup, please follow [`deploy to Android Studio`](https://docs.zetic.ai/android/deploy-to-android-studio.html)
  - ZETIC.MLange usage in `Kotlin`

  ```kotlin
    val encoderModel = ZeticMLangeModel(this, "whisper-tiny-encoder")
    val decoderModel = ZeticMLangeModel(this, "whisper-tiny-decoder")

    ...

    encoderModel.run(inputs)
    val outputs = encoderModel.outputBuffers

    ...

    decoderModel.run(..., ...)
  ```

- iOS app
  - For detailed application setup, please follow [`deploy to XCode`](https://docs.zetic.ai/ios/deploy-to-xcode.html)
  - ZETIC.MLange usage in `Swift`
  ```swift
    let encoderModel = ZeticMLangeModel("whisper-tiny-encoder")
    let decoderModel = ZeticMLangeModel("whisper-tiny-decoder")

    ...

    encoderModel.run(inputs)
    let outputs = encoderModel.getOutputDataArray()

    ...

    decoderModel.run(..., ...)
  ```

### 3. Whisper Model Implementation Structure

The Whisper implementation consists of three main components:
1. Feature Extractor: Processes raw audio into Mel Spectrogram
2. Encoder: Processes Mel Spectrogram to generate audio embeddings
3. Decoder: Generates text tokens from the audio embeddings

you can find `WhisperDecoder` and `WhisperEncoder` in [ZETIC MLange apps](https://github.com/zetic-ai/ZETIC_MLange_apps/tree/main/whisper)

## Complete Speech Recognition Implementation

- For Android (Kotlin)
    ```kotlin
    // Initialize components
    val whisper = WhisperFeatureWrapper()
    val encoder = ZeticMLangeModel(this, "whisper-tiny-encoder")
    val decoder = ZeticMLangeModel(this, "whisper-tiny-decoder")
    
    // Process audio
    val features = whisper.process(audioData)
    
    // Run encoder
    encoder.process(features)
    
    // Generate tokens using decoder
    val generatedIds = decoder.generateTokens(outputs)
    
    // Convert tokens to text
    val text = whisper.decodeToken(generatedIds.toIntArray(), true)
    ```

- For iOS (Swift)
    ```swift
    // Initialize components
    let wrapper = WhisperFeatureWrapper()
    let encoder = ZeticMLangeModel("whisper-tiny-encoder")
    let decoder = ZeticMLangeModel("whisper-tiny-decoder")
    
    // Process audio to features
    let features = wrapper.process(input.audio)
    
    // Run encoder
    let outputs = encoder.process(features)
    
    // Generate tokens using decoder
    let generatedIds = decoder.process(outputs)
    
    // Convert tokens to text
    let text = wrapper.decodeToken(generatedIds, true)
    return WhisperOutput(text: text)
    ```
    
## Conclusion

With ZETIC.MLange, implementing on-device speech recognition with NPU acceleration is straightforward and efficient. Whisper provides robust multilingual speech recognition and translation capabilities. The simple pipeline of audio preprocessing and recognition makes it easy to integrate into your applications. We're continuously adding new models to our examples and [HuggingFace](https://huggingface.co/ZETIC-ai) page. Stay tuned, and [contact us](https://zetic.ai/contact-sales) for collaborations!
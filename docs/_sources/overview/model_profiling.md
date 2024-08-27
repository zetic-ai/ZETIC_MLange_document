
# ZETIC.MLange Target Based On-Device Benchmark

ZETIC.MLange provides the best user experience by benchmarking the performance of AI models on a pool of real-world devices. It performs benchmarking for different manufacturers' different processors including CPU, GPU, and NPU. With the result of the benchmark, the MLange ensures the best performance in the deployed user target device, regardless of the device type.

## Objective

### Guarantee optimized target library installation

ZETIC.MLange generates various types of target libraries from your AI model. Not all target libraries will work perfectly on the end-user's device, so we select the best target library for each device based on analyzed benchmark results. To accomplish this, we automatically benchmark and collect the performance time of the target library on all possible devices used by real users.

### Check model availability on End-user device

Certain hardware may not support the target libraries converted by ZETIC.MLange. In response to this, we can automatically perform inference of all target libraries on all possible devices and check their availability to ensure safe model performance.

The above process ensures that the optimized target library is installed and running on the end-user's device.

## How it works

1. **Make test environment:** We build an on-device test environment on the operating systems where the on-device AI model will run.
2. **Perform benchmark on all possible devices:** Collect target library, AI model metadata, application binary, etc. to create tests and perform benchmarks on a pool of real devices.
3. **Analyze the results:** Once the benchmarks are done, collect the results of the benchmarks performed by the SoC Manufacturer and target Library on each device. The results will look like this.

![Image](mlange_profiling_01.png)

### On End-user device

Using the analyzed benchmark results, target libraries are prioritized by SoC manufacturer and processor. The end-user device will use the hardware identifier value to fetch and install the optimal target library.

![Image](mlange_profiling_02.png)

## Detailed profiling result is our premium feature

 We execute profiling for all kinds of users and guarantee the best performance of the On-device AI app. However, we currently provide detailed profiling results for `Starter` users only. Please contact us by the [`contact us`](https://zetic.ai/contact-sales).
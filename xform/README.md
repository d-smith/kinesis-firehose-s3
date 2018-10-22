# xt1 - transformer 1

Lambda to do message transformation/enrichment/etc.

Currently, cloud formation does not support specifying a lambda to associated with the stream for transformation
purposes. Post create, however, the cli can be used to specify processing to occur in the strea before it
reaches its destination.

The [CLI]() documentation states

> If the destination type is the same, Kinesis Data Firehose merges the configuration parameters specified with the destination configuration that already exists on the delivery stream. If any of the parameters are not specified in the call, the existing values are retained.

The JSON for the `--extended-s3-destination-update` option includes processing configuration:

```console
{
    "ProcessingConfiguration": {
    "Enabled": true|false,
    "Processors": [
      {
        "Type": "Lambda",
        "Parameters": [
          {
            "ParameterName": "LambdaArn"|"NumberOfRetries"|"RoleArn"|"BufferSizeInMBs"|"BufferIntervalInSeconds",
            "ParameterValue": "string"
          }
          ...
        ]
      }
      ...
    ]
  }
}
```

## Misc

invoke it

```console
sls invoke --function xt1 -l --aws-profile <profile>
```
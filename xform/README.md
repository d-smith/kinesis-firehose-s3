# xt1 - transformer 1

Lambda to do message transformation/enrichment/etc.

Currently, cloud formation does not support specifying a lambda to associated with the stream for transformation
purposes. Post create, however, the cli can be used to specify processing to occur in the strea before it
reaches its destination.

The [CLI](https://docs.aws.amazon.com/cli/latest/reference/firehose/update-destination.html) documentation states

> If the destination type is the same, Kinesis Data Firehose merges the configuration parameters specified with the destination configuration that already exists on the delivery stream. If any of the parameters are not specified in the call, the existing values are retained.

The JSON for the `--extended-s3-destination-update` option includes processing configuration:

```console
{
    "DeliveryStreamName": "your name",
    "CurrentDeliveryStreamVersionId": "1",
    "DestinationId": "destinationId-000000000001",
   
    "ExtendedS3DestinationUpdate": {
        "ProcessingConfiguration": {
            "Enabled": true,
            "Processors": [
                {
                    "Type": "Lambda",
                    "Parameters": [
                        {
                            "ParameterName": "LambdaArn",
                            "ParameterValue": "arn:aws:lambda:us-east-1:<your account no>:function:xform1-dev-xt1"
                        }
                    ]
                }
            ]
        }
    }
}
```

Capture your configuration in a file (for example in `cli-update.json`) then update the destination, .e.g.

```console
aws firehose update-destination --cli-input-json file://cli-update.json
```

Create an execution policy for the lambda

```console
aws iam create-policy --policy-name fh-xform-dev --policy-document file://lambda-policy.json
```
Then, attach the policy to the role:

```console
aws iam attach-role-policy --role-name BucketWriterRole --policy-arn arn:aws:iam::nnn:policy/fh-xform-dev
```

Notes - wide open execution resource currently used in the policy - should refine that.

## Misc

invoke it

```console
sls invoke --function xt1 -l --aws-profile <profile>
```
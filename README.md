# kinesis-firehose-s3

## Overview

Set up a firehose to write kinesis records to an s3 bucket.

This project provides two templates:

* streamback-bucket.yml. Use this to create the bucket for the firehose destination
* streamback.yml. Use this to create the firehose - note you will need the name of the Kinesis stream source and the name of the destination bucket to supply as parameters.

For playing around with this, you might want to deploy [this](https://github.com/d-smith/kinesis-lambda-async) project and use its stream.

Note that the bucket and stream do not need to be in the same region.

## Limitations

The IAM permissions will likely need to be expanded if the KMS is used to encrypt the stream, and/or if KMS with a CMK is used to encrypt the destination bucket. 

## CLI examples

Create the archive bucket

```console
aws cloudformation create-stack --stack-name archiviceBucketStack --template-body file://streamback-bucket.yml
```
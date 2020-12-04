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

Create a Kinesis stream

```
aws kinesis create-stream --stream-name willamette --shard-count 1
```

Create the stack

```console
aws cloudformation create-stack --stack-name archiveFirehose \
--template-body file://streamback.yml \
--parameters ParameterKey=FirehoseName,ParameterValue=archiveFH ParameterKey=KinesisStreamName,ParameterValue=willamette ParameterKey=ArchiveBucket,ParameterValue=archivicebucketstack-archivebucket-14gh60f5cyytn \
--capabilities CAPABILITY_NAMED_IAM
```

Write data to the stream

```
aws kinesis put-record --stream-name willamette \
--data eyJ0eXBlIjoiZXZlbnQxIiwgInNvdXJjZSI6ImdhcnkiLCJkYXRhIjp7ImF0dHJpYnV0ZSI6InZhbHVlIn19Cg== \
--partition-key "xxx"


aws kinesis put-record --stream-name willamette \
--data ew0KICAgICJzcGVjdmVyc2lvbiIgOiAiMS4wIiwNCiAgICAidHlwZSIgOiAiY29tLmdpdGh1Yi5wdWxsLmNyZWF0ZSIsDQogICAgInNvdXJjZSIgOiAiaHR0cHM6Ly9naXRodWIuY29tL2Nsb3VkZXZlbnRzL3NwZWMvcHVsbCIsDQogICAgInN1YmplY3QiIDogIjEyMyIsDQogICAgImlkIiA6ICJBMjM0LTEyMzQtMTIzNCIsDQogICAgInRpbWUiIDogIjIwMTgtMDQtMDVUMTc6MzE6MDBaIiwNCiAgICAiY29tZXhhbXBsZWV4dGVuc2lvbjEiIDogInZhbHVlIiwNCiAgICAiY29tZXhhbXBsZW90aGVydmFsdWUiIDogNSwNCiAgICAiZGF0YWNvbnRlbnR0eXBlIiA6ICJ0ZXh0L3htbCIsDQogICAgImRhdGEiIDogIjxtdWNoIHdvdz1cInhtbFwiLz4iDQp9 \
--partition-key "xxx"
```
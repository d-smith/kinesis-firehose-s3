//This handler from https://medium.com/a-tale-of-2-from-data-to-information/how-to-build-an-event-pipeline-part-2-transforming-records-using-lambda-functions-d68cf3e879ed

exports.handler = (event, context, callback) => {
    /*Print streams as source only data here*/
    event.records.forEach((record) => {
        console.log(record.kinesisRecordMetadata.sequenceNumber);
        console.log(record.kinesisRecordMetadata.subsequenceNumber);
        console.log(record.kinesisRecordMetadata.partitionKey);
        console.log(record.kinesisRecordMetadata.shardId);
        console.log(record.kinesisRecordMetadata.approximateArrivalTimestamp);
    });
    /* Process the list of records and transform them */
    /* The following must be the schema of the returning record 
      Otherwise you will get processing-failed exceptions
      {recordId: <id> , result: 'Ok/Processing/Failed', data: <base64 encoded JSON string> } 
    */ 
    const output = event.records.map((record) => ({
        /* This transformation is the "identity" transformation, the data is left intact */
        recordId: record.recordId,
        result: 'Ok',
        data: record.data+"Cg==",
    }));
    console.log(`Processing completed.  Successful records ${output.length}.`);
    callback(null, { records: output });
};

exports.handler = (event, context, callback) => {

    const output = event.records.map((record) => {

        let recdata = record.data;
        let decoded = Buffer.from(recdata, 'base64').toString();
        let parsed=JSON.parse(decoded);
        let compacted = JSON.stringify(parsed,null,'');

        return {
   
            recordId: record.recordId,
            result: 'Ok',
            data: Buffer.from(compacted + '\n').toString('base64'),
        }});
    callback(null, { records: output });
};
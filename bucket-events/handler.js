
module.exports.handleS3Event = async (event, context) => {
    console.log(`Event: ${event}`);
    return 'ok';
} 
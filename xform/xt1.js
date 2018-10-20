const handler = (event, context) => {
    console.log(`xform invoked with event ${JSON.stringify(event)}`);
    return event.records;
}

module.exports = {
    handler
};
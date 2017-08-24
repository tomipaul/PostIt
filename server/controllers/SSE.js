export default (req, res, next) => {
  res.sseSetup = () => {
    res.setTimeout(0);
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    });
  };
  res.sseSend = (data) => {
    req.app.locals.connections
    .forEach((connection) => {
      connection.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  };
  next();
};

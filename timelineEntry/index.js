module.exports = async function(context, req) {
  if (!req.body || !req.body.child || !req.body.type || !req.body.timestamp) {
    context.res = {
      status: 400,
      body: {
        status: "err",
        message: "Provide at least child, type and timestamp in your request"
      }
    };
    return;
  }

  context.bindings.entry = JSON.stringify(req.body);

  context.res = {
    status: 200,
    body: {
      status: "ok",
      message: "Request successful"
    }
  };
};

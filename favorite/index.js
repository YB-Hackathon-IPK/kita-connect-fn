module.exports = async function(context, req, existingEntry) {
  if (
    !req.query.child ||
    !req.query.id ||
    !req.body ||
    !(typeof req.body.favorite == "boolean")
  ) {
    context.res = {
      status: 400,
      body: {
        status: "err",
        message: "You need to pass ?child, ?id and {favorite}"
      }
    };
    return;
  }

  context.bindings.entry = existingEntry;
  context.bindings.entry.favorite = req.body.favorite;

  context.res = {
    status: 200,
    body: {
      status: "ok",
      message: "Updated entry"
    }
  };
};

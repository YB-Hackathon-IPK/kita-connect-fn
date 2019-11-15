module.exports = async function(context, req) {
  if (!req.query.child || !req.query.date) {
    context.res = {
      status: 400,
      body: {
        status: "err",
        message: "you need to provide ?child and ?date"
      }
    };
    return;
  }

  if (!context.bindings.timelineEntries) {
    context.res = {
      status: 500,
      body: {
        status: "err",
        message: "could not read database"
      }
    };
    return;
  }

  let moment = require("moment");
  let date = moment(req.query.date, "YYYYMMDD");
  let startOfDay = date.startOf("day");
  let endOfDay = date.endOf("day");

  let entries = context.bindings.timelineEntries.filter(
    e => e.timestamp >= +startOfDay && e.timestamp <= +endOfDay
  );

  context.res = {
    status: 200,
    body: {
      status: "ok",
      data: entries
    }
  };
};

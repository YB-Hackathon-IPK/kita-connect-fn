module.exports = async function(context, req) {
  if (!req.query.child) {
    context.res = {
      status: 400,
      body: {
        status: "err",
        message: "you need to provide ?child"
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

  // let moment = require("moment");
  // let date = moment(req.query.date, "YYYYMMDD");
  // let startOfDay = date.startOf("day");
  // let endOfDay = moment(date).endOf('day');

  let entries = context.bindings.timelineEntries.filter(e => {
    // console.log(`c.child = ${e.child}, q.child = ${req.query.child}`);
    // console.log(
    //   `c.timestamp = ${e.timestamp}, start = ${startOfDay.valueOf()}, end = ${endOfDay.valueOf()}`
    // );

    return (
      e.child === req.query.child 
      // &&
      // e.timestamp >= +startOfDay &&
      // e.timestamp <= +endOfDay
    );
  });

  context.res = {
    status: 200,
    body: {
      status: "ok",
      data: entries
    }
  };
};

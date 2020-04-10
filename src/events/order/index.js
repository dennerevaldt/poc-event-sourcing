const OrderEvent = require('../../models/orderEvent');
const { CreateOrder, UpdateAddress, UpdateStatus } = require('./eventNames');
const { reducer } = require('./reducer');

const makeOrderEvent = (type) => (data = {}) => {
  const { orderId } = data;
  const tmp = Object.assign({}, data);

  delete tmp.orderId;

  return new OrderEvent({
    orderId,
    type,
    data: tmp,
  });
};

exports.makeCreateOrderEvent = makeOrderEvent(CreateOrder);
exports.makeUpdateAddressEvent = makeOrderEvent(UpdateAddress);
exports.makeUpdateStatusEvent = makeOrderEvent(UpdateStatus);
exports.saveEvents = reducer;

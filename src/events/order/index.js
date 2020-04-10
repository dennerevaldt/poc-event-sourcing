const OrderEvent = require('../../models/orderEvent');
const { CreateOrder, UpdateOrderAddress, UpdateOrderStatus } = require('./eventNames');
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
exports.makeUpdateAddressEvent = makeOrderEvent(UpdateOrderAddress);
exports.makeUpdateStatusEvent = makeOrderEvent(UpdateOrderStatus);
exports.saveEvents = reducer;

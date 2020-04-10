const Order = require('../../models/order');
const {
  CreateOrder,
  UpdateOrderAddress,
  UpdateOrderStatus,
} = require('./eventNames');

const reduce = async (orderEvent) => {
  if (orderEvent.type === CreateOrder) {
    const order = new Order({
      orderId: orderEvent.orderId,
    });

    const savedOrder = await order.save();
    await orderEvent.save();

    console.log(`Applied event ${orderEvent.type} successfully`);
    console.log('---------------------------------------------');
    return savedOrder;
  }

  const order = await Order.findOne({ orderId: orderEvent.orderId });

  switch (orderEvent.type) {
    case UpdateOrderAddress:
      order.address = orderEvent.data.address;
      break;
    case UpdateOrderStatus:
      order.status = orderEvent.data.status;
      break;
    default:
      console.log('Event not found');
      console.log('---------------------------------------------');
      break;
  }

  await orderEvent.save();
  const savedOrder = await order.save();

  console.log(`Applied event ${orderEvent.type} successfully`);
  console.log('---------------------------------------------');
  return savedOrder;
};

exports.reducer = async (events) => {
  let order;

  for (const orderEvent of events) {
    order = await reduce(orderEvent);
  }

  return order;
};

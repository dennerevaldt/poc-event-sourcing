const HttpStatus = require('http-status-codes');
const uuid = require('node-uuid');

const Order = require('../models/order');
const OrderEvent = require('../models/orderEvent');
const events = require('../events/order');
const { NotFound } = require('../errors');

exports.create = async (req, res, next) => {
  try {
    const { address } = req.body;

    const orderEvent = events.makeCreateOrderEvent({
      orderId: uuid.v4(),
    });

    const orderCreated = await events.saveEvents([orderEvent]);

    const addressEvent = events.makeUpdateAddressEvent({
      orderId: orderCreated.orderId,
      address,
    });

    await events.saveEvents([addressEvent]);

    const finalOrder = await Order.findOne(
      { orderId: orderCreated.orderId },
      { _id: 0, __v: 0 }
    );

    res.json(finalOrder);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOne({ orderId }, { _id: 0, __v: 0 });

    if (!order) {
      throw new NotFound('Order not found');
    }

    const statusEvent = events.makeUpdateStatusEvent({
      orderId: order.orderId,
      status: status,
    });

    await events.saveEvents([statusEvent]);

    res.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    await Order.deleteOne({ orderId });

    res.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOne({ orderId }, { _id: 0, __v: 0 });

    if (!order) {
      throw new NotFound('Order not found');
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.recreate = async (req, res, next) => {
  try {
    await Order.deleteMany({});
    const orderEvents = await OrderEvent.find({});
    await events.saveEvents(orderEvents);

    res.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

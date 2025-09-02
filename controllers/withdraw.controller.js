const Currency = require('../models/currency.model');

const makeWithdraw = async (request, response) => {
  const amountPesos = request.body.amount;

  try {

    if (amountPesos <= 0) {
      return response.status(400).json({
        ok: false,
        msg: 'The amount to withdraw must be greater than 0',
      });
    }

    const inventoryArr = await Currency.find().sort({ denomination: -1 });

    const totalAmount = inventoryArr.reduce(
      (acc, curr) => acc + curr.denomination * curr.quantity,
      0
    );

    if (amountPesos > totalAmount) {
      return response.status(400).json({
        ok: false,
        msg: 'The ATM does not have enough money, sorry',
      });
    }

    let remainingDeliv = amountPesos;
    const billsUsed = [];

    for (let bill of inventoryArr) {
      if (remainingDeliv <= 0) break;

      const needed = Math.floor(remainingDeliv / bill.denomination);
      const numBillTaked = Math.min(needed, bill.quantity);

      if (numBillTaked > 0) {
        billsUsed.push({
          type: bill.type,
          denomination: bill.denomination,
          quantity: numBillTaked,
        });

        remainingDeliv -= numBillTaked * bill.denomination;
        bill.quantity -= numBillTaked;
      }
    }

    if (remainingDeliv > 0) {
      return response.status(400).json({
        ok: false,
        msg: 'Cannot dispense the exact amount with available denominations',
      });
    }

    for (let used of billsUsed) {
      await Currency.updateOne(
        { denomination: used.denomination, type: used.type },
        { $inc: { quantity: -used.quantity } }
      );
    }

    return response.json({
      ok: true,
      msg: 'Withdrawal was successful',
      bills: billsUsed,
    });

  } catch (error) {

    console.error(error);
    response.status(500).json({
      ok: false,
      msg: error.message,
    });

  }
};

module.exports = { 
    makeWithdraw
};

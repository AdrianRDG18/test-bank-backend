const Currency = require('../models/currency.model');

const createCurrency = async(request, response) =>{
    try{
        const { type, quantity, denomination } = request.body;
        
        const currencyExist = await Currency.findOne({denomination});

        if(currencyExist){
            return response.status(500).json({
                ok: false,
                msg: "The currency already exists"
            });
        }
        const newCurrency = await Currency.create({
            type, 
            quantity, 
            denomination
        });

        return response.status(200).json({
            ok: true,
            msg: "Currency created successfully",
            newCurrency
        });

    }catch(error){
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const getCurrencies = async (request, response) =>{
    try{
        const allCurrencies = await Currency.find({});

        return response.status(200).json({
            ok: true,
            msg: "Get all currencies successfully",
            allCurrencies

        });

    }catch(error){
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const updateCurrency = async(request, response) =>{

    const currency_id = request.params.id;

    try {

        const currencyExist = await Currency.findById(currency_id);

        if(!currencyExist){
            return response.status(500).json({
                ok: false,
                msg: "The currency does not exists"
            });
        }

        const { quantity } = request.body;

        const currencyUpdated = await Currency.findByIdAndUpdate(currency_id, { quantity }, { new: true});

        response.json({
            ok: true,
            msg: "Currency updated successfully",
            currencyUpdated
        });

    } catch (error) {
        console.log(error);
        response.status(error.status || 500).json({
            ok: false,
            msg: error.message
        });
    }
}

const getTotalAmount = async (request, response) => {
  try {
    const inventory = await Currency.find();

    const total = inventory.reduce((acc, curr) => acc + curr.denomination * curr.quantity, 0);

    return response.json({
      ok: true,
      total,
      msg: `Total money available in the ATM is $${total}`
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
    createCurrency,
    getCurrencies,
    updateCurrency,
    getTotalAmount
}
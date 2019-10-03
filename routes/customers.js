const Customer = require('../models/Customer');

module.exports = app => {
  // Get Customers
  app.get('/customers', async (req, res) => {
    try {
      const customers = await Customer.find({});
      res.send(customers);
    } catch (err) {
      res.status(406).json({ msg: 'Error' });
      console.log(err);
    }
  });

  // Get a single Customer
  app.get('/customers/:id', async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      res.send(customer);
    } catch (err) {
      res.status(404).json({ msg: 'No Customer found with this ID' });
      console.log(err);
    }
  });

  // Create a new Customer
  app.post('/customers', async (req, res) => {
    if (!req.is('application/json')) {
      res.status(406).json({ msg: "Expects 'application/json'" });
    }
    const { name, email, balance } = req.body;

    const customer = new Customer({
      name,
      email,
      balance
    });

    try {
      const newCustomer = await customer.save();
      res.status(201).json({ msg: 'Successfully added the customer' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'Error' });
    }
  });

  // Update Customer
  app.put('/customers/:id', async (req, res) => {
    if (!req.is('application/json')) {
      res.status(406).json({ msg: "Expects 'application/json'" });
    }

    try {
      const customer = await Customer.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.status(202).json({ msg: 'Updated.' });
    } catch (err) {
      res.status(404).json({ msg: 'No Resource Found with this ID' });
      console.log(err);
    }
  });

  // Delete Customer
  app.delete('/customers/:id', async (req, res) => {
    try {
      const customer = await Customer.findOneAndRemove({ _id: req.params.id });
      res.status(200).json({ msg: 'Resource Deleted' });
    } catch (err) {
      res.status(404).json({ msg: 'No Customer found with this ID' });
      console.log(err);
    }
  });
};

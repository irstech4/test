


app.post('/api/orders', async (req, res) => {
    try {
    //   const { amount, receipt, currency = 'INR' } = req.body;
    const amount = 500
    const receipt = 4344553
    const currency = 'INR'
  
      const options = {
        amount: amount * 100, // Convert amount to paise (100 paise = ₹1)
        currency,
        receipt,
      };
  
      const order = await raz.orders.create(options);
  
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // app.post('/api/verify', async (req, res) => {
  //   try {
  //     const { orderId, paymentId, signature } = req.body;
  
  //     const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  //       .update(`<span class="math-inline">\{orderId\}\|</span>{paymentId}`)
  //       .digest('hex');
  
  //     if (expectedSignature === signature) {
  //       // Payment successful - Update order status or process fulfillment logic
  //       res.json({ message: 'Payment successful' });
  //     } else {
  //       console.error('Invalid signature');
  //       res.status(400).json({ message: 'Invalid payment verification' });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // });
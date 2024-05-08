const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "3mej",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "gsgeygr",
});
module.exports =  razorpay ;

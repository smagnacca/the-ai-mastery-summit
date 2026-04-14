const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const { email, firstName, amount } = JSON.parse(event.body);

    if (!email || !amount) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount || 999, // $9.99 in cents
      currency: 'usd',
      receipt_email: email,
      description: 'Executive AI Advantage Summit — VIP Fast-Track',
      metadata: {
        firstName: firstName || '',
        email: email,
        product: 'VIP Fast-Track',
        summit: 'Executive AI Advantage Summit 2026'
      }
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
    };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};

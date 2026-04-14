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
    const { email, firstName } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email is required' }) };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 4900, // $49.00 in cents
      currency: 'usd',
      receipt_email: email,
      description: 'AI Mastery Summit — VIP Pass ($49)',
      metadata: {
        firstName: firstName || '',
        email: email,
        product: 'VIP Pass',
        includes: 'Autographed Book + Implementation Workshop',
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

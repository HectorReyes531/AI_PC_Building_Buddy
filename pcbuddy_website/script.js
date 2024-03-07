app.post('/submit-form', (req, res) => {
    const recaptchaResponse = req.body['g-recaptcha-response'];
    // Continue with verification...
});

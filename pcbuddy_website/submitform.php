<?php
$secretKey = '6LdNkHYpAAAAAOqwLBRSyzM9PV50wmzKi_nikU5u'; // Website Secret key
$responseKey = $_POST['g-recaptcha-response']; // The response from reCAPTCHA
$userIP = $_SERVER['REMOTE_ADDR']; // The user's IP address

// URL to verify CAPTCHA response
$requestURL = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$userIP";

// Make the request
$response = file_get_contents($requestURL);
$responseData = json_decode($response);

// Check if the CAPTCHA was successful
if ($responseData->success) {
    // if CAPTCHA was successful then proceed with form processing
} else {
    // if CAPTCHA failed, handle the error
}
?>



<?php
// mail.php
// This script handles the contact form submission and sends an email using PHPMailer
// Make sure to install PHPMailer via Composer: composer require phpmailer/phpmailer
// Replace '
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Composer autoload

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';         // SMTP server (e.g., smtp.gmail.com)
        $mail->SMTPAuth = true;
        $mail->Username = 'your_email_address';  // Your Gmail
        $mail->Password = 'your_app_password';     // App password from Google
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom($email, $name);
        $mail->addAddress('add_address'); // Where you want to receive

        $mail->isHTML(true);
        $mail->Subject = '📬 New Message from Your Portfolio';

        $mail->Body = "
    <div style='
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
        border-radius: 10px;
        color: #333;
        line-height: 1.6;
    '>
        <h2 style='color: #4CAF50; margin-top: 0;'>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> <a href='mailto:{$email}' style='color: #1a73e8;'>$email</a></p>
        <p><strong>Message:</strong><br>
        <span style='display: inline-block; margin-top: 10px; background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #4CAF50;'>$message</span></p>
        <hr style='margin-top: 30px;'>
        <p style='font-size: 12px; color: #888;'>This message was sent from your portfolio contact form.</p>
    </div>
";


        $mail->send();
        echo 'success';
    } catch (Exception $e) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
} else {
    echo 'Invalid request';
}

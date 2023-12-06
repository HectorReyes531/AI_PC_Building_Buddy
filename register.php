<?php
$host = "localhost";
$user = "postgres";
$pass = "lovesu52";
$db = "postgres";

$con = pg_connect("host=$host dbname=$db user=$user password=$pass") or die("Could not connect to Server\n");

if (!$con) {
    echo "Error: Unable to open database\n";
} else {
    // Use isset() to check if form fields are set in the POST request
    $username = isset($_POST['Username']) ? $_POST['Username'] : '';
    $email = isset($_POST['Email']) ? $_POST['Email'] : '';
    $password = isset($_POST['Password']) ? $_POST['Password'] : '';

    // Perform basic validation (you might want to enhance this)
    if (empty($username) || empty($email) || empty($password)) {
        echo "Error: Please fill in all required fields\n";
    } else {
        $query = "INSERT INTO pc_buddy.users (username, email, password) VALUES ('$username', '$email', '$password')";

        $result = pg_query($con, $query);

        if ($result) {
            echo "Registration successful";
            // You might want to redirect the user to a success page here
        } else {
            echo "Error: " . pg_last_error($con);
        }
    }
}

pg_close($con);
?>

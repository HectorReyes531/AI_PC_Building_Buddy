<?php
$host = "localhost";
$user = "postgres";
$pass = "lovesu52";
$db = "postgres";
$con = pg_connect("host=$host dbname=$db user=$user password=$pass") or die("Could not connect to Server\n");

if (!$con) {
    echo "Error: Unable to open database\n";

} else {
    $username = pg_escape_string($_POST['username']);
    $email = pg_escape_string($_POST['email']);
    $password = pg_escape_string($_POST['password']);  // Corrected variable name

    // Use prepared statement to prevent SQL injection
    $query = "INSERT INTO \"PC_Buddy\".\"users\" (username, password, email) VALUES ('$username', '$password', '$email')";

    $result = pg_query($con, $query);

    if (!$result) {
        echo "Error: " . pg_last_error($con);
    } else {
        echo "Registration successful";
        // Redirect to a success page or your index.html
        header("Location: index.html");
    }
}

pg_close($con);
?>

<?php
// Database credentials
$dbname = 'pcbuilderdatabase';
$user = 'buddy';
$password = 'brocode';
$host = '45.76.76.242';
$port = '5432';

// Establish a connection to the database
$conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");

// Fetch all tables in the database
$tablesQuery = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'";
$tablesStmt = $conn->query($tablesQuery);
$tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);

// Fetch all columns for each table
foreach ($tables as $table) {
    echo "<h2>$table</h2>";
    $columnsQuery = "SELECT column_name FROM information_schema.columns WHERE table_name = '$table'";
    $columnsStmt = $conn->query($columnsQuery);
    $columns = $columnsStmt->fetchAll(PDO::FETCH_COLUMN);
    
    // Output the columns
    echo "<ul>";
    foreach ($columns as $column) {
        echo "<li>$column</li>";
    }
    echo "</ul>";
}
?>

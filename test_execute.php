<?php

$code = '#include <iostream>
using namespace std;
int main() {
    string name;
    cout << "Enter name: ";
    cin >> name;
    cout << "Hello " << name << endl;
    return 0;
}';

// Start session
$ch = curl_init('http://127.0.0.1:8000/api/execute-start');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['code' => $code, 'language' => 'c++']));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($ch);
curl_close($ch);

echo "Start result:\n";
echo $result . "\n\n";

$data = json_decode($result, true);

if (isset($data['session_id'])) {
    $sessionId = $data['session_id'];
    
    // First send empty input to run the program
    $ch = curl_init('http://127.0.0.1:8000/api/execute-input');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['session_id' => $sessionId, 'input' => '']));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);
    curl_close($ch);
    
    echo "First run (empty input):\n";
    echo $result . "\n\n";
    
    // Now send actual input
    $ch = curl_init('http://127.0.0.1:8000/api/execute-input');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['session_id' => $sessionId, 'input' => 'John']));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($ch);
    curl_close($ch);
    
    echo "With input 'John':\n";
    echo $result . "\n";
}

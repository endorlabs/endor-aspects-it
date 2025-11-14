use serde::{Deserialize, Serialize};
use serde_json;

use utils::{validate_email, generate_id, sanitize_input, encode_base64, decode_base64};
use http::HttpClient;
use db::Database;
use utils::random::generate_random_number;

#[derive(Serialize, Deserialize)]
struct Message {
    content: String,
}

fn main() {
    // Use utils module
    let email = "test@example.com";
    println!("Email '{}' is valid: {}", email, validate_email(email));
    println!("Generated ID: {}", generate_id());
    println!("Sanitized input: '{}'", sanitize_input("  HELLO WORLD  "));
    
    // Use encoding functions
    let encoded = encode_base64("Hello, Base64!");
    println!("Base64 encoded: {}", encoded);
    match decode_base64(&encoded) {
        Ok(decoded) => println!("Base64 decoded: {}", decoded),
        Err(e) => println!("Decode error: {}", e),
    }
    
    // Use random number generator
    let random_num = generate_random_number(1, 100);
    println!("Random number between 1 and 100: {}", random_num);

    // Use http module
    let client = HttpClient::new();
    let test_response = HttpClient::create_test_response();
    println!("Test HTTP response: {:?}", test_response);
    println!("HttpClient created: {:?}", client);

    // Use db module
    let mut db = Database::new();
    let record1 = db.insert("First record".to_string());
    let record2 = db.insert("Second record".to_string());
    println!("Database has {} records", db.len());
    
    // Use database get method
    if let Some(record) = db.get(&record1.id) {
        println!("Retrieved record: {:?}", record);
    }
    
    // Use database get_all method
    let all_records = db.get_all();
    println!("Total records retrieved: {}", all_records.len());
    
    // Use database remove method
    if let Some(removed) = db.remove(&record2.id) {
        println!("Removed record: {:?}", removed);
    }
    println!("Database now has {} records", db.len());

    // Original message
    let msg = Message {
        content: "Hello, world!".to_string(),
    };
    let json = serde_json::to_string(&msg).unwrap();
    println!("{}", json);
}


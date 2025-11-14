use serde_json::json;
use super::response::ApiResponse;

#[derive(Debug)]
pub struct HttpClient;

impl HttpClient {
    pub fn new() -> Self {
        Self
    }

    pub fn create_test_response() -> ApiResponse {
        ApiResponse {
            status: "success".to_string(),
            data: json!({"message": "test"}),
        }
    }
}

impl Default for HttpClient {
    fn default() -> Self {
        Self::new()
    }
}


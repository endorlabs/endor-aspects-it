use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse {
    pub status: String,
    pub data: serde_json::Value,
}


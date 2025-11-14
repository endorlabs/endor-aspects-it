use base64::{Engine as _, engine::general_purpose};

pub fn encode_base64(input: &str) -> String {
    general_purpose::STANDARD.encode(input.as_bytes())
}

pub fn decode_base64(input: &str) -> Result<String, base64::DecodeError> {
    let decoded = general_purpose::STANDARD.decode(input)?;
    Ok(String::from_utf8_lossy(&decoded).to_string())
}


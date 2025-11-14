use uuid::Uuid;
use rand::Rng;

pub fn generate_id() -> String {
    Uuid::new_v4().to_string()
}

pub fn generate_random_number(min: u32, max: u32) -> u32 {
    let mut rng = rand::thread_rng();
    rng.gen_range(min..=max)
}


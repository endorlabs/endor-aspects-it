use chrono::Utc;
use uuid::Uuid;
use std::collections::HashMap;
use super::record::DatabaseRecord;

pub struct Database {
    records: HashMap<String, DatabaseRecord>,
}

impl Database {
    pub fn new() -> Self {
        Self {
            records: HashMap::new(),
        }
    }

    pub fn insert(&mut self, data: String) -> DatabaseRecord {
        let id = Uuid::new_v4().to_string();
        let record = DatabaseRecord {
            id: id.clone(),
            created_at: Utc::now(),
            data,
        };
        self.records.insert(id, record.clone());
        record
    }

    pub fn get(&self, id: &str) -> Option<&DatabaseRecord> {
        self.records.get(id)
    }

    pub fn get_all(&self) -> Vec<&DatabaseRecord> {
        self.records.values().collect()
    }

    pub fn len(&self) -> usize {
        self.records.len()
    }

    pub fn remove(&mut self, id: &str) -> Option<DatabaseRecord> {
        self.records.remove(id)
    }
}

impl Default for Database {
    fn default() -> Self {
        Self::new()
    }
}


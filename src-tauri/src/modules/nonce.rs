use std::time::{ SystemTime, SystemTimeError, UNIX_EPOCH };
use aes_gcm::{aead::Nonce, Aes256Gcm};
use rand::RngCore;

pub fn generate() -> Result<Nonce<Aes256Gcm>, SystemTimeError> {
    let unix_timestamp = match SystemTime::now().duration_since(UNIX_EPOCH) {
        Ok(timestamp) => timestamp,
        Err(error) => return Err(error)
    };

    let timestamp_as_ms = unix_timestamp.as_millis() as u64;
    let timestamp_as_6_bytes = &timestamp_as_ms.to_be_bytes()[2..8];

    let mut random_6_bytes = [0u8; 6];
    rand::rng().fill_bytes(&mut random_6_bytes);

    let mut nonce_12_bytes = [0u8; 12];
    nonce_12_bytes[..6].copy_from_slice(timestamp_as_6_bytes);
    nonce_12_bytes[6..].copy_from_slice(&random_6_bytes);

    Ok(Nonce::<Aes256Gcm>::from_slice(&nonce_12_bytes).to_owned())
}

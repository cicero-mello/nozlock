use std::io::{Error, ErrorKind};
use aes_gcm::{Aes256Gcm, Key};
use argon2::{
    Algorithm, Argon2, Params, Version,
    password_hash::{
        SaltString,
        rand_core::OsRng
    }
};

const MEMORY_COST_MIB: u32 = 19 * 1024;
const ITERATIONS: u32 = 2;
const PARALLELISM_DEGREE: u32 = 1;
const OUTPUT_LENGTH: usize = 32;

pub struct Password {
    pub key: Key<Aes256Gcm>,
    pub salt: Vec<u8>
}

pub fn generate_hash(
    password: &str,
    salt_option: Option<&Vec<u8>>
) -> Result<Password, Error> {
    let argon2_params = match Params::new(
        MEMORY_COST_MIB,
        ITERATIONS,
        PARALLELISM_DEGREE,
        Some(OUTPUT_LENGTH)
    ) {
        Ok(params) => params,
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Internal Error on Argon2 params: \n{}", error)
        ))
    };

    let argon2 = Argon2::new(
        Algorithm::Argon2id,
        Version::V0x13,
        argon2_params
    );

    let salt_string = match salt_option {
        Some(salt) => match SaltString::encode_b64(salt){
            Ok(salt_string) => salt_string,
            Err(error) => return Err(Error::new(
                ErrorKind::InvalidData,
                format!("Error on Salt Conversion:\n{}", error)
            )),
        },
        None => SaltString::generate(&mut OsRng)
    };

    let mut hash = [0u8; 32];
    match argon2.hash_password_into(
        password.as_bytes(),
        salt_string.as_str().as_bytes(),
        &mut hash
    ) {
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Internal Error on Argon2 Hash:\n{}", error)
        )),
        _ => {}
    };

    let aes_key = Key::<Aes256Gcm>::from_slice(&hash).clone();

    let mut salt_bytes = vec![0u8; 16];
    match salt_string.decode_b64(&mut salt_bytes) {
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Error to convert SaltString in Bytes Vector:\n{}", error)
        )),
        _ => {}
    };

    Ok(Password {
        key: aes_key,
        salt: salt_bytes
    })
}

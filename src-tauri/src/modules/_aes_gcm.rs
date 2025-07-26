use crate::modules::nonce;
use std::io::{Error, ErrorKind};
use aes_gcm::{
    aead::{Aead, KeyInit, Nonce },
    Aes256Gcm, Key
};

pub struct EncryptedData {
    pub cipher_text: Vec<u8>,
    pub nonce: Vec<u8>
}

pub fn encrypt(
    content: &str,
    key: &Key<Aes256Gcm>,
    nonce_option: Option<&Nonce<Aes256Gcm>>
) -> Result<EncryptedData, Error> {

    let nonce = match nonce_option {
        Some(nonce_ref) => nonce_ref.clone(),
        None => match nonce::generate() {
            Ok(value) => value,
            Err(error) => return Err(Error::new(
                ErrorKind::Other,
                format!("Encrypt Error:\n{}", error)
            ))
        }
    };

    let cipher = Aes256Gcm::new(key);

    let cipher_text = match cipher.encrypt(
        &nonce,
        content.as_bytes()
    ){
        Ok(cipher_text) => cipher_text,
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Encrypt CipherText Error:\n{}", error)
        ))
    };

    Ok(EncryptedData {
        cipher_text,
        nonce: nonce.to_vec()
    })
}

pub fn decrypt(
    cipher_text_bytes_vec: &Vec<u8>,
    key: &Key<Aes256Gcm>,
    nonce_bytes_vec: &Vec<u8>
) -> Result<String, Error> {
    let nonce = Nonce::<Aes256Gcm>::from_slice(nonce_bytes_vec);

    let cipher = Aes256Gcm::new(key);

    let plain_text = match cipher.decrypt(
        nonce,
        cipher_text_bytes_vec.as_ref()
    ){
        Ok(plain_text) => plain_text,
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Decrypt CipherText Error:\n{}", error)
        ))
    };

    match String::from_utf8(plain_text){
        Ok(string) => return Ok(string),
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Decrypt Error | String From UTF8 Error:\n{}", error)
        ))
    };
}

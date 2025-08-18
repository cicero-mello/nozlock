use crate::modules::{_aes_gcm, _argon2, file_manipulation, filename};
use std::io::{Error, ErrorKind};
use std::path::Path;
use std::fs;
use serde::Serialize;

const VAULT_FILES_FOLDER: &str = ".vts/";

pub fn create(name: &str, password: &str) -> Result<(), Error> {
    match already_exists(name) {
        Ok(already_exists) => {
            if already_exists {
                return Err(Error::new(
                    ErrorKind::AlreadyExists,
                    "This Vault Already Exists"
                ))
            }
        },
        Err(error) => return Err(error)
    }

    let encoded_name = filename::encode(name);

    let pass = match _argon2::generate_hash(password, None) {
        Ok(pass) => pass,
        Err(error) => return Err(error)
    };

    let vault_file = match _aes_gcm::encrypt("", &pass.key, None) {
        Ok(vault_file) => vault_file,
        Err(error) => return Err(error)
    };

    let mut vault_content: Vec<u8> = Vec::new();
    vault_content.extend_from_slice(&pass.salt);
    vault_content.extend_from_slice(&vault_file.nonce);
    vault_content.extend_from_slice(&vault_file.cipher_text);

    match file_manipulation::create_file(
        VAULT_FILES_FOLDER,
        &encoded_name,
        &vault_content
    ) {
        Err(error) => return Err(error),
        _ => return Ok(())
    }
}

pub struct VaultFile {
    pub salt: Vec<u8>,
    pub nonce: Vec<u8>,
    pub cipher_text: Vec<u8>
}

fn read(vault_file_name: &str) -> Result<VaultFile, Error>{
    let path = Path::new(VAULT_FILES_FOLDER).join(vault_file_name);

    let vault_file_bytes = match fs::read(path) {
        Ok(file) => file,
        Err(error) => return Err(Error::new(
            ErrorKind::NotFound,
            format!("Error to read Vault '{}':\n{}", vault_file_name, error)
        ))
    };

    if vault_file_bytes.len() < 28 {
        return Err(Error::new(
            ErrorKind::InvalidData,
            "Vault Data is Corrupted!!"
        ))
    };

    let salt = vault_file_bytes[0..16].to_vec();
    let nonce = vault_file_bytes[16..28].to_vec();
    let cipher_text = vault_file_bytes[28..].to_vec();

    Ok(VaultFile { salt, nonce, cipher_text })
}

pub fn get_content (
    vault_name: &str,
    password: &str
) -> Result<String, Error> {
    let encoded_vault_name = filename::encode(vault_name);

    let vault_content = match read(&encoded_vault_name) {
        Ok(data) => data,
        Err(error) => return Err(error)
    };

    let pass = match _argon2::generate_hash(password, Some(&vault_content.salt)) {
        Ok(pass) => pass,
        Err(error) => return Err(error)
    };

    match _aes_gcm::decrypt(
        &vault_content.cipher_text,
        &pass.key,
        &vault_content.nonce
    ) {
        Ok(decrypted_content) => return Ok(decrypted_content),
        Err(error) => return Err(error)
    };
}

#[derive(Serialize)]
pub struct VaultNames {
    pub original: String,
    pub encoded: String,
}

pub fn list_all() -> Result<Vec<VaultNames>, Error> {
    let files = match file_manipulation::list_files(VAULT_FILES_FOLDER) {
        Ok(files) => files,
        Err(error) => return Err(error),
    };

    files.into_iter().map(|name| {
        match filename::decode(&name) {
            Ok(decoded) => Ok(VaultNames {
                original: decoded,
                encoded: name,
            }),
            Err(error) => Err(Error::new(
                ErrorKind::Other,
                format!("Error on decode:\n{}", error),
            ))
        }
    }).collect()
}

pub fn already_exists (vault_name: &str) -> Result<bool, Error> {
    let all_vaults = match list_all() {
        Ok(all_vaults_names) => all_vaults_names,
        Err(err) => return Err(err)
    };

    for vault in all_vaults {
        if vault.original == vault_name {
            return Ok(true)
        }
    }

    Ok(false)
}

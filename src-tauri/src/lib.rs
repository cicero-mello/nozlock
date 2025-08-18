mod modules;
use modules::{
    diceware,
    vault
};

#[tauri::command]
fn diceware_password_generator(
    words_quantity: u8
) -> Result<diceware::DicewareData, String> {
    match diceware::generate(words_quantity) {
        Ok(value) => return Ok(value),
        Err(error) => return Err(format!("Diceware Error: {}", error))
    }
}

#[tauri::command]
fn create_vault(
    vault_name: &str,
    password: &str
) -> Result<(), String> {
    match vault::create(vault_name, password){
        Ok(()) => return Ok(()),
        Err(error) => return Err(format!("{}", error))
    };
}

#[tauri::command]
fn vault_already_exists(
    vault_name: &str
) -> Result<bool, String> {
    match vault::already_exists(vault_name){
        Ok(already_exists) => return Ok(already_exists),
        Err(error) => return Err(format!(
            "Vault Existence Verification Error:\n {}",
            error
        ))
    };
}

#[tauri::command]
fn list_all_vaults() -> Result<Vec<vault::VaultNames>, String> {
    match vault::list_all(){
        Ok(all_vaults_names) => return Ok(all_vaults_names),
        Err(error) => return Err(format!("{}", error))
    };
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            diceware_password_generator,
            create_vault,
            vault_already_exists,
            list_all_vaults
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

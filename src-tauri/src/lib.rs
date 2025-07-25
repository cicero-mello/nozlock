mod modules;
use modules::diceware;

#[tauri::command]
fn diceware_password_generator(
    words_quantity: u8
) -> Result<diceware::DicewareData, String> {
    match diceware::generate(words_quantity) {
        Ok(value) => return Ok(value),
        Err(e) => return Err(format!("Diceware Error: {}", e))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            diceware_password_generator
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

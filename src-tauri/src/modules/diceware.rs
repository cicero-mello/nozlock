use std::fs::{ read_to_string };
use std::io::Error;
use std::path::Path;
use rand::{ Rng, rng };
use serde::Serialize;

const WORDS_PATH: &str = ".dice-words";
const SEPARATORS: [char; 7] = ['&', '+', '/', '=', '*', '%', '['];

#[derive(Serialize)]
pub struct DicewareData {
    pub password: String,
    pub separator: char
}

fn read_words_file(file_name: &str) -> Result<String, Error>{
    let path = Path::new(WORDS_PATH).join(file_name);
    let read_result = read_to_string(&path);
    return read_result;
}

fn get_random_separator() -> char {
    let index = rand::rng().random_range(0..SEPARATORS.len());
    return SEPARATORS[index];
}

pub fn generate(words_quantity: u8) -> Result<DicewareData, Error>{
    let words_file = match read_words_file("english") {
        Ok(value) => value,
        Err(error) => return Err(error)
    };

    let words_list: Vec<&str> = words_file.lines().filter(
        |word| !word.is_empty()
    ).collect();

    let mut generated_password = String::new();
    let separator = get_random_separator();

    loop {
        generated_password.clear();

        let mut i = 0;
        while i < words_quantity {
            let random_words_list_index = rng().random_range(0..=7775);
            if i != 0 {
                generated_password.push(separator);
            }
            generated_password.push_str(words_list[random_words_list_index]);
            i += 1;
        }

        if generated_password.len() >= 52 {
            break;
        }
    }

    return Ok(DicewareData {
        password: generated_password,
        separator
    });
}

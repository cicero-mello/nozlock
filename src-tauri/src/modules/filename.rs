use std::string::FromUtf8Error;

const CHARSET: &[u8; 64] = b"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

fn byte_to_bits(byte: u8) -> Vec<u8> {
    (0..=7).rev().map(
        |bit_position| (byte >> bit_position) & 1
    ).collect()
}

fn u6_to_bits(value: u8) -> Vec<u8> {
    (0..6).rev().map(
        |bit_position| (value >> bit_position) & 1
    ).collect()
}

fn bytes_to_bits(bytes: &[u8]) -> Vec<u8> {
    bytes.iter().flat_map(
        |&byte| byte_to_bits(byte)
    ).collect()
}

fn bits_to_u8(bits: &[u8]) -> u8 {
    bits.iter().fold(0, |byte, &bit| (byte << 1) | bit)
}

fn custom_base64_str_to_bits(encoded: &str) -> Vec<u8> {
    encoded.chars().flat_map(|ch| {
        let char_value = CHARSET.iter().position(
            |&c| c as char == ch
        ).unwrap() as u8;

        return u6_to_bits(char_value);
    }).collect()
}

pub fn encode(file_name: &str) -> String {
    let file_name_bytes_vector: Vec<u8> = file_name.as_bytes().to_vec();

    let mut result = String::new();
    let mut bits_vector: Vec<u8> = bytes_to_bits(&file_name_bytes_vector);

    loop {
        if bits_vector.len() <= 6 {
            while bits_vector.len() != 6 {
                bits_vector.push(0);
            }
            let charset_index = bits_to_u8(&bits_vector);
            result.push(CHARSET[charset_index as usize] as char);
            break;
        }

        let bits_vector_chunk: Vec<u8> = bits_vector.drain(0..6).collect();
        let charset_index = bits_to_u8(&bits_vector_chunk);
        result.push(CHARSET[charset_index as usize] as char);
    }

    return result;
}

pub fn decode(encoded: &str) -> Result<String, FromUtf8Error> {
    let bits_vector: Vec<u8> = custom_base64_str_to_bits(encoded);

    let mut decoded_bytes: Vec<u8> = Vec::new();

    let mut bit_index = 0;
    while bit_index + 8 <= bits_vector.len(){
        let chunk_8_bits_from_bits_vector = &bits_vector[bit_index..bit_index+8];
        decoded_bytes.push(bits_to_u8(chunk_8_bits_from_bits_vector));
        bit_index += 8;
    }

    String::from_utf8(decoded_bytes)
}

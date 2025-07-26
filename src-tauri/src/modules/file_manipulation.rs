use std::fs::{create_dir_all, read_dir, File, read};
use std::io::{Error, ErrorKind, Write};
use std::path::{Path, PathBuf};

fn create_folder(folder_path: &str) -> Result<(), Error>{
    let path = Path::new(folder_path);

    if path.exists() {
        return Ok(());
    };

    create_dir_all(path)
}

pub fn create_file(
    folder: &str, file_name: &str, content: &[u8]
) -> Result<(), Error> {
    match create_folder(folder) {
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Error During Folder Creation:\n{}", error)
        )),
        _ => {}
    };

    let mut file_path = PathBuf::from(folder);
    file_path.push(file_name);

    let mut file = match File::create(&file_path) {
        Ok(file) => file,
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Error During File Creation:\n{}", error)
        ))
    };

    match file.write_all(content) {
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Error While Writing File:\n{}", error)
        )),
        _ => {}
    };

    Ok(())
}

pub fn read_file(folder: &str, file_name: &str) -> Result<Vec<u8>, Error> {
    let path = Path::new(folder).join(file_name);
    read(path)
}

pub fn list_files(folder: &str) -> Result<Vec<String>, Error> {
    let path = Path::new(folder);

    if !path.exists(){
        return Err(Error::new(
            ErrorKind::NotFound, "Folder not found!"
        ));
    }

    let mut file_names = Vec::new();

    let directory_entries = match read_dir(path) {
        Ok(directory_entries) => directory_entries,
        Err(error) => return Err(Error::new(
            ErrorKind::Other,
            format!("Error to get Directory Entries:\n{}", error)
        ))
    };

    for entry in directory_entries {
        let entry = match entry {
            Ok(entry) => entry,
            Err(error) => return Err(Error::new(
                ErrorKind::Other,
                format!("Error on Directory Entry:\n{}", error)
            ))
        };

        let metadata = match entry.metadata() {
            Ok(metadata) => metadata,
            Err(error) => return Err(Error::new(
                ErrorKind::Other,
                format!("Error on Entry Metadata:\n{}", error)
            ))
        };

        if metadata.is_file() {
            match entry.file_name().to_str() {
                Some(name) => file_names.push(name.to_string()),
                None => {}
            }
        };
    };

    Ok(file_names)
}

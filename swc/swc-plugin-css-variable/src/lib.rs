use pathdiff::diff_paths;
use swc_core::{
    ecma::{
        ast::*,
        visit::{as_folder, FoldWith},
    },
    plugin::{
        metadata::TransformPluginMetadataContextKind, plugin_transform,
        proxies::TransformPluginProgramMetadata,
    },
};

use transform::{hash, Config, TransformVisitor};

use regex::Regex;
#[macro_use]
extern crate lazy_static;

/// Transforms a [`Program`].
#[plugin_transform]
pub fn process_transform(program: Program, metadata: TransformPluginProgramMetadata) -> Program {
    let config: Config = serde_json::from_str(
        &metadata
            .get_transform_plugin_config()
            .expect("failed to get plugin config for swc-plugin-css-variable"),
    )
    .expect("failed to parse plugin config");

    let file_name = metadata
        .get_context(&TransformPluginMetadataContextKind::Filename)
        .expect("failed to get filename");
    let deterministic_path = relative_posix_path(&config.base_path, &file_name);
    let hashed_filename = hash(&deterministic_path);

    program.fold_with(&mut as_folder(TransformVisitor::new(
        config,
        hashed_filename,
    )))
}

/// Returns a relative POSIX path from the `base_path` to the filename.
///
/// For example:
/// - "/foo/", "/bar/baz.txt" -> "../bar/baz.txt"
/// - "C:\foo\", "C:\foo\baz.txt" -> "../bar/baz.txt"
///
/// The format of `base_path` and `filename` must match the current OS.
fn relative_posix_path(base_path: &str, filename: &str) -> String {
    let normalized_base_path = convert_path_to_posix(base_path);
    let normalized_filename = convert_path_to_posix(filename);
    let relative_filename = diff_paths(normalized_filename, normalized_base_path)
        .expect("Could not create relative path");
    let path_parts = relative_filename
        .components()
        .map(|component| component.as_os_str().to_str().unwrap())
        .collect::<Vec<&str>>();

    path_parts.join("/")
}

/// Returns the path converted to a POSIX path (naive approach).
///
/// For example:
/// - "C:\foo\bar" -> "c/foo/bar"
/// - "/foo/bar" -> "/foo/bar"
fn convert_path_to_posix(path: &str) -> String {
    lazy_static! {
        static ref PATH_REPLACEMENT_REGEX: Regex = Regex::new(r":\\|\\|:/").unwrap();
    }

    PATH_REPLACEMENT_REGEX.replace_all(path, "/").to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_relative_path_unix() {
        assert_eq!(
            relative_posix_path("/foo/", "/bar/baz.txt"),
            "../bar/baz.txt"
        );
    }

    #[test]
    fn test_relative_path_windows() {
        assert_eq!(
            relative_posix_path(r"C:\foo\", r"C:\bar\baz.txt"),
            "../bar/baz.txt"
        );
    }

    #[test]
    fn test_relative_path_windows_forward_slash() {
        assert_eq!(
            relative_posix_path(r"E:\foo", "E:/foo/bar/file.tsx"),
            "bar/file.tsx"
        );
    }

    #[test]
    fn test_convert_unix_path() {
        assert_eq!(convert_path_to_posix(r"/foo/bar"), "/foo/bar");
    }

    #[test]
    fn test_convert_windows_path() {
        assert_eq!(convert_path_to_posix(r"C:\foo\bar"), "C/foo/bar");
    }
}

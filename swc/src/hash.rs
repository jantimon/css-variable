use xxhash_rust::xxh32::xxh32;

/// Creates a CSS identifier using xxHash (https://cyan4973.github.io/xxHash/).
/// Shortened to base62 (https://en.wikipedia.org/wiki/Base62) to avoid invalid characters.
pub fn hash(data: &str) -> String {
    let hash = xxh32(data.as_bytes(), 0);
    base62::encode(hash)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn short() {
        assert_eq!(hash("hey"), "2Hy69D");
    }

    #[test]
    fn longer() {
        assert_eq!(hash("hey how are you doing?"), "34D1Ek");
    }

    #[test]
    fn longest() {
        assert_eq!(
            hash("hey how are you doing? I am doing fine, thanks for asking."),
            "1XQ5hm"
        );
    }
}

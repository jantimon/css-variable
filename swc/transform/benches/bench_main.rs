use criterion::{black_box, criterion_group, criterion_main, Criterion};

pub fn short_hash(c: &mut Criterion) {
    c.bench_function("short filename hash", |b| {
        b.iter(|| transform::hash(black_box("fileName.ts")))
    });
}

pub fn longer_hash(c: &mut Criterion) {
    c.bench_function("longer filename hash", |b| {
        b.iter(|| {
            transform::hash(
                black_box("some/slightly/somewhat/much/very/much/longer/harder/better/faster/stronger/convoluted/fileName.ts")
            )
        })
    });
}

criterion_group!(hashes, short_hash, longer_hash);
criterion_main!(hashes);

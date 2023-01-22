use criterion::{black_box, criterion_group, criterion_main, BatchSize, Criterion};
use swc_core::{
    common::{sync::Lrc, FileName, SourceMap},
    ecma::{parser, visit::VisitMutWith},
};

use transform::TransformVisitor;

pub fn transform_visitor(c: &mut Criterion) {
    let source_map: Lrc<SourceMap> = Default::default();
    let source_file = source_map.new_source_file(
        FileName::Custom("index.page.tsx".into()),
        include_str!("index.page.tsx").into(),
    );

    let program = parser::parse_file_as_program(
        &source_file,
        Default::default(),
        Default::default(),
        None,
        &mut vec![],
    )
    .unwrap();

    c.bench_function("visitor", |b| {
        b.iter_batched(
            || {
                (
                    program.clone(),
                    TransformVisitor::new(Default::default(), String::from("hashed")),
                )
            },
            |(mut program, mut visitor)| program.visit_mut_with(&mut visitor),
            BatchSize::SmallInput,
        )
    });
}

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
criterion_group!(visitor, transform_visitor);
criterion_main!(hashes, visitor);

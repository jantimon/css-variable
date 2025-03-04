use criterion::{black_box, criterion_group, criterion_main, BatchSize, Criterion};
use swc_core::{
    common::{sync::Lrc, FileName, SourceMap},
    ecma::{parser, visit::VisitMutWith},
};

use transform::{Config, TransformVisitor};

pub fn styled_page(c: &mut Criterion) {
    let source_map: Lrc<SourceMap> = Default::default();
    let source_file = source_map.new_source_file(
        Lrc::new(FileName::Custom("styledPage.tsx".into())),
        include_str!("styledPage.tsx").into(),
    );

    let program = parser::parse_file_as_program(
        &source_file,
        Default::default(),
        Default::default(),
        None,
        &mut vec![],
    )
    .unwrap();

    c.bench_function("visitor styledPage", |b| {
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

    c.bench_function("visitor styledPage display_name", |b| {
        b.iter_batched(
            || {
                (
                    program.clone(),
                    TransformVisitor::new(
                        Config {
                            display_name: true,
                            ..Default::default()
                        },
                        String::from("hashed"),
                    ),
                )
            },
            |(mut program, mut visitor)| program.visit_mut_with(&mut visitor),
            BatchSize::SmallInput,
        )
    });
}

pub fn nested(c: &mut Criterion) {
    let source_map: Lrc<SourceMap> = Default::default();
    let source_file = source_map.new_source_file(
        Lrc::new(FileName::Custom("nested.js".into())),
        include_str!("nested.js").into(),
    );

    let program = parser::parse_file_as_program(
        &source_file,
        Default::default(),
        Default::default(),
        None,
        &mut vec![],
    )
    .unwrap();

    c.bench_function("visitor nested", |b| {
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

    c.bench_function("visitor nested display_name", |b| {
        b.iter_batched(
            || {
                (
                    program.clone(),
                    TransformVisitor::new(
                        Config {
                            display_name: true,
                            ..Default::default()
                        },
                        String::from("hashed"),
                    ),
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

criterion_group!(benches, styled_page, nested, short_hash, longer_hash);
criterion_main!(benches);

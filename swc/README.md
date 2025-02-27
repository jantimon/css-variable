# swc-plugin-css-variable

This is the SWC counterpart to the babel plugin of this library.

## Structure

This is a workspace with two crates:

- `swc-plugin-css-variable` is the outer shell and only contains what's
  necessary to interface with SWC, which is essentially the main function that
  is decorated with `#[plugin_transform]`
- `transform` has everything else, most importantly the visitor implementation

The reason for the split is to enable benchmarking inside Wasm runtimes. If the
code under test (the visitor) were in the same crate as `#[plugin_transform]`,
code would be generated that requires functions to be linked in for accessing
the environment and emitting diagnostics. Normally these are provided at
runtime by SWC, but for only running benchmarks we don't want to have to
fake them.

## Benchmarking

The benchmarks can be run easily with `cargo bench`. Note that this builds and
runs native code on your machine, which may not exhibit the exact same
performance characteristics as a Wasm module in a runtime, as is the case for
SWC transformations.

To account for this, it's also possible to build a benchmark executable in Wasm
format and execute it in your runtime of choice. Since SWC internally uses
[Wasmer](https://wasmer.io), it makes sense to install this one. Then, it's
just a matter of

```console
$ cargo build --bench bench_main --release --target wasm32-wasip1
# Get the name of the Wasm module we just built
$ ls -t target/wasm32-wasip1/release/deps/*.wasm | head -n 1
target/wasm32-wasip1/release/deps/bench_main-9530540cc15e2e67.wasm
# Execute the benchmark
$ wasmer target/wasm32-wasip1/release/deps/bench_main-9530540cc15e2e67.wasm -- --bench
```

With this you get the most accurate runtime behavior and can observe the
difference to native code. However, you'll most likely find it negligible, with
Wasm being just slightly slower and everything else scaling mostly linearly. A
typical example:

- `wasmer: visitor styledPage      time:   [6.6177 µs 6.6316 µs 6.6495 µs]`
- `native: visitor styledPage      time:   [5.4191 µs 5.4736 µs 5.5150 µs]`

For most changes that aren't Wasm-specific, it's therefore often good enough to
just run the benchmarks normally with `cargo bench`.

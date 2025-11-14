load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# rules_rust - required version 0.40.0+ for gazelle_rust
RULES_RUST_VERSION = "0.40.0"
http_archive(
    name = "rules_rust",
    sha256 = "c30dfdf1e86fd50650a76ea645b3a45f2f00667b06187a685e9554e167ca97ee",
    urls = ["https://github.com/bazelbuild/rules_rust/releases/download/0.40.0/rules_rust-v0.40.0.tar.gz"],
)

load("@rules_rust//rust:repositories.bzl", "rules_rust_dependencies", "rust_register_toolchains")

rules_rust_dependencies()

load("@rules_rust//crate_universe:repositories.bzl", "crate_universe_dependencies")

rust_register_toolchains(
    edition = "2021",
    versions = ["1.77.0"],
)

crate_universe_dependencies()

load("@rules_rust//crate_universe:defs.bzl", "crate", "crates_repository")

# Set up crate_universe for dependency management
crates_repository(
    name = "crates",
    cargo_lockfile = "//:Cargo.lock",
    lockfile = "//:Cargo.Bazel.lock",
    manifests = [
        "//:Cargo.toml",
        "//src/db:Cargo.toml",
        "//src/http:Cargo.toml",
        "//src/utils:Cargo.toml",
    ],
)

load("@crates//:defs.bzl", "crate_repositories")

crate_repositories()

# gazelle_rust
GAZELLE_RUST_COMMIT = "b504c88bd96f553af373579c341107fe8ecb862b"
http_archive(
    name = "gazelle_rust",
    sha256 = "fa4c2971144fe0a79515e58d9ddee793c1ff79efbaf98e290e148d891547b4ca",
    strip_prefix = "gazelle_rust-{}".format(GAZELLE_RUST_COMMIT),
    url = "https://github.com/Calsign/gazelle_rust/archive/{}.zip".format(GAZELLE_RUST_COMMIT),
)

load("@gazelle_rust//:deps1.bzl", "gazelle_rust_dependencies1")

gazelle_rust_dependencies1()

load("@gazelle_rust//:deps2.bzl", "gazelle_rust_dependencies2")

gazelle_rust_dependencies2()



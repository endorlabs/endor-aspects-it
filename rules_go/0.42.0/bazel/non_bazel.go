//go:build !bazel
// +build !bazel

package bazel

// This file contains stub implementations for non-bazel builds.
// See bazel.go for full documentation on the contracts of these functions.

// BuiltWithBazel returns true iff this library was built with Bazel.
func BuiltWithBazel() bool {
	return false
}

// Runfile is not implemented.
func Runfile(string) (string, error) {
	panic("not built with Bazel")
}

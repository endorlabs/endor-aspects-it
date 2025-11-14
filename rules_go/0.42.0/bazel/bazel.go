//go:build bazel
// +build bazel

package bazel

import (
	inner "github.com/bazelbuild/rules_go/go/tools/bazel"
)

// Return true if this library was built with Bazel.
func BuiltWithBazel() bool {
	return true
}

// Runfile is a convenience wrapper around the rules_go variant.
func Runfile(path string) (string, error) {
	return inner.Runfile(path)
}

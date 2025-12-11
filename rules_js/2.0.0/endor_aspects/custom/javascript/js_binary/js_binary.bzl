load("//endor_aspects/custom/javascript/js_binary:provider.bzl", "EndorJavaScriptDependencyInfo", "EndorJavaScriptSpecInfo")

def _get_dependency_files(deps):
    files = []
    for dep in deps:
        if OutputGroupInfo in dep and hasattr(dep[OutputGroupInfo], "endor_sca_info"):
            files.extend(dep[OutputGroupInfo].endor_sca_info.to_list())
    return files

def _impl(target, ctx):
    label_str = getattr(ctx, "label", "")
    deps = ctx.rule.attr.deps if hasattr(ctx.rule.attr, "deps") else []

    spec = EndorJavaScriptSpecInfo(
        name = "xyz",
        version = "1.2.3",
    )

    provider = EndorJavaScriptDependencyInfo(
        original_label = str(label_str),
        dependencies = [],
        internal = False,
        javascript = spec,
    )

    output_file = ctx.actions.declare_file("{}_resolved_dependencies.json".format(label_str))

    ctx.actions.write(
        output = output_file,
        content = json.encode_indent(provider, indent = " "),
    )

    return [OutputGroupInfo(endor_sca_info = depset([output_file] + _get_dependency_files(deps)))]

endor_resolve_dependencies = aspect(
    attr_aspects = ["deps", "data", "src", "srcs"],
    implementation = _impl,
    attrs = {
        "ref": attr.string(),
        "log_level": attr.string(default = "DEBUG"),
        "external_target_json": attr.string(default = "{}"),
    },
)

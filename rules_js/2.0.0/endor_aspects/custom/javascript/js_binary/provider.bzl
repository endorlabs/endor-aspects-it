EndorJavaScriptDependencyInfo = provider(
    doc = "Provider for collecting JavaScript dependency metadata",
    fields = {
        "original_label": "The original target label",
        "dependencies": "List of direct dependency labels",
        "internal": "True if internal workspace target",
        "javascript": "Struct containing JavaScript Specific Information",
    },
)

EndorJavaScriptSpecInfo = provider(
    doc = "Provides the JavaScript Spec. Embedded into EndorJavascriptDependencyInfo as JavaScript",
    fields = {
        "package_name": "String: Name of the Package. e.g, path-info",
        "version": "String: Version of a Package. e.g, 2.3.5",
    },
)

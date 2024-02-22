<svelte:head>
    <!-- Add your CSS stylesheets or external stylesheets here -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/diff2html/bundles/css/diff2html.min.css" />
    <!-- Add your JavaScript files or external scripts here -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/diff2html/bundles/js/diff2html-ui.min.js"></script>
</svelte:head>

<script lang="ts" type="module">
    import * as Diff from 'diff';
    import { onMount } from 'svelte';
    export let textA = `some text`;
    export let versionA = '1.0';
    export let versionB = '2.0';
    export let textB = `some other text`;
    export let title = 'Difference';

    type OutputFormatType = 'line-by-line' | 'side-by-side';
    type LineMatchingType = 'lines' | 'words' | 'none';

    const diffString = Diff.createPatch(title, textA, textB, versionA, versionB, {
        context: 30
    });
    const outputFormat: OutputFormatType = 'side-by-side';
    const matching: LineMatchingType = 'lines';

    const configuration = {
        drawFileList: true,
        fileListToggle: false,
        fileListStartVisible: false,
        fileContentToggle: false,
        matching: matching,
        outputFormat: outputFormat,
        synchronisedScroll: true,
        highlight: true,
        renderNothingWhenEmpty: false,
      };

    onMount(() => {
        console.log('diffString', diffString);
        const ele = document.getElementById('diffViewer');
        const ui = new Diff2HtmlUI(ele as HTMLElement, diffString, configuration);
        ui.draw();
        ui.highlightCode();
    });

</script>

<div id="diffViewer"></div>
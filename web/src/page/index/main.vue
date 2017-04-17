<style lang="less" rel="stylesheet/less">
    html,
    body {
        position: relative;
        height: 100%;
        width: 100%;

        overflow: hidden;
    }
</style>

<template>
    <div class="player">
        <EditorPanel></EditorPanel>
        <ToolPanel></ToolPanel>
    </div>
</template>
<script>
    // import { mapState, mapActions, mapMutations } from 'vuex';
    import EditorPanel from './component/editor-panel.vue';
    import ToolPanel from './component/tool-panel.vue';

    export default {
        computed: {},
        components: {
            EditorPanel,
            ToolPanel
        },
        methods: {},
    };
</script>

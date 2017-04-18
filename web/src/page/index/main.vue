<style lang="less" rel="stylesheet/less">
    @import "~css/common/reset.less";
    @import "~css/common/common.less";

    html,
    body {
        position: relative;
        height: 100%;
        width: 100%;

        overflow: hidden;
    }

    .cookanim {
        position: relative;
        width: 100%;
        height: 100%;

        display: flex;
    }
</style>

<template>
    <div class="cookanim">
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

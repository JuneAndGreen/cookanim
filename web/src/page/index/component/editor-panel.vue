<style lang="less" rel="stylesheet/less">
    .editor-panel {}
</style>
<template>
    <div class="editor-panel">
        <TimeLine></TimeLine>
        <CanvasPanel></CanvasPanel>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    import TimeLine from './editor-panel/time-line.vue';
    import CanvasPanel from './editor-panel/canvas-panel.vue';

    export default {
        data() {
            return {};
        },
        components: {
            TimeLine,
            CanvasPanel
        },
        computed: {
            ...mapState([])
        },
        methods: {
            ...mapActions([])
        }
    };
</script>

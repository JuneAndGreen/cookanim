<style lang="less" rel="stylesheet/less">
    .canvas-panel {
        position: relative;
        width: 100%;
        flex: 1;

        background-color: red;
    }
</style>
<template>
    <div class="canvas-panel">canvas-panel</div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        data() {
            return {};
        },
        components: {},
        computed: {
            ...mapState([])
        },
        methods: {
            ...mapActions([])
        }
    };
</script>

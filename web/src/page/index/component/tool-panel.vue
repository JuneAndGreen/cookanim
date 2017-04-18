<style lang="less" rel="stylesheet/less">
    .tool-panel {
        position: relative;
        width: 230px;
        height: 100%;

        background-color: green;
    }
</style>
<template>
    <div class="tool-panel">tool-panel</div>
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

<style lang="less" rel="stylesheet/less">
    .time-line {
        position: relative;
        width: 100%;
        height: 150px;

        .timeline-box {

        }

        .timeline-opr {
            
        }
    }
</style>
<template>
    <div class="time-line">
        <div class="timeline-box"></div>
        <div class="timeline-opr"></div>
    </div>
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

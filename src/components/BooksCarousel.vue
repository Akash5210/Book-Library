<template>
    <el-carousel :interval="4000" type="card" height="220px" class="carouselBody">
        <el-carousel-item v-for="item in carouselData" :key="item.id">
            <el-row :gutter="10">
                <el-col :span="6">
                    <img :src="item.imgUrl" class="bookImage"/>
                </el-col>
                <el-col :span="18">
                    <h3 style="font-weight: 500;">{{ item.title }}</h3>
                    <h5 style="font-style: italic;">{{ item.author }}</h5>
                    <el-rate :model-value=item.rating disabled show-score score-template="{value}" size="large" />
                    <p class="summary">{{ summaryellipsis(item.summary) }}</p>
                    <p class="gener" style="margin-top: 5px;">Genres: <span style="font-weight: 500;">{{ item.type.join(", ") }}</span></p>
                    <p class="publishedDate" style="font-size: 0.7rem; margin-top: 5px;">{{ item.publishedDate }}</p>
                </el-col>
            </el-row>
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>

const props = defineProps(['carouselData'])

const summaryellipsis = (summary) => {
    return summary.length < 200 ? summary : summary.slice(0, 200) + '...';
}

</script>

<style scoped>
.carouselBody .summary,
.carouselBody .gener {
    font-size: 0.8rem;
}
.carouselBody  .bookImage{
    width: 100%;
    background-size: contain;
    aspect-ratio: 3/4.5;
}
/* .carouselBody .publishedDate {
    font-size: 0.7rem;
} */

.el-carousel__item {
    padding: 5px 10px;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>